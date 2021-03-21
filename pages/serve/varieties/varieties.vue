<template>
	<view class="home_tab">
		<!-- 头部信息 -->
		<view class="home_tab_title">
			<view class="title_inner">
				<uni-segmented-control
					:current="current" 
					:values="items.map(v=>v.title)" 
					@clickItem="onClickItem" 
					style-type="text" 
					active-color="#d4237a">
				</uni-segmented-control>
			</view>
		</view>
		<view class="home_tab_content"></view>
			<view v-if="current === 0">
			        <dog @jumpdog = "jumpdog"></dog>
			</view>
			<view v-if="current === 1">
			        <cat @jumpcat = "jumpcat"></cat>
			</view>
		</view>
		
	</view>
</template>
<script>
	import dog from './dog/dog.vue'
	import cat from './cat/cat.vue'
	import uniSegmentedControl from '../../../components/uni-segmented-control/uni-segmented-control.vue'
	export default{
		components:{
			uniSegmentedControl,
			dog,
			cat
		},
		data(){
			return{
				items: [
					{title: '狗'},
					{title: '猫'},
				],
				current: 0
			}
		},
		methods:{
			onClickItem(e) {
			    if (this.current !== e.currentIndex) {
			        this.current = e.currentIndex;
			    }
			},
			jumpdog(data){
				uni.navigateTo({url:"./dog/dogInfo?dogId="+data.item.id})
			},
			jumpcat(data){
				uni.navigateTo({url:"./cat/catInfo?catId="+data.item.id})
			}
		},
		onLoad() {
			
		}
	}
</script>
<style scoped>
	.home_tab_title{
		position: relative;
	}
	.title_inner{
		width: 60%;
		margin: 0 auto;
	}
	.iconfont{
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 5%;
	}
</style>