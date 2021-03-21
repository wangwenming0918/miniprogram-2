<template>
	<view>
		<!-- 搜索框 -->
		<view class="head_search topnav">
			<icon type="search" @click="headSearch" class="head_img" size="24"/>
			<input class="haed_input" v-model="search" @input="headChange" type="text" adjust-position auto-blur="true" confirm-type="search" @confirm="headSearch" placeholder="请输入内容" />
			<icon v-show="isShow" type="clear" @click="headColse" class="head_img" size="24"/>
		</view>
		
		<!-- 进行瀑布流布局的隐藏模块 -->
		<view style="display:none">
			<image v-for="(item,index) in images" :key="item.id" :id="item.id" :src="item.src" @load="onImageLoad"></image>
		</view>
			
		<view class="main">
			<!-- 进行瀑布流布局页面显示 -->
			<scroll-view scroll-y="true" style="height:1000px;position: absolute;">
				<view style="width:100%">
					<view class="img_item">
						<navigator v-for="(item,index) in col1" :key="index" :url="'communityInfo?id='+item.id">
							<image lazy-load="true" class="img" :src="item.src" :style="{height:`${item.height}px;`}"></image>
							<view >
								<view class="mid_title">{{item.title}}</view>
								<view class="mid_buttom">
									<image class="mid_img" :src="item.headSrc"></image>
									<view class="mid_name">{{item.name}}</view>
								</view>
							</view>
						</navigator>
					</view>
					<view class="img_item">
						<navigator v-for="(item,index) in col2" :key="index" :url="'communityInfo?id='+item.id">
							<image lazy-load="true" class="img" :src="item.src" :style="{height:`${item.height}px;`}"></image>
							<view >
								<view class="mid_title">{{item.title}}</view>
								<view class="mid_buttom">
									<image class="mid_img" :src="item.headSrc"></image>
									<view class="mid_name">{{item.name}}</view>
								</view>
							</view>
						</navigator>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<!-- 发布动态的按钮 -->
		<view>
			<uni-fab ref="fab" :pattern="pattern" horizontal="right" 
			vertical="bottom"  @fabClick="fabClick" :popMenu="l1" />
		</view>
	</view>
</template>

<script>
	import uniFab from '../../components/uni-fab/uni-fab.vue'
	export default{
		components: {
		    uniFab
		},
		data(){
			return{
				scrollH: 0,
				imgWidth: 0,
				loadingCount: 0,
				search: '',
				isShow: false,
				images: [],
				col1: [],
				col2: [],
				col1H: 0,
				col2H: 0,
				pattern: {
					color: '#007AFF',
					backgroundColor: '#fff',
					buttonColor: '#00F5FF'
				},
				params: {
					limit: 10,
					skip: 0,
					search: ''
				},
				l1:false,
				nickName: ''
			}    
		},
		onBackPress() {
			if (this.$refs.fab.isShow) {
				this.$refs.fab.close()
				return true
			}
			return false
		},
		onLoad () {
		        wx.getSystemInfo({
		            success: (res) => {
		                let ww = res.windowWidth;
		                let wh = res.windowHeight;
		                let imgWidth = ww * 0.48;
		                let scrollH = wh;
						
		                 this.scrollH= scrollH;
		                this.imgWidth = imgWidth;
		 
		                //加载首组图片
		                this.loadImages();
		            }
		        });
				uni.getStorage({
				    key: 'wxUserInfo',
				    success: (res) => {
						this.nickName =res.data.nickName
				    }
				});
		},
		onPullDownRefresh(){
			this.images = []
			this.col1 = []
			this.col2 = []
			this.col1H= 0,
			this.col2H= 0,
			this.params.skip = 0
			uni.showLoading({ title: '正在刷新', mask: true });
			this.loadImages();
			uni.hideLoading();
			uni.stopPullDownRefresh();	
		},
		onReachBottom(){
			if(this.images){
				this.params.skip += this.params.limit
				this.loadImages();
			}else{
				uni.showToast({
					title:'没有数据了',
					duration: 1000,
					icon:"none"
				})
			}
			
		},
		methods: {
			// 搜索
			headSearch(){
				this.params.search = this.search
				this.params.skip = 0
				this.loadImages();
			},
			headChange(){
				this.isShow = true
			},
			headColse(){
				this.search = ''
				this.isShow = false
			},
			// 跳转到发布页面
			fabClick() {
				if(this.nickName !== ''){
					uni.navigateTo({
						url:"./publish/publish"
					})
				}else{
					uni.showModal({
					    title: '提示',
					    content: '您还未登录，前往登录！',
					    success: function (res) {
					        if (res.confirm) {
								uni.switchTab({
								    url: '/pages/me/me'
								});
					        } else if (res.cancel) {
					   //          console.log('用户点击取消');
					        }
					    }
					});
				}
			},
			// 处理图片
			onImageLoad(e) {
			    let imageId = e.currentTarget.id;
			    let oImgW = e.detail.width;         //图片原始宽度
			    let oImgH = e.detail.height;        //图片原始高度
			    let imgWidth = this.imgWidth;  //图片设置的宽度
			    let scale = imgWidth / oImgW;        //比例计算
			    let imgHeight = oImgH * scale;      //自适应高度
					 
			    let images = this.images;
			    let imageObj = null;
			    for (let i = 0; i < images.length; i++) {
			        let img = images[i];
			        if (img.id === imageId) {
			            imageObj = img;
			            break;
			        }
			    }
			    imageObj.height = imgHeight;
					 
			    let loadingCount = this.loadingCount - 1;
			    let col1 = this.col1;
			    let col2 = this.col2;
					 
			    //判断当前图片添加到左列还是右列
			    if (this.col1H <= this.col2H) {
			        this.col1H += imgHeight;
			        col1.push(imageObj);
			    } else {
			        this.col2H += imgHeight;
			        col2.push(imageObj);
			    }
			    this.loadingCount = loadingCount;
			    this.col1 = col1;
			    this.col2 = col2;
			    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
			    if (!loadingCount) {
			        this.images = [];
			    }
			},
			loadImages() {
				let images = this.getImages()
				/*
			    let images = [
			        { id: 1, src: '../../static/img/1.jpg', title: '阿拉斯加',name:'张三',headSrc:'../../static/img/11.jpg' },
			        { id: 2, src: '../../static/img/2.jpg', title: '橘猫',name:'张三',headSrc:'../../static/img/11.jpg'},
			        { id: 3, src: '../../static/img/3.jpg' , title: '黄色的狗',name:'张三',headSrc:'../../static/img/11.jpg'},
			        { id: 4, src: '../../static/img/4.jpg', title: '两只猫',name:'张三',headSrc:'../../static/img/11.jpg' }
			        { pic: '../../static/img/5.jpg', height: 0 },
			        { pic: '../../static/img/6.jpg', height: 0 },
			        { pic: '../../static/img/7.jpg', height: 0 },
			        { pic: '../../static/img/8.jpg', height: 0 },
			        { pic: '../../static/img/9.jpg', height: 0 },
			        { pic: '../../static/img/10.jpg', height: 0 }
			        { pic: "../../images/11.jpg", height: 0 },
			        { pic: "../../images/12.jpg", height: 0 },
			        { pic: "../../images/13.jpg", height: 0 },
			        { pic: "../../images/14.jpg", height: 0 },
			        { pic: "../../images/15.jpg", height: 0 },
			        { pic: "../../images/16.jpg", height: 0 },
			        { pic: "../../images/17.jpg", height: 0 },
			        { pic: "../../images/18.jpg", height: 0 },
			    ];
				*/ 
			    //let baseId = "img-" + (+new Date());
					 
			    for (let i = 0; i < images.length; i++) {
			        //images[i].id = baseId + "-" + i;
					images[i].id =images[i].id+''
			    }
					 
			    this.loadingCount = images.length,
				this.images = [...this.images, ...images]
			    //this.images = images
			},
			// 访问后端数据
			getImages(){
				this.request({
					url: this.$Url+'/home/community',
					data: this.params,
					method: "POST"
				}).then(result=>{
					if(result.data.length>1){
						return result.data
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
	/* 头部固定 */
	.topnav{
	  position: fixed;
	  top: 0rpx;
	  left: 0;
	  z-index:99;
	  background: #fff;
	  padding: 3%;
	  width: 94%;
	  z-index:999;
	}

	.img{
		width:100%;
		border-radius: 6px;
	}
	.head_search{
		display: flex;
		flex-wrap: nowrap;
		padding: 20rpx;
		background-color: #00BFFF;
		/* margin: 10rpx; */
		border-radius: 5px;
	}
	.head_img{
		margin-top: 5rpx;
	}
	.haed_input{
		margin-left: 15rpx;
		padding-left: 15rpx;
		width: 540rpx;
		height: 70rpx;
		border-radius: 8rpx;
		background-color: #fff;
	}
	.main{
		margin-top: 120rpx;
	  flex: 1;
	  position: relative;
	}
	.mid_title{
		font-size: 35rpx;
		color: #191970;
		padding: 10rpx 0;
		// 隐藏多余字体
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.mid_img{
		width: 50rpx;
		height: 50rpx;
		border-radius: 25rpx;
		
	}
	.mid_name{
		margin-left: 10rpx;
		// 隐藏多余字体
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.mid_buttom{
		display: flex;
		flex-wrap: nowrap;
		padding: 5rpx;
	}
	.img_item {
		width: 48%;
		margin: 1%;
		display: inline-block;
		vertical-align: top;
		margin: 6rpx;
	}
</style>
