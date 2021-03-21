<template>
    <view style="margin: 10rpx;">
		<view class="head">
			备忘录内容
		</view>
		<view class="text">
			<input type="text" v-model="remindTitle" placeholder="请输入主题" />
		</view>
		<view class="text">
			<textarea v-model="textValue" placeholder="请输入要提醒的内容"></textarea>
		</view>
		<view class="uni-title time" @click="change_time">
			提醒时间：{{year}}年{{month}}月{{day}}日{{hour}}时{{minute}}分
		</view>
        <picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
            <picker-view-column>
                <view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
            </picker-view-column>
			<picker-view-column>
			    <view class="item" v-for="(item,index) in hours" :key="index">{{item}}时</view>
			</picker-view-column>
			<picker-view-column>
			    <view class="item" v-for="(item,index) in minutes" :key="index">{{item}}分</view>
			</picker-view-column>
        </picker-view>
		<view>
			<button style="margin: 10rpx;" @click="define">确定</button>
		</view>
    </view>
</template>

<script>
    export default {
		
        data () {
            const date = new Date()
            const years = []
            const year = date.getFullYear()
            const months = []
            const month = date.getMonth() + 1
            const days = []
            const day = date.getDate()
			const hours = []
			const hour = date.getHours()
			const minutes = []
			const minute = date.getMinutes()

            for (let i = 1990; i <= date.getFullYear(); i++) {
                years.push(i)
            }

            for (let i = 1; i <= 12; i++) {
                months.push(i)
            }

            for (let i = 1; i <= 31; i++) {
                days.push(i)
            }
			for (let i = 0; i <= 24; i++) {
			    hours.push(i)
			}
			
			for (let i = 0; i <= 60; i++) {
			    minutes.push(i)
			}
            return {
				remindTitle: '',
                title: 'picker-view',
                years,
                year,
                months,
                month,
                days,
                day,
				hours,
				hour,
				minutes,
				minute,
                value: [9999, month - 1, day - 1,hour,minute],
				/**
				 * 解决动态设置indicator-style不生效的问题
				 */
                visible: false,
				textValue: '',
				reminderTime: 0,
				innerAudioContext: uni.createInnerAudioContext(),
                indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				obj:{
					id:undefined,
					createTime:'',
					title: '',
					desc:'',
					surplusTime: '',
					remindTime:''
				},
            }
        },
        methods: {
			
            bindChange (e) {
                const val = e.detail.value
                this.year = this.years[val[0]]
                this.month = this.months[val[1]]
                this.day = this.days[val[2]]
				this.hour = this.hours[val[3]]
				this.minute = this.minutes[val[4]]
            },
			change_time () {
				this.visible = !this.visible
			},
			// 铃声提醒
			ringtone(){
				//const innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.autoplay = true;
				this.innerAudioContext.src = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3';
				this.innerAudioContext.onPlay(() => {
				  console.log('开始播放');
				});
				this.innerAudioContext.onError((res) => {
				  console.log(res.errMsg);
				  console.log(res.errCode);
				});
				this.innerAudioContext.play();
				let stop = setTimeout(()=>{
					this.innerAudioContext.stop();
				},3000)
				
			},
			stoptone(){
				//this.innerAudioContext.stop();
				 console.log('用户点击确定');
			},
			define(){
				this.visible = false
				let year1=0, month1=0, day1=0, hour1=0, minute1=0;
				const date = new Date()
				const year = date.getFullYear()
				const month = date.getMonth() + 1
				const day = date.getDate()
				const hour = date.getHours()
				const minute = date.getMinutes()
				const second=date.getSeconds()
				if(this.year - year !==0 ){
					year1=this.year- year
				}
				if(this.month - month !==0 ){
					month1=this.month- month
				}
				if(this.day - day !==0 ){
					day1=this.day- day
				}
				if(this.hour - hour !==0 ){
					hour1=this.hour- hour
				}
				if(this.minute - minute !==0 ){
					minute1=this.minute- minute
				}
				console.log(year1+","+month1+","+day1+","+hour1+","+minute1)
				if(year1 !== 0 || month1 !== 0){
					uni.showToast({title:'提醒时间太长'})
				}
				if(day1 !== 0){
					this.reminderTime = day1*24*60*60*1000
				}
				if(hour1 !== 0){
					this.reminderTime =this.reminderTime+ hour1*60*60*1000
				}
				if(minute1 !== 0){
					this.reminderTime =this.reminderTime+ minute1*60*1000
				}
				uni.showToast({title:`${day1}天${hour1}小时${minute1}分后提醒您`,icon:'none',duration:2000})
				let closetime = setTimeout(()=>{
					clearTimeout(closetime)
					this.ringtone()
					uni.showModal({
					    title: '提醒',
					    content: this.textValue,
					    success: function (res) {
					        if (res.confirm) {
					   //          console.log('用户点击确定');
								///this.stoptone()
					        } else if (res.cancel) {
					   //          console.log('用户点击取消');
								//this.stoptone()
					        }
					    }
					});
					// wx.redirectTo({
					// 	url: './remind?textValue='+this.textValue
					// })
					
				},this.reminderTime-second*1000);
				
				this.obj.title = this.remindTitle;
				this.obj.desc = this.textValue;
				this.obj.remindTime = this.year+'年'+this.month+'月'+this.day+'日'+this.hour+'时'+this.minute+'分';
				this.obj.surplusTime=`剩余${day1}天${hour1}小时${minute1}分钟`;
				
				this.request({
					url: this.$Url+'/memorandum/save',
					data: this.obj,
					method: "POST"
				}).then(result=>{
					if(result.data.length>1){
						uni.showToast({
						    title: '添加成功',
						    duration: 1000
						});
					}else{
						uni.showToast({
						    title: '获取数据失败',
						    duration: 2000
						});
					}
					
				}).catch(err =>{
					uni.showToast({
					    title: '获取数据失败',
					    duration: 2000
					});
				})
			}
        }
    }
</script>

<style scoped>
	
	picker-view {
		width: 100%;
		height: 600rpx;
		margin-top:20rpx;
	}
	.head{
		font-size: 50rpx;
		color: #8A2BE2;
		margin: 20rpx 0;
		text-align: center;
	}
	.text{
		margin: 20rpx 0;
		border: 1rpx solid #CDC9C9;
		border-radius: 5rpx;
	}
    .item {
        line-height: 100rpx;
        text-align: center;
    }
	.time{
		border: 1rpx solid #CDC9C9;
		width: 700rpx;
		height: 100rpx;
		border-radius: 10rpx;
		background-color: #007AFF;
		color: #fff;
		font-size: 40rpx;
		padding-left: 30rpx;
		padding-top: 25rpx;
	}
</style>
