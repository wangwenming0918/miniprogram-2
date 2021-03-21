<template>
	<view>
		<view class="reg">
			<navigator open-type="redirectTo" url="./login">
				<span>登录</span>
			</navigator>
		</view>
		<view class="title">
			<h3>欢迎注册宠都！</h3>
		</view>
		<view class="userAndPass">
			<view class="name">
				<input type="text" v-model="user.userName" placeholder="请输入账号" />
			</view>
			<view class="pass">
				<input type="text" password v-model="user.password" placeholder="请输入密码" />
			</view>
			<view class="pass">
				<input type="text" password v-model="passwordNew" placeholder="请再次输入密码" />
			</view>
		</view>
		<view class="button">
			<!-- <button size="default" @click="login()" type="primary">登录</button> -->
			<button size="default" @click="register()" type="primary">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				user:{
					userName: '',
					password: '',
				},
				passwordNew: '',
				
			}
		},
		onLoad() {
		},
		methods:{
			register(){
				if(this.user.password.trim()!==this.passwordNew.trim()){
					uni.showToast({
					    title: '两次输入密码不一致',
					    duration: 2000,
						mask: 'true',
						icon: 'none'
					});
				}else{
					if(this.user.userName.trim()!==''&&this.user.password.trim()!==''){
						this.user.userName=this.user.userName.trim();
						this.user.password=this.user.password.trim();
						// this.registerMethod(this.user)
						uni.reLaunch({
							url:"./login"
						})
					}else{
						uni.showToast({
						    title: '账户或密码不能为空',
						    duration: 2000,
							mask: 'true',
							icon: 'none'
						});
					}
				}
			},
			registerMethod(user){
					this.request({
						url: this.$Url+'/login/login',
						data: this.user,
						method: "POST"
					}).then(result=>{
						if(result.data.length>1){
							uni.showToast({
							    title: '注册成功',
							    duration: 2000,
								mask: 'true'
							});
							uni.reLaunch({
								url:"./login"
							})
						}else{
							uni.showToast({
							    title: '注册失败',
							    duration: 2000,
								mask: 'true',
								icon: 'none'
							});
						}
						
					}).catch(err =>{
						uni.showToast({
						    title: '注册失败',
						    duration: 2000,
							mask: 'true',
							icon: 'none'
						});
					})	
			}
		},
	}
</script>

<style>
	.reg{
		text-align: right;
	}
	.title{
		margin-top: 50rpx;
		margin-bottom: 50rpx;
		text-align: center;
		align-content: center;
	}
	.userAndPass{
		margin-left: 20rpx;
		margin-bottom: 50rpx;
	}
	.name{
		margin-bottom: 40rpx;
		border-bottom: 1rpx solid #ccc;
	}
	.pass{
		margin-bottom: 40rpx;
		border-bottom: 1rpx solid #ccc;
	}
	.button{
		margin: 20rpx;
	}
</style>
