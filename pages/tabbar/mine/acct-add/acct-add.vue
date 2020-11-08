<template>
	<view class="content">
		<view class="header">
			<image class="img" :src="acctArray[acctIndex].imgSrc" mode=""></image>
			<!-- <image class="img" src="../../../../static/img/mine/acct/招商银行.png" mode=""></image> -->
			<view class="label">{{acctArray[acctIndex].name}}</view>
		</view>
		<view class="list">
			<view class="item">
				<view class="label">账户名称</view>
				<picker class="value" @change="bindAcctChange" :value="acctIndex" :range="acctArray" :range-key="'name'">
					<view class="uni-input">{{acctArray[acctIndex].name}}</view>
				</picker>
			</view>
			<view class="item">
				<view class="label">余额</view>
				<input class="value" type="text" v-model="balance" placeholder="0" />
			</view>
			<view class="item" style="margin-top: 20rpx;">
				<view class="label">银行卡号</view>
				<input class="value" type="text" v-model="cardNumber" placeholder="请输入银行卡号后四位"/>
			</view>
			<view class="item">
				<view class="label">备注</view>
				<input class="value" type="text" v-model="note" placeholder="如工资卡/消费卡等"/>
			</view>
		</view>
		<view class="button" @click="submit">添加</view>
	</view>
</template>

<script>
import util from '../../../../static/js/utils.js'
	export default {
		data() {
			return {
				acctArray:[
					{
						name:"微信",
						imgSrc:'../../../../static/img/mine/acct/微信.png',
						category:'debit'
					},
					{
						name:"支付宝",
						imgSrc:'../../../../static/img/mine/acct/支付宝.png',
						category:'debit'
					},
					{
						name:"招商银行",
						imgSrc:'../../../../static/img/mine/acct/招商银行.png',
						category:'debit'
					}
				],
				acctIndex:0,
				balance:'',
				cardNumber:'',
				note:'',
			}
		},
		onShow() {
			
		},
		methods: {
			bindAcctChange(e){
				this.acctIndex = e.target.value
			},
			submit(){
				let username = util.getItem("username")
				let that = this
				uniCloud.callFunction({
					name:'addUserAcct',
					data:{
						username:username,
						name:that.acctArray[that.acctIndex].name,
						imgSrc:that.acctArray[that.acctIndex].imgSrc,
						balance:that.balance,
						category:that.acctArray[that.acctIndex].category,
						note:that.note
					},
					success(res) {
						console.log(res,"成功")
					},
					fail(res) {
						console.log('fail')
					}
				})
			}
		}
	}
</script>

<style>
.content{
	width: 100%;
	height: 100%;
	position: absolute;
	background-color: #F8F8F8;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.content .header{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 300rpx;
	padding-top: 40rpx;
	background-color: #FFFFFF;
}

.header .img{
	width: 200rpx;
	height: 200rpx;
}

.header .label{
	margin-top: 30rpx;
}

.list{
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20rpx;
}
.list .item{
	width: 100%;
	height: 60rpx;
	background-color: #FFFFFF;
	padding: 26rpx 4rpx 6rpx 0;
	margin: 1rpx 0 1rpx 0;
}
.list .item .label{
	float: left;
	margin-left: 20rpx;
}
.list .item .value{
	float: right;
	margin-right: 20rpx;
	text-align: right;
}

.list .line{
	width: 100%;
	height: 1rpx;
	background-color: #CCCCCC;
}
.button{
	width: 90%;
	height: 80rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: #03A174;
	color: #FFFFFF;
	margin-top: 80rpx;
	border-radius: 10rpx;
}
</style>
