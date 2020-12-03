<template>
	<view>
		<view class="content">
			<view class="header-container">
				<view class="date-container">
					<!-- <view class="date">{{formatDateMonth(bill.date)}}</view> -->
					<picker mode="date" :value="currentYearAndMonth" @change="bindDateChange" fields="month">
						<view class="date">{{formatDateMonth(currentYearAndMonth)}}</view>
					</picker>
				</view>
				<view class="count-container">
					<view class="out">
						<view class="label">支出(元)</view>
						<view class="value">{{bill.totalOut}}</view>
					</view>
					<view class="in">
						<view class="label">收入(元)</view>
						<view class="value">{{bill.totalIn}}</view>
					</view>
				</view>
			</view>
		
			<view class="middle-container">
				<view class="card" v-for="(item,index) in bill.billList" :key="index">
					<view class="total">
						<view class="left">
							<image class="icon" src="@/static/img/index/icon-date.png"></image>
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
						<view v-for="(billItem,i) in item.bills" :key="i">
							<view class="item" @click="toBillDetail(index,i)" @touchmove="touchEvent">
								<!-- <image :src="billItem.imgSrc" class="icon"></image> -->
								<view class="iconfont" :class="item.imgSrc"></view>
								<view class="middle">
									<view class="item-name">{{billItem.category}}</view>
									<view class="item-user-container">
										<view class="user">{{billItem.username}}</view>
										<view class="time">{{formatTime(billItem.time)}}</view>
									</view>
								</view>
								<view class="right">
									<view :class="getAmountCategory(billItem,i)" >{{billItem.amount}}</view>
									<view class="account">{{billItem.account}}</view>
								</view>
							</view>
							<!-- item间分割线 -->
							<view class="line" v-if="!isLastItem(item.bills,i)"></view>
						</view>
					</view>
				</view>
			</view>
		
			<view class="footer">
				没有更多了~
			</view>
		
		</view>
		
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar :list="tabbars" active-color="#03a174" inactive-color="#666666" :mid-button="true"></u-tabbar>
	</view>
	
</template>

<script>
import moment from 'moment'
import util  from '@/static/js/utils.js'
export default {
	data() {
		return {
			tabbars: '',
			bill:{
				totalIn:'0.00',
				totalOut:'0.00',
			},
			currentYearAndMonth:moment().format('YYYY-MM'),
			username:''
		};
	},
	onLoad(){
		this.tabbars = [{
				"pagePath": "/pages/tabbar/index/home",
				"iconPath": "/static/img/tabbar/home.png",
				"selectedIconPath": "/static/img/tabbar/homeactive.png",
				"text": "首页"
			},
			{
				"pagePath": "/pages/tabbar/statics/home",
				"iconPath": "/static/img/tabbar/statics.png",
				"selectedIconPath": "/static/img/tabbar/staticsactive.png",
				"text": "统计"
			},
			{
				"pagePath": "/pages/tabbar/add/home",
				"iconPath": "/static/img/tabbar/add.png",
				"selectedIconPath": "/static/img/tabbar/addactive.png",
				"midButton":true,
				"text": "添加"
			},
			{
				"pagePath": "/pages/tabbar/plan/home",
				"iconPath": "/static/img/tabbar/plan.png",
				"selectedIconPath": "/static/img/tabbar/planactive.png",
				"text": "计划"
			},
			{
				"pagePath": "/pages/tabbar/mine/home",
				"iconPath": "/static/img/tabbar/me.png",
				"selectedIconPath": "/static/img/tabbar/meactive.png",
				"text": "我的"
			}
		]
	},
	onShow() {
		this.username = util.getItem("username")
		console.log(this.username,"用户名")
		if(!this.username){
			uni.redirectTo({
				url:'../../sign-in/sign-in',
				animationType: 'pop-in',
				animationDuration: 200
			})
		}
		this.getBills()
	},
	methods: {
		/**
		 * touch move 事件
		 */
		touchEvent(e){
			console.log("toch")
		},
		/**
		 * 跳转到账单详情界面
		 */
		toBillDetail(index,i){
			console.log("click item",this.bill.billList[index].bills[i])
			uni.navigateTo({
				url:"bill/bill?item="+ encodeURIComponent(JSON.stringify(this.bill.billList[index].bills[i]))
				+'&bill='+encodeURIComponent(JSON.stringify(this.bill))
			})
		},
		/**日期改变事件
		 * @param {Object} e
		 */
		bindDateChange(e){
			//设置本地日期
			this.currentYearAndMonth = e.target.value
			
			//发送请求到服务器获取数据
			this.getBills()
		},
		/**
		 * 获取账单列表
		 */
		getBills(){
			//通过赋值解决success方法里面的this指向问题
			let that = this
			//根据年月获取首页账单详情
			uniCloud.callFunction({
				name:'getBillDetail',
				data:{
					username:that.username,
					date:that.currentYearAndMonth
				},
				success(res) {
					console.log(res.result.data)
					if(res.result.data&&res.result.data.length!=0){
						that.bill = res.result.data[0]
					}else{
						that.bill = {
							totalIn:'0.00',
							totalOut:'0.00',
						}
					}
				},
				fail(res) {
					console.log('fail')
				}
			})
		},
		/**
		 * 判断是否是当前日最后一条记账记录
		 * @param {Object} bills
		 * @param {Object} index
		 */
		isLastItem(bills,index){
			console.log(index == bills.length-1,index,"是否最后一个")
			if(index == bills.length-1)
				return true
			return false
		},
		/**
		 * 判断金额是消费还是收入，从而绑定不同的class
		 * @param {Object} billItem
		 * @param {Object} index
		 */
		getAmountCategory(billItem,index){
			if(billItem.category==='支出'){
				return 'money-out'
			}
			return 'money-in'
		},
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
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: #F8F8F8;
}

.header-container{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: 100upx 0 0 0;
	/* background-color: #03a174; */
	background: linear-gradient(135deg, #9796f0, #fbc7d4);;
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
	align-items: flex-end;
	font-size: 28upx;
	color: #333333;
}

.middle-container .card .total .icon{
	height: 40upx;
	width: 40upx;
	padding: 5upx 0 0 0;
	margin:  0 0 0 26upx;
}

.middle-container .card .total .left-label{
	margin: 0 0 0 20upx;
	font-weight: bold;
	font-size: 28upx;
	color: #333333;
}

.in-label{
	margin: 0 0 0 20upx;
	font-weight: bold;
}

.out-label{
	font-weight: bold;
}

.in-value{
	color: #03A174;
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
	box-shadow: 0px 0px 10upx #CCCCCC;
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
	width: 85%;
	height: 1upx;
	background-color: #CCCCCC;
	opacity: 0.3;
	box-shadow: 0 0 2upx #CCCCCC;
	margin: 0 0 0 13%;
}

.detail .icon{
	height: 60upx;
	width: 60upx;
}

.detail .middle{
	display: flex;
	flex-direction: column;
	width: 60%;
	margin: 0 0 0 24upx;
	padding: 18upx 0;
}

.detail .middle .item-name{
	font-size: 28upx;
	font-weight: bold;
	color: #333333;
}

.detail .middle .item-user-container{
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	width: 100%;
	font-size: 26upx;
}

.detail .middle .item-user-container .user{
	color: #333333;
}

.detail .middle .item-user-container .time{
	margin: 0 0 0 15upx;
	font-size: 24upx;
	color: #333333;
}

.detail .right{
	padding: 18upx 15upx 18upx 0;
	width: 30%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;	
}

.detail .right .money-out{
	color: #333333;
}

.detail .right .money-in{
	color: #03A174;
}

.detail .right .account{
	font-size: 24upx;
	color: #333333;
}

.footer{
	font-size: 28upx;
	color: #CCCCCC;
	text-align: center;
	height: 60upx;
	padding: 10upx 0 0 0;
}

</style>
