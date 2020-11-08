<template>
	<view class="content">
		<view class="assets">
			<view class="net">
				<view class="label">净资产(元)：</view>
				<view class="value">{{total_net_assets}}</view>
			</view>
			<view class="details-container">
				<view class="item-container">
					<view class="label">负债：</view>
					<view class="debt">{{total_debt}}</view>
				</view>
				<view class="item-container">
					<view class="label">总资产：</view>
					<view class="total-assets">{{total_assets}}</view>
				</view>
			</view>
		</view>
		<view class="list-header">
			<view class="label">我的账户</view>
			<view class="count">(10)</view>
		</view>
		<view class="list-body">
			<view class="item">
				<view class="left">
					<image src="../../../../static/img/index/icon-date.png" class="icon"></image>
				</view>
				<view class="middle">
					<view class="top">
						现金
					</view>
					<view class="bottom">
						<view class="bf">信用卡</view>
						<view class="br">备注</view>
					</view>
				</view>
				<view class="right">
					<view class="rt">-10947.09</view>
					<view class="rb">剩余额度：34653410947.09</view>
				</view>
			</view>
			
			<view class="item">
				<view class="left">
					<image src="../../../../static/img/index/icon-date.png" class="icon"></image>
				</view>
				<view class="middle">
					<view class="top">
						现金
					</view>
					<view class="bottom">
						<view class="bf">信用卡</view>
						<view class="br">备注</view>
					</view>
				</view>
				<view class="right">
					<view class="rt">-10947.09</view>
				</view>
			</view>
		</view>
		
		<view class="button">
			<image class="icon" src="../../../../static/img/mine/add.png"></image>
			<view class="label">添加账户</view>
		</view>
	</view>
</template>

<script>
import util  from '../../../../static/js/utils.js'
	export default {
		data() {
			return{
				total_net_assets:'0.00',//净资产
				total_debt:'0.00',//总负债
				total_assets:'0.00',//总资产
				accounts:[],//账户列表
			}
		},
		onLoad() {
			this.getUserAccountsAndAeests()
		},
		methods: {
			async getUserAccountsAndAeests(){
				let that = this;
				let username = util.getItem("username")
				console.log(username,"取出来的数据")
				uniCloud.callFunction({
					name:'getAccountsAndAssets',
					data:{
						username:username,
					},
					success(res) {
						console.log(res.result.data[0],'数据')
						if(res.result.data&&res.result.data.length!=0){
							that.total_net_assets = res.result.data[0].total_net_assets
							that.total_debt = res.result.data[0].total_debt
							that.total_assets = res.result.data[0].total_assets
						}else{
							that.total_net_assets = '0.00'
							that.total_debt = '0.00'
							that.total_assets = '0.00'
						}
					},
					fail(res) {
						console.log('fail')
					}
				})
			},
		}
	}
</script>

<style>
.content{
	background-color: #F8F8F8;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	position: absolute;
}
.assets{
	display: flex;
	flex-direction: column;
	width: 100%;
	background-color: #FFFFFF;
}

.assets .net{
	font-size: 40upx;
	color: #333333;
	display: flex;
	flex-direction: row;
	padding: 40rpx 0 0 40rpx;
}

.assets .net .value{
	color: #03A174;
}

.assets .details-container{
	display: flex;
	flex-direction: row;
	width: 100%;
	align-items: center;
	font-size: 32rpx;
}

.assets .details-container .item-container{
	display: flex;
	flex-direction: row;
	padding: 40rpx 0 40rpx 40rpx;
	
}
.assets .details-container .item-container .debt{
	color: #DD524D;
}

.assets .details-container .item-container .total-assets{
	color: #03A174;
}

.list-header {
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 90%;
	padding: 10rpx 0 10rpx 10rpx;
	margin-top: 20rpx;
}

.list-header .label,.list-header .count{
	color: #ACACAC;
	font-size: 28rpx;
}

.list-body{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}

.list-body .item{
	background-color: #FFFFFF;
	width: 90%;
	height: 120rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	margin: 12rpx 0 12rpx 0;
	padding: 10rpx 0 10rpx 0;
	border-radius: 16rpx;
}
.list-body .left{
	height: 80rpx;
	width: 80rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-left: 20rpx;
}
.list-body .left .icon{
	height: 70rpx;
	width: 70rpx;
}
.list-body .middle{
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	margin-left: 20rpx;
	height: 100rpx;
	width: 35%;
}
.list-body .middle .top{
	font-size: 32rpx;
}

.list-body .middle .bottom{
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 24rpx;
}
.list-body .middle .bottom .bf{
	border: #03A174 1rpx solid;
	border-radius: 6rpx;
	color: #03A174;
	padding: 2rpx 12rpx;
}

.list-body .middle .bottom .br{
	margin-left: 16rpx;
	color: #ACACAC;
}
.list-body .right{
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: space-around;
	width: 50%;
	height: 100rpx;
	padding-right: 16rpx;
}

.list-body .right .rt{
	color: #333333;
	font-size: 28rpx;
}
.list-body .right .rb{
	color: #ACACAC;
	font-size: 24rpx;
}
.button{
	width: 90%;
	height: 80rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: #FFFFFF;
	margin-top: 80rpx;
	border-radius: 10rpx;
}
.button .icon{
	width: 36rpx;
	height: 36rpx;
}
.button .label{
	margin-left: 20rpx;
	color: #03A174;
}
</style>
