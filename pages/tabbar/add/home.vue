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
				账户
			</view>
			<view class="value">
				<!-- <image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image> -->
				<view class="text">
					微信零钱
				</view>
			</view>
		</view>
		
		<view class="keybord">
			<view class="keybord-top">
				<view class="note">
					<image class="icon" src="../../../static/img/qa.png" mode=""></image>
					<text>备注:</text>
				</view>
				<input class="note-input" type="text" v-model="note" placeholder="填写备注..."/>
				<view class="amount">
					{{amount}}
				</view>
			</view>
			<view class="keybord-content">
				<view class="item number">7</view>
				<view class="item number">8</view>
				<view class="item number">9</view>
				<view class="item number">=</view>
				
				<view class="item number">4</view>
				<view class="item number">5</view>
				<view class="item number">6</view>
				<view class="item number">+</view>
				
				<view class="item number">1</view>
				<view class="item number">2</view>
				<view class="item number">3</view>
				<view class="item number">-</view>
				
				<view class="item number">.</view>
				<view class="item number">0</view>
				<view class="item number">x</view>
				<view class="item complete">完成</view>
			</view>
		</view>
		
		
	
	</view>
</template> 

<script>
export default {
	data() {
		return {
			amount:'0.00',
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

.keybord{
	width: 100%;
	height: 40%;
	display: flex;
	flex-direction: column;
	position: fixed;
	bottom: 0upx;
}

.keybord-top{
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
}

.keybord-top .note{
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 25%;
	padding: 0 0 0 40upx;
}

.keybord-top .note .icon{
	height: 30upx;
	width: 30upx;
}

.keybord-top .note-input{
	width: 55%;
}

.keybord-top .amount{
	width: 20%;
	text-align: center;
}

.keybord-content{
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	flex-wrap: wrap;
	width: 100%;
	height: 85%;
	margin: 15upx 0 0 0;
}

.keybord-content .item{
	width: 24.6%;
	height: 25%;
	background-color: #f0f2f1;
	border: #ececec 1upx solid;
	text-align: center;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 1upx 0 0 0;
	/* padding: 25upx 0 0 0; */
}

.keybord-content .complete{
	background-color: #03a174;
	color: #FFFFFF;
}

</style>
