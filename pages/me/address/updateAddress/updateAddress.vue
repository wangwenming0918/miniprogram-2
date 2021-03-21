<template>
	<view style="margin: 10rpx;">
		<view>
		    <form @submit="formSubmit">
		        <view style="padding: 10rpx;">
		        	<view>收货人:</view>
		        	<input class="input" name="name" type="text" placeholder="请输入收货人姓名" :value="address.name"/>
		        </view>
		        <view>
		        	<view>手机号码:</view>
		        	<input class="input" name="phone" type="number" placeholder="请输入手机号" :value="address.phone"/>
		        </view>
		        <view>
		        	<view @click="openPicker" style="color: #B2DFEE;">选择地区</view>
		        	<input class="input" type="text" placeholder="云南省昆明市" disabled :value="Address"/>
		        	<lotus-address v-on:choseVal="choseValue" 
		        	:lotusAddressData="lotusAddressData"></lotus-address>
		        </view>
		        <view>
		        	<view>详细地址:</view>
		        	<input class="input" name="address" type="text" placeholder="请输入详细地址" :value="address.address"/>
		        </view>
		         
				<view class="uni-btn-v">
					<button form-type="submit">保存</button>
				</view>
		    </form>
		</view>
	</view>
	
</template>

<script>
	import lotusAddress from '../../../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue'
	var  graceChecker = require("../../../../components/graceChecker.js");
	export default {
		components:{
			"lotus-address":lotusAddress
		},
		data() {
			return {
				lotusAddressData:{
				    visible:false,
				    provinceName:'',
				    cityName:'',
				    townName:''
				},
				region:'',
				address: {
					id: '',
					name: '',
					phone: '',
					address: '',
					userId: ''
				},
				userId: '',
				Address: ''
				
			}
		},
		methods: {
			//打开picker
			openPicker() {
				//默认选中
			    this.lotusAddressData.visible = true;
			    this.lotusAddressData.provinceName = '云南省';
			    this.lotusAddressData.cityName = '昆明市';
			    this.lotusAddressData.townName = '五华区';
			},
			//回传已选的省市区的值
			choseValue(res){
			    //res数据源包括已选省市区与省市区code
			    //console.log(res);
				this.Address = res.province+res.city+res.town
				this.address.address = res.province+res.city+res.town
			     this.lotusAddressData.visible = res.visible;//visible为显示与关闭组件标识true显示false隐藏
			    //res.isChose = 1省市区已选 res.isChose = 0;未选
			    if(res.isChose){
			        this.lotusAddressData.provinceName = res.province;//省
			        this.lotusAddressData.cityName = res.city;//市
			        this.lotusAddressData.townName = res.town;//区
			        this.region = `${res.province} ${res.city} ${res.town}`; //region为已选的省市区的值
			    }
			},
			formSubmit (e) {
			    //console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
			    //定义表单规则
			    var rule = [
			        {name:"name", checkType : "string", checkRule:"1,10",  errorMsg:"姓名应为1到10个字符之间"},
			        {name:"phone", checkType : "phoneno", checkRule:"",  errorMsg:"请输入正确的手机号码"},
			        {name:"address", checkType : "string", checkRule:"5,50",  errorMsg:"请输入正确地址"}
			    ];
			    //进行表单检查
			    var formData = e.detail.value;
				if(this.address.id !== ''){
					formData.id = this.address.id
				}
				formData.userId = this.userId
			    var checkRes = graceChecker.check(formData, rule);
			    if(checkRes){
					
					//发起后端请求
					
					this.request({
					    url: this.$Url+'/address/updateaddress', 
					    data: {
					        address: formData
					    },
						method:'POST',
					    success: (res) => {
					        //this.text = 'request success';
							uni.showToast({title:"保存成功!", icon:"none"});
							uni.redirectTo({
								url: '../address'
							})
					    },
						fail() {
							uni.showToast({title:"保存失败", icon:"none"});
						}
					});
					
				  
			        //uni.showToast({title:"验证通过!", icon:"none"});
			    }else{
			        uni.showToast({ title: graceChecker.error, icon: "none" });
			    }
			},
		},
		onLoad(option) {
			if(option !== null){
				if(typeof(option.item) === 'string'?true:false){
					let item = JSON.parse(option.item)
					this.address = item 
					this.Address = item.address
				}
			}
			uni.getStorage({
			    key: 'userData',
			    success: (res) => {
					this.userId =res.data.id
			    }
			});
			
		}
	}
</script>

<style scoped>
	.input{
		margin: 10rpx;
		height: 60rpx;
		border-bottom: 1rpx solid #ccc;
		color: #8B8989;
	}
</style>
