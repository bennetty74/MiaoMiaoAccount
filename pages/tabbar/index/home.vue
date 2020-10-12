<template>
	<view class="content">
		<view class="header-container">
			<view class="date-container">
				<view class="date">
					{{formatDateMonth(bill.date)}}
				</view>
			</view>
			<view class="count-container">
				<view class="out">
					<view class="label">
						支出(元)
					</view>
					<view class="value">
						{{bill.totalOut}}
					</view>
				</view>
				<view class="in">
					<view class="label">
						收入(元)
					</view>
					<view class="value">
						{{bill.totalIn}}
					</view>
				</view>
			</view>
		</view>
	
		<view class="middle-container">
			<view class="card" v-for="(item,index) in bill.billList" :key="index">
				<view class="total">
					<view class="left">
						<image class="icon" src="../../../static/img/qa.png"></image>
						<view class="left-label">{{formatDate(item.date)}}</view>
					</view>
					<view class="right">
						<view class="out-label">支</view>
						<view class="out-value">{{item.dateTotalOut}}</view>
						<view class="in-label">收</view>
						<view class="in-value">{{item.dateTotalIn}}</view>
					</view>
					
				</view>
				<view class="detail">
					<view class="item" v-for="(billItem,index) in item.bills" :key="index">
						<image src="../../../static/img/qa.png" class="icon"></image>
						<view class="middle">
							<view class="item-name">{{billItem.label}}</view>
							<view class="item-user-container">
								<view class="user">{{billItem.username}}</view>
								<view class="time">{{formatTime(billItem.time)}}</view>
							</view>
						</view>
						<view class="right">
							<view class="money">{{billItem.amount}}</view>
							<view class="account">{{billItem.account}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	
	</view>
</template>

<script>
import moment from 'moment'
export default {
	data() {
		return {
			bill:{}
		};
	},
	onLoad() {
		//通过赋值解决success方法里面的this指向问题
		let that = this
		//获取首页账单详情
		uniCloud.callFunction({
			name:'getBillDetail',
			data:{
				username:'DarLiu&DarQin',
				date:'2020-10'
			},
			success(res) {
				that.bill = res.result.data[0]
				console.log(that.bill,'数据')
			},
			fail(res) {
				console.log('fail')
			}
		})
	},
	methods: {
		/**
		 * 格式化显示时间
		 * @param {Object} date
		 */
		formatTime(date){
			return moment(date).format('HH:mm:ss')
		},
		/**
		 * 格式化显示年月日
		 * @param {Object} date
		 */
		formatDate(date){
			return moment(date).format('MM月DD日')
		},
		/**格式化显示年月
		 * @param {Object} date
		 */
		formatDateMonth(date){
			return moment(date).format('YYYY年MM月')
		}
	}
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
	background-color: #03a174;
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

.middle-container .card .total .left,.middle-container .card .total .right{
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 50%;
}

.middle-container .card .total .right{
	width: 46%;
	justify-content: flex-end;
	font-size: 30upx;
}

.middle-container .card .total .icon{
	height: 35upx;
	width: 35upx;
	padding: 5upx 0 0 0;
	margin:  0 0 0 26upx;
}

.middle-container .card .total .left-label{
	margin: 0 0 0 20upx;
	font-weight: bold;
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
	width: 91%;
	padding: 0 0 0 20upx;
	box-shadow: 0px 0px 5px #CCCCCC;
	border-radius: 10upx;
}


.detail .item{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
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
	width: 60%;
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
	font-size: 24upx;
}

.detail .right{
	/* margin: 0 0 0 15%; */
	padding: 18upx 15upx 18upx 0;
	width: 30%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	/* padding: 0 10upx 0 0; */
	
	/* border-bottom: #CCCCCC solid 1upx; */
}

.detail .right .account{
	font-size: 26upx;
}



</style>
