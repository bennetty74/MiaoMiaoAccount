<template>
	<view>
		<view class="content u-skeleton">
			<view class="header-container">
				<view class="top">
					<view class="left">11月总预算</view>
					<view class="set-btn" @click="toSetPlan">设置预算</view>
				</view>
				<view class="bottom">
					<view class="left">
						<canvas canvas-id="canvasCircle" id="canvasCircle" class="canvas-circle u-skeleton-circle"></canvas>
					</view>
					<view class="right">
						<view class="item u-skeleton-rect">
							<view class="label">本月预算</view>
							<view class="value">{{plan.plan}}</view>
						</view>
						<view class="item-mini u-skeleton-rect">
							<view class="label">剩余预算</view>
							<view class="value">{{plan.remain}}</view>
						</view>
						<view class="item-mini u-skeleton-rect">
							<view class="label">本月支出</view>
							<view class="value">{{plan.cost}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="list-container">
				<view class="title">本月消费Top5</view>
				<view class="detail">
					<view v-for="(item,i) in bills" :key="i">
						<view class="item u-skeleton-rect" @click="toBillDetail(index,i)" @touchmove="touchEvent">
							<view  class="icon iconfont icon-jine selected"></view>
							<view class="middle">
								<view class="item-name">{{item.category}}</view>
								<view class="item-user-container">
									<view class="user">{{item.username}}</view>
									<view class="time">{{formatTime(item.time)}}</view>
								</view>
							</view>
							<view class="right">
								<view class="money-out" >{{item.amount}}</view>
								<view class="account">{{item.account}}</view>
							</view>
						</view>
						<!-- item间分割线 -->
						<view class="line" v-if="!isLastItem(bills,i)"></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar :list="tabbars" active-color="#03a174" inactive-color="#666666" :mid-button="true"></u-tabbar>
		<!--引用骨架组件-->
		<u-skeleton :loading="loading" :animation="true"></u-skeleton>
	</view>
</template>

<script>
import uCharts from '../../../js_sdk/u-charts/u-charts/u-charts.js';
import moment from 'moment'
import util  from '@/static/js/utils.js'
var _self;
var canvasCircle;
export default {
	data() {
		return {
			loading:true,
			tabbars:'',
			cWidth3:'',//圆弧进度图
			cHeight3:'',//圆弧进度图
			arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
			pixelRatio:1,
			chartData: {
				series: [{
					name: '已用',
					data: 0.29,
					color: '#03A174'
				}]
			},
			bills:[
				{username:"DarLiu",amount:"2532.45",time:"2020-11-12 18:09:34",category:"购物",account:"微信零钱"},
				{username:"DarLiu",amount:"2532.45",time:"2020-11-12 18:09:34",category:"购物",account:"微信零钱"},
				{username:"DarLiu",amount:"2532.45",time:"2020-11-12 18:09:34",category:"购物",account:"微信零钱"},
				{username:"DarLiu",amount:"2532.45",time:"2020-11-12 18:09:34",category:"购物",account:"微信零钱"},
				{username:"DarLiu",amount:"2532.45",time:"2020-11-12 18:09:34",category:"购物",account:"微信零钱"},
			],
			currentYearAndMonth:moment().format('YYYY-MM'),
			username:'',
			plan:{}
		}
	},
	onLoad() {
		this.username = util.getItem("username")
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
		
		_self = this;
		this.cWidth3=uni.upx2px(200);//这里要与样式的宽高对应
		this.cHeight3=uni.upx2px(200);//这里要与样式的宽高对应
		this.arcbarWidth=uni.upx2px(16);
		this.getServerData();
		this.getBills();
	},
	methods: {
		toSetPlan(){
			uni.navigateTo({
				url:'set-plan/set-plan'
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
		 * 格式化显示时间
		 * @param {Object} date
		 */
		formatTime(date){
			return moment(date).format('HH:mm:ss')
		},
		/**
		 * 获取预算数据
		 */
		getServerData(){
			//通过赋值解决success方法里面的this指向问题
			let that = this
			//根据年月获取首页账单详情
			uniCloud.callFunction({
				name:'getPlan',
				data:{
					username:that.username,
					date:that.currentYearAndMonth
				},
				success(res) {
					console.log(res.result.data)
					if(res.result.data&&res.result.data.length!=0){
						that.plan = res.result.data[0]
					}
					_self.chartData.series[0].data = that.plan.cost/that.plan.plan
					console.log(_self.chartData)
					_self.showArcbar("canvasCircle",_self.chartData);
					that.loading = false
				},
				fail(res) {
					console.log('fail')
				}
			})
		},
		showArcbar(canvasId,chartData){
			canvasCircle=new uCharts({
				$this:_self,
				canvasId: canvasId,
				type: 'arcbar',
				fontSize:11,
				legend:{show:false},
				background:'#FFFFFF',
				pixelRatio:_self.pixelRatio,
				series: chartData.series,
				animation: true,
				width: _self.cWidth3*_self.pixelRatio,
				height: _self.cHeight3*_self.pixelRatio,
				dataLabel: true,
				title: {
					name: Math.round(chartData.series[0].data*100)+'%',//这里我自动计算了，您可以直接给任意字符串
					color: chartData.series[0].color,
					fontSize: 20*_self.pixelRatio
				},
				subtitle: {
					name: chartData.series[0].name,//这里您可以直接给任意字符串
					color: '#666666',
					fontSize: 14*_self.pixelRatio
				},
				extra: {
					arcbar:{
						type:'circle',
						width: _self.arcbarWidth*_self.pixelRatio,//圆弧的宽度
						startAngle:0.5//整圆类型只需配置起始角度即可
					}
				}
			});
		},
		/**
		 * 获取账单列表
		 */
		getBills(){
			// //通过赋值解决success方法里面的this指向问题
			// let that = this
			// //根据年月获取首页账单详情
			// uniCloud.callFunction({
			// 	name:'getBillDetail',
			// 	data:{
			// 		username:that.username,
			// 		date:that.currentYearAndMonth
			// 	},
			// 	success(res) {
			// 		console.log(res.result.data)
			// 		if(res.result.data&&res.result.data.length!=0){
			// 			that.bill = res.result.data[0]
			// 		}else{
			// 			that.bill = {
			// 				totalIn:'0.00',
			// 				totalOut:'0.00',
			// 			}
			// 		}
			// 	},
			// 	fail(res) {
			// 		console.log('fail')
			// 	}
			// })
		},
		setPlan(){
			
		}
	}
}
</script>

<style>
.content{
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #F8F8F8;
	width: 100%;
	height: 100%;
}

.content .header-container{
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	background-color: #FFFFFF;
	height: 280rpx;
}

.header-container .top{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 90%;
}

.header-container .top .left{
	color: #333333;
	font-weight: bold;
}

.header-container .top .set-btn{
	border: #03A174 solid 1rpx;
	border-radius: 8rpx;
	padding: 4rpx 6rpx;
	color: #03A174;
	font-size: 24rpx;
}

.header-container .bottom{
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	margin-top: 20rpx;
}

.header-container .bottom .left{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 36%;
	/* height: 120rpx; */
}

.header-container .bottom .left .canvas-circle{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 200rpx;
	height: 200rpx;
}

.header-container .bottom .right{
	width: 60%;
}

.header-container .bottom .right .item,.header-container .bottom .right .item-mini{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0 40rpx 0 0;
	margin-bottom: 20rpx;
	font-size: 32rpx;
	color: #333333;
}

.header-container .bottom .right .item-mini{
	font-size: 28rpx;
	padding-left: 10rpx;
	color: #999999;
}

.content .list-container{
	margin-top: 40upx;
	width: 100%;
	background-color: #FFFFFF;
}

.list-container .title{
	margin: 20rpx 0 0 20rpx;
	font-weight: bold;
	font-size: 32rpx;
	width: 95%;
}

.detail{
	display: flex;
	flex-direction: column;
	width: 96%;
	padding: 0 0 0 20upx;
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

.selected{
	color: #03A174;
}

</style>
