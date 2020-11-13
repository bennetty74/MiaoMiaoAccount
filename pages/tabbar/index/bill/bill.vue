<template>
	<view class="content">
		<view class="top">
			<view class="item">
				<view class="left">分类</view>
				<view class="right"><image :src="item.imgSrc"></image></view>
			</view>
			<view class="item">
				<view class="left">金额</view>
				<view class="right">{{item.amount}}</view>
			</view>
			<view class="item">
				<view class="left">账户</view>
				<view class="right">{{item.account}}</view>
			</view>
			<view class="item">
				<view class="left">备注</view>
				<view class="right">{{item.label}}</view>
			</view>
			<view class="item">
				<view class="left">时间</view>
				<view class="right">{{item.time}}</view>
			</view>
		</view>
		<view class="bottom">
			<view class="left">修改</view>
			<view class="right">删除</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item:{},
				bill:{}
			}
		},
		onLoad(option) {
			this.item = JSON.parse(decodeURIComponent(option.item))
			this.bill = JSON.parse(decodeURIComponent(option.bill))
			console.log(this.item,"--------")
			console.log(this.bill,"========")
		},
		methods: {
			
		}
	}
</script>

<style>
.content{
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	background-color: #F8F8F8;
	width: 100%;
	height: 100%;
}
.top{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 80%;
}

.top .item{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 20rpx 0;
	margin-top: 1rpx;
	background-color: #FFFFFF; 
}
.top .item image{
	width: 50rpx;
	height: 50rpx;
}
.top .item .left{
	margin-left: 20rpx;
}
.top .item .right{
	margin-right: 20rpx;
}
.bottom{
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	justify-content: flex-end;
	width: 100%;
	height: 20%;
}

.bottom .left,.bottom .right{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: #03A174;
	color: #FFFFFF;
	height: 80rpx;
	width: 50%;
}

</style>
