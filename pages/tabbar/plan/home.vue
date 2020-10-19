<template>
	<view class="content">
		<view class="chart-container">
			<canvas canvas-id="canvasGauge" id="canvasGauge" class="charts"></canvas>
		</view>
		<view class="rate-container">
			<view class="title">
				消费金额Top5
			</view>
			<view class="rate">
				<view class="item" v-for="(item,index) in top5RateList">
					<view class="index">{{index+1}}</view>
					<view class="process">
						<view class="left"></view>
						<view class="right"></view>
					</view>
					<view class="label">{{item.label}}({{item.note}})</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uCharts from '../../../js_sdk/u-charts/u-charts/u-charts.js';
var _self;
var canvaGauge=null;

export default {
	data() {
		return {
			cWidth:'',
			cHeight:'',
			pixelRatio:1,
			gaugeWidth:15,
			charData: {
				categories: [{ value : 0.2, color: '#2fc25b'}, { value : 0.8,color: '#1890ff'},{ value : 1, color: '#f04864'}],
				series: [{name: '完成率',data: 0.85}]
			},
			top5RateList:[
				{label:'服饰',amount:1098.12,note:'妮子大衣'},
				{label:'数码产品',amount:987.23,note:'相机'},
				{label:'猫粮',amount:346.98,note:'冠能1.7kg'},
				{label:'吃喝',amount:346.98,note:'小龙坎'},
				{label:'水果',amount:346.98,note:'苹果'}
			]
		}
	},
	onLoad() {
		_self = this;
		this.cWidth=uni.upx2px(600);
		this.cHeight=uni.upx2px(400);
		_self.showGauge("canvasGauge",this.charData)
	},
	methods: {
		showGauge(canvasId,chartData){
			canvaGauge = new uCharts({
				$this:_self,
				canvasId: canvasId,
				type: 'gauge',
				fontSize:10,
				legend:false,
				title: {
					name: Math.round(chartData.series[0].data*100)+'%',
					color: chartData.categories[1].color,
					fontSize: 14,
					offsetY:60,//新增参数，自定义调整Y轴文案距离
				},
				subtitle: {
					name: chartData.series[0].name,
					color: '#666666',
					fontSize: 16,
					offsetY:-30,//新增参数，自定义调整Y轴文案距离
				},
				extra: {
					gauge:{
						type:'default',
						width: _self.gaugeWidth*_self.pixelRatio,//仪表盘背景的宽度
						startAngle:0.75,
						endAngle:0.25,
						startNumber:0,
						endNumber:100,
						splitLine:{
							fixRadius:0,
							splitNumber:10,
							width: _self.gaugeWidth*_self.pixelRatio,//仪表盘背景的宽度
							color:'#FFFFFF',
							childNumber:5,
							childWidth:_self.gaugeWidth*0.4*_self.pixelRatio,//仪表盘背景的宽度
						},
						pointer:{
							width: _self.gaugeWidth*0.8*_self.pixelRatio,//指针宽度
							color:'auto'
						}
					}
				},
				background:'#FFFFFF',
				pixelRatio:_self.pixelRatio,
				categories: chartData.categories,
				series: chartData.series,
				animation: true,
				width: _self.cWidth*_self.pixelRatio,
				height: _self.cHeight*_self.pixelRatio,
				dataLabel: true,
			});
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
}

.chart-container{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	background-color: #FFFFFF;
}

/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
.charts {
	width: 600upx;
	height: 400upx;
	background-color: #FFFFFF;
}

.rate-container{
	margin-top: 40upx;
	width: 100%;
	background-color: #FFFFFF;
}

.rate-container .title{
	text-align: center;
	margin-top: 20upx;
	font-weight: bold;
	color: #333333;
}

.rate-container .rate{
	margin-top: 30upx;
}

.rate-container .rate .item{
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 20upx 0 20upx 10upx;
}
.rate .item .index{
	width: 5%;
}

.rate .item .process{
	margin-left: 20upx;
	width: 50%;
	height: 10upx;
	background-color: #CCCCCC;
	border-radius: 4upx;
}
.process .left{
	width: 60%;
	height: 10upx;
	background-color: #03A174;
	border-radius: 4upx;
}

.rate .item .label{
	width: 40%;
	margin-left: 40upx;
}

</style>
