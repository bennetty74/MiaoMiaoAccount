<template>
	<view>
		<view class="content">
			<view class="tab-container">
				<view class="out" :class="getCurrClass(1)" @click="toTotalOut()">支出</view>
				<view class="in" :class="getCurrClass(2)" @click="toTotalIn()">收入</view>
			</view>
			<view class="total-container">
				<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas>
			</view>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar :list="tabbars" active-color="#03a174" inactive-color="#666666" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
import uCharts from '../../../js_sdk/u-charts/u-charts/u-charts.js';
export default {
	data() {
		return {
			tabbars:'',
			currPage:1,
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			totalOutChartData: {
			  "series": [{
				"name": "一班",
				"data": 80
			  }, {
				"name": "二班",
				"data": 30
			  }, {
				"name": "三班",
				"data": 20
			  }, {
				"name": "四班",
				"data": 18
			  }, {
				"name": "五班",
				"data": 8
			  }]
			},
			totalInChartData: {
			  "series": [{
				"name": "一班",
				"data": 80
			  }, {
				"name": "二班",
				"data": 30
			  }, {
				"name": "三班",
				"data": 20
			  }, {
				"name": "四班",
				"data": 18
			  }, {
				"name": "五班",
				"data": 8
			  }]
			},
			canvaRing:null
		}
	},
	onLoad() {
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
		this.cWidth = uni.upx2px(600);
		this.cHeight = uni.upx2px(450);
		this.getTotalOutData();
	},
	methods: {
		/**Tab 样式切换
		 * @param {Object} num
		 */
		getCurrClass(num){
			if(this.currPage==1 && num == 1){
				return 'out-selected'
			}
			if(this.currPage==2 && num == 2){
				return 'in-selected'
			}
			return ''
		},
		
		toTotalOut(){
			this.currPage = 1
		},
		
		toTotalIn(){
			this.currPage = 2
		},
		
		/**
		 * 从服务器 获取总的支出
		 */
		getTotalOutData() {
			//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
			this.showRing("canvasRing", this.totalOutChartData);
		},
		showRing(canvasId, chartData) {
			this.canvaRing = new uCharts({
				$this: this,
				canvasId: canvasId,
				type: 'ring',
				fontSize: 12,
				legend: true,
				title: {
					name: '639112087.09',
					color: '#333333',
					fontSize: 14*this.pixelRatio ,
					offsetY: 5 ,
				},
				subtitle: {
					name: '总支出',
					color: '#666666',
					fontSize: 14 ,
					offsetY: 10 ,
				},
				extra: {
					pie: {
						offsetAngle: -45,
						ringWidth: 20 ,
						labelWidth: 15
					}
				},
				background: '#FFFFFF',
				pixelRatio: this.pixelRatio,
				series: chartData.series,
				animation: true,
				width: this.cWidth ,
				height: this.cHeight ,
				disablePieStroke: true,
				dataLabel: true,
			});
		},
		touchRing(e) {
			this.canvaRing.showToolTip(e, {
				format: function(item) {
					return item.name + ':' + item.data
				}
			});
		},
	}
}
</script>

<style scoped>
.content{
	display: flex;
	flex-direction: column;
	align-items: center;
}

.tab-container{
	display: flex;
	flex-direction: row;
	align-items: center;
}

/* 该样式必须在selected前面,以便于selected样式覆盖 */
.tab-container .in,.tab-container .out{
	color: #03A174;
}

.tab-container .out-selected,.tab-container .in-selected{
	color: #FFFFFF;
	background-color: #03A174;
}

.tab-container .out,.tab-container .in{
	padding: 4upx 14upx;
	border-radius: 10upx 0 0 10upx;
	border: #03A174 1upx solid;
}

.tab-container .in{
	border-radius: 0 10upx 10upx 0;
}

.total-container{
	margin-top: 40upx;
}

.charts {
	width: 600upx;
	height: 450upx;
	background-color: #FFFFFF;
}
</style>
