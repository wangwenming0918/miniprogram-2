<template>
	<!-- <view v-if="isHide"> -->
	<view v-if="false">
	  <view v-if="canIUse">
	    <view class='header'>
	      <image src='../../static/weixin.png'></image>
	    </view>
	
	    <view class='content'>
	      <view>申请获取以下权限</view>
	      <text>获得你的公开信息(昵称，头像等)</text>
	    </view>
	
	    <button class='bottom' type='primary' open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo">
	      授权登录
	    </button>
	  </view>
	  <view wx:else>请升级微信版本</view>
	</view>
	
	<view v-else>
	  <view class="userinfo">
			  <!-- bindtap="bindViewTap" -->
			  <image  class="userinfo-avatar" src="../../static/images/icons/head.png" background-size="cover"></image>
			  <view class="uName">
				  <view style="text-align: center;">
					  <text class="userinfo-nickname">{{userInfo.userName}}</text>
				  </view style="text-align: center;">
				  <view>
					  <text class="editZiliao">编辑资料</text>
				  </view>
				  
			  </view>
			  <view class="detail3">
			    <text>></text>
			  </view>
	      
	  </view>
	
	  <view class="hr"></view>
	  <navigator url="../shopping/order/myOrder" class='item'>
	    <view class="title">我的订单</view>
	    <view class="detail2">
	      <text>></text>
	    </view>
	  </navigator>
	  <view class="line"></view>
	
	
	  <navigator url="address/address" class='item'>
	    <view class="title">我的地址</view>
	    <view class="detail2">
	      <text>></text>
	    </view>
	  </navigator>
	  <view class="line"></view>
	  
	  
	  <navigator url="../community/publish/mypublish" class='item'>
	    <view class="title">我的发表</view>
	    <view class="detail2">
	      <text>></text>
	    </view>
	  </navigator>
	  <view class="line"></view>
	
	
	<!--  <navigator url="../serve/serve" class='item'>
	    <view class="title" bindtap="chaxun">服务</view>
	    <view class="detail2">
	      <text> ></text>
	    </view>
	  </navigator> -->
	  <view class="line"></view>

	  <view class="hr"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				// canIUse: wx.canIUse('button.open-type.getUserInfo'),
				// isHide: false,
				userData: {}
			}
		},
		onLoad() {
			
		uni.getStorage({
		    key: 'loginUser',
		    success: (res) => {
					this.userInfo = res.data
			},
			fail:(res)=> {
				uni.reLaunch({
					url:"./login"
				})
			}
		});	
		},
		methods: {
			bindGetUserInfo (e) {
				var that = this
				console.log(e)
			  if (e.detail.userInfo) {
			    console.log("用户的信息如下：");
			    console.log(e.detail.userInfo);
			    //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
			      that.isHide = false,
			      that.userInfo = e.detail.userInfo
			  } else {
			    //用户按了拒绝按钮
			    wx.showModal({
			      title: '警告',
			      content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
			      showCancel: false,
			      confirmText: '返回授权',
			      success: function(res) {
			        // 用户没有授权成功，不需要改变 isHide 的值
			        if (res.confirm) {
			          console.log('用户点击了“返回授权”');
			        }
			      }
			    });
			  }
			},
			saveuser(){
				this.request({
					url: this.$Url+'/user/saveuser',
					data: this.userInfo,
					method: "POST"
				}).then(result=>{
					if(result.data.length>1){
						this.userData = result.data
						uni.setStorage({
							key: 'userData',
							data: this.userData
						})
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
		},
		/*
		onLoad() {
			var that = this
			wx.getSetting({
			  success(res) {
			    if (res.authSetting['scope.userInfo']) {
			      wx.getUserInfo({
			        success: function(res) {
					  uni.setStorage({
					  	key: 'wxUserInfo',
					  	data: res.userInfo
					  }),
					  //info = res.userInfo
					  //App.globalData.userInfo = res.userInfo
			          that.userInfo = res.userInfo,
			          wx.login({
			            success: res => {
							// this.saveuser();
			            }
			          });
			        }
			      });
			    } else {
			      that.isHide = true
			    }
			  }
			});
		}
		*/
	}
</script>

<style scoped>
	.userinfo {
	  display: flex;
	  /* flex-direction: row; */
	  /* align-items: center; */
	  flex-wrap: nowrap;
	  background: #eb6161;
	  /* width: 100%; */
	  height: 300rpx;
	}

	.userinfo-avatar {
	  width: 128rpx;
	  height: 128rpx;
	  margin: 20rpx;
	  border-radius: 50%;
	}

	.userinfo-nickname {
	  color: black;
	}

	.header {
	  margin: 90rpx 0 90rpx 50rpx;
	  border-bottom: 1px solid #ccc;
	  text-align: center;
	  width: 650rpx;
	  height: 300rpx;
	  line-height: 450rpx;
	}

	.header image {
	  width: 200rpx;
	  height: 200rpx;
	}

	.content {
	  margin-left: 50rpx;
	  margin-bottom: 90rpx;
	}

	.content text {
	  display: block;
	  color: #9d9d9d;
	  margin-top: 40rpx;
	}

	.bottom {
	  border-radius: 80rpx;
	  margin: 70rpx 50rpx;
	  font-size: 35rpx;
	}

	/* 用户中心 */

	.hr {
	  width: 100%;
	  height: 15px;
	  background-color: #f4f5f6;
	}
	.item {
	  display: flex;
	  flex-direction: row;
	}
	.title {
	  padding-top: 15px;
	  padding-bottom: 15px;
	  padding-left: 15px;
	  font-size: 15px;
	}

	.detail2 {
	  font-size: 15px;
	  position: absolute;
	  right: 10px;
	  height: 50px;
	  line-height: 50px;
	  color: #888;
	}
	.detail3 {
	  font-size: 20px;
	  position: absolute;
	  right: 10px;
	  height: 70px;
	  line-height: 70px;
	  color: #000;
	}

	.line {
	  border: 1px solid #ccc;
	  opacity: 0.2;
	}
	.uName{
		flex-wrap: wrap;
		padding-top: 50rpx;
	}
	.editZiliao{
		font-size: 35rpx;
		color: #90EE90;
	}
</style>
