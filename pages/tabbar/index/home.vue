<template>
	<view class="content">
		<view class="header-container">
			<view class="date-container">
				<view class="date">
					2020年10月
				</view>
			</view>
			<view class="count-container">
				<view class="out">
					<view class="label">
						支出(元)
					</view>
					<view class="value">
						3009.09
					</view>
				</view>
				<view class="in">
					<view class="label">
						收入(元)
					</view>
					<view class="value">
						45009.09
					</view>
				</view>
			</view>
		</view>
	
		<view class="middle-container">
			<view class="card">
				<view class="total">
					<image class="icon" src="../../../static/img/qa.png"></image>
					<view class="left-label">今天</view>
					<view class="out-label">支</view>
					<view class="out-value">45.09</view>
					<view class="in-label">收</view>
					<view class="in-value">600</view>
				</view>
				<view class="detail">
					<view class="item">
						<image src="../../../static/img/qa.png" class="icon"></image>
						<view class="middle">
							<view class="item-name">餐饮-奶茶</view>
							<view class="item-user-container">
								<view class="user">爱记账的喵喵</view>
								<view class="time">3小时前</view>
							</view>
						</view>
						<view class="right">
							<view class="money">-60</view>
							<view class="account">微信钱包</view>
						</view>
					</view>
					<view class="item">
						<image src="../../../static/img/qa.png" class="icon"></image>
						<view class="middle">
							<view class="item-name">餐饮-奶茶</view>
							<view class="item-user-container">
								<view class="user">爱记账的喵喵</view>
								<view class="time">3小时前</view>
							</view>
						</view>
						<view class="right">
							<view class="money">-60</view>
							<view class="account">微信钱包</view>
						</view>
					</view>
				</view>
			</view>
			<view class="card">
				<view class="total">
					<image class="icon" src="../../../static/img/qa.png"></image>
					<view class="left-label">昨天</view>
					<view class="out-label">支</view>
					<view class="out-value">45.09</view>
					<view class="in-label">收</view>
					<view class="in-value">600</view>
				</view>
				<view class="detail">
					<view class="item">
						<image src="../../../static/img/qa.png" class="icon"></image>
						<view class="middle">
							<view class="item-name">餐饮-奶茶</view>
							<view class="item-user-container">
								<view class="user">爱记账的喵喵</view>
								<view class="time">3小时前</view>
							</view>
						</view>
						<view class="right">
							<view class="money">-60</view>
							<view class="account">微信钱包</view>
						</view>
					</view>
					<view class="line">
					</view>
					<view class="item">
						<image src="../../../static/img/qa.png" class="icon"></image>
						<view class="middle">
							<view class="item-name">餐饮-奶茶</view>
							<view class="item-user-container">
								<view class="user">爱记账的喵喵</view>
								<view class="time">3小时前</view>
							</view>
						</view>
						<view class="right">
							<view class="money">-60</view>
							<view class="account">微信钱包</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {
		//调用云函数
		uniCloud.callFunction({
		    name: 'getTotalOutAndIn',
		    data: { a: 1 },
		    success(){
				console.log('哈哈哈')
			},
		    fail(){
				console.log('阿达')
			},
		    complete(){}
		});
	},
	methods: {}
};
</script>

<style>
.content {
	/* margin: 200upx 0 0 0; */
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}

.header-container{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: 100upx 0 0 0;
	/* background-image: url(../../../static/img/index/header_bg.jpg); */
	background-color: #39b54a;
	height: 320upx;
	color: #FFFFFF;
}

.date-container{
	width: 100%;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
}


.date-container .date{
	height: 55upx;
	width: 220upx;
	border-radius: 20upx;
	border: #CCCCCC 1px solid;
}

.count-container{
	display: flex;
	flex-direction: row;
	width: 100%;
	margin: 50upx 0 0 0;
}

.header-container .out , .header-container .in{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50%;
}

.middle-container{
	display: flex;
	flex-direction: column;
}

.middle-container .card{
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10upx 0;
}

.middle-container .card .total{
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	margin: 20upx 0 20upx 0;
}

.middle-container .card .total .icon{
	height: 35upx;
	width: 35upx;
	padding: 5upx 0 0 0;
	margin:  0 0 0 26upx;
}

.middle-container .card .total .left-label{
	margin: 0 0 0 10upx;
	font-weight: bold;
}

.middle-container .card .total .out-label{
	margin: 0 0 0 38%;
}

.in-label{
	margin: 0 0 0 20upx;
}

.out-value,.in-value{
	margin: 0 0 0 10upx;
}

.detail{
	display: flex;
	flex-direction: column;
	margin: 20upx 0 0 0;
	width: 90%;
	padding: 0 0 0 20upx;
	box-shadow: 0px 0px 5px #CCCCCC
}


.detail .item{
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 10upx 0;
}

.detail .line{
	width: 80%;
	height: 1upx;
	background-color: #CCCCCC;
}

.detail .icon{
	height: 60upx;
	width: 60upx;
}

.detail .middle{
	display: flex;
	flex-direction: column;
	width: 70%;
	margin: 0 0 0 40upx;
	padding: 18upx 0;
	/* border-bottom: #CCCCCC solid 1upx; */
}

.detail .middle .item-user-container{
	display: flex;
	flex-direction: row;
	width: 100%;
	font-size: 26upx;
}

.detail .middle .item-user-container .time{
	margin: 0 0 0 15upx;
}

.detail .right{
	/* margin: 0 0 0 15%; */
	padding: 36upx 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* border-bottom: #CCCCCC solid 1upx; */
}

.detail .right .account{
	font-size: 22upx;
}



</style>
