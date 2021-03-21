<template>
	<view>
		<view>
		<map id="map"
			:longitude="longitude"
			:latitude="latitude"
			scale="14"
			:markers="markers"
			bindmarkertap="markertap"
			bindregionchange="regionchange"
			show-location
			style="width: 100%; height: 300px;"
		>
		</map>
		</view>
		<view>
			<button type="primary" @click="chazhao">查找附近宠物医院</button>
			<button type="primary" @click="navigate">导航</button>
			<button type="primary" @click="daohang">导航</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				markers: [
					{
						iconPath: "../../../../static/img/map.png",
						id: 4,
						latitude: 31.938841,
						longitude: 118.799698,
						width: 30,
						height: 30
					}
				],
				latitude:'',
				longitude: '',
			}
		},
		onLoad() {
			uni.getLocation({
				type: 'gcj02',
				success: (res) => {
					console.log(res)
					this.latitude = res.latitude,
					this.longitude = res.longitude
				},
			})
		},
		methods:{
			navigate() {
			////使用微信内置地图查看标记点位置，并进行导航
				// wx.openLocation({
				// 	latitude: this.markers[0].latitude,//要去的纬度-地址
				// 	longitude: this.markers[0].longitude,//要去的经度-地址
				// })
				
				uni.getLocation({
				    type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				    success: function (res) {
				        const latitude = res.latitude;
				        const longitude = res.longitude;
				        uni.openLocation({
				            latitude: latitude,
				            longitude: longitude,
				            success: function () {
				                console.log('success');
								let key = 'IL2BZ-H2O3D-3M442-HERXO-SVNIE-BSF2F'
								nui.navigateTo({
								      url: 'http://localhost:8080/map3?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
								});
				            }
				        });
				    }
				});
				
			},
			chazhao(){
				uni.chooseLocation({
				    success: (res) => {
				        console.log('位置名称：' + res.name);
				        console.log('详细地址：' + res.address);
				        console.log('纬度：' + res.latitude);
				        console.log('经度：' + res.longitude);
				    },
					fail:(res) => {
						console.log('出错了'+res);
					}
				});
			},
			daohang(e){
				    var that = this;
				    console.log('选取地址', e);
				    let latitude = that.latitude;
				    let longitude = that.longitude;
				    console.log("latitude", latitude);
				    console.log("longitude", longitude);
				    //this.getUserLocation();
				    const key = 'JODBZ-3K2CD-TP643-PIP4E-12345-I4FR5'; //使用在腾讯位置服务申请的key
				    const referer = '百里快讯'; //调用插件的app的名称
				    const location = JSON.stringify({
				      latitude: latitude,
				      longitude: longitude
				    });
				    const category = '生活服务,娱乐休闲';
				
				    uni.navigateTo({
				      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
				    });
			}
		}
	}

</script>

<style>
</style>
