<template>
	<view class="content">
		<view class="category">
			<view class="item">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="name">购物</view>
			</view>
			<view class="item">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="name">购物</view>
			</view>
			<view class="item">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="name">购物</view>
			</view>
			<view class="item">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="name">购物</view>
			</view>
			<view class="item">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="name">购物</view>
			</view>
			<view class="item">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="name">购物</view>
			</view>
			<view class="item">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="name">购物</view>
			</view>
			<view class="item">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="name">购物</view>
			</view>
			<view class="item">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="name">购物</view>
			</view>
			<view class="item">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="name">购物</view>
			</view>
		</view>
		<view class="account">
			<view class="label">
				支出账户
			</view>
			<view class="value">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="text">
					微信零钱
				</view>
			</view>
		</view>
		
		<view class="money">
			金额<input class="input" type="number" placeholder="输入金额" @confirm="submit()" confirm-type="done"/>
		</view>
	
	</view>
</template> 

<script>
export default {
	data() {
		return {
			
		};
	},
	
	methods: {
		submit(){
			console.log('submit')
			uni.hideKeyboard()
		}
	}
};
</script>

<style scoped>

.content{
	display: flex;
	flex-direction: column;
	align-items: center;
}
.category{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	width: 100%;
}

.category .item{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 20%;
	padding: 20upx 0 20upx 0;
}

.category .item .icon,.account .value .icon{
	height: 45upx;
	width: 45upx;
}

.account{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin: 50upx 0 0 0;
	/* padding: 0 0 0 45upx; */
	width: 88%;
}

.account .value{
	display: flex;
	flex-direction: row;
	align-items: center;
	/* margin: 0 0 0 50%; */
}

.account .value .text{
	margin: 0 0 0 15upx;
}

.money{
	width: 88%;
	height: 50upx;
	text-align: end;
	margin: 50upx 0 0 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.money .input{
	padding: 0 0 0 20upx ;
	width: 150upx;
	font-size: 36upx;
}

</style>
