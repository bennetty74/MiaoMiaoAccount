<template>
	<!-- <view> -->
		<u-navbar :is-back="false" title="">
			<view class="slot-wrap">
				<view class="out" :class="getCurrClass(1)" @click="outClickEvent()">支出</view>
				<view class="in" :class="getCurrClass(2)" @click="inClickEvent()">收入</view>
			</view>
		</u-navbar>
	<!-- </view> -->
</template>

<script>
	export default{
		date(){
			return {
				currPage:1
			}
		},		
		methods:{
			getCurrClass(num){
				if(this.currPage==1 && num == 1){
					return 'out-selected'
				}
				if(this.currPage==2 && num == 2){
					return 'in-selected'
				}
				return ''
			},
			outClickEvent(){
				this.$emit("outClickEvent")
			},
			inClickEvent(){
				this.$emit("inClickEvent")
			}
		}
	}
</script>

<style scoped lang="scss">
	.slot-wrap{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
	/* 该样式必须在selected前面,以便于selected样式覆盖 */
	.slot-wrap .in,.slot-wrap .out{
		color: #03A174;
	}
	
	.slot-wrap .out-selected,.slot-wrap .in-selected{
		color: #FFFFFF;
		background-color: #03A174;
	}
	
	.slot-wrap .out,.slot-wrap .in{
		padding: 4upx 14upx;
		border-radius: 10upx 0 0 10upx;
		border: #03A174 1upx solid;
	}
	
	.slot-wrap .in{
		border-radius: 0 10upx 10upx 0;
	}
</style>
