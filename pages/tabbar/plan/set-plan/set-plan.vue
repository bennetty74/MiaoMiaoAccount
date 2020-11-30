<template>
	<!-- <view class="content">
		<view class="item">
			<u-field class="field-input" v-model="plan.plan" type="text" label="预算" placeholder="0.00" input-align="right"></u-field>
		</view>
		<view class="item">
			<view class="label">时间</view>
			<picker mode="date" v-model="plan.date" fields="month" @change="bindDateChange">
				<view class="date">{{plan.date}}</view>
			</picker>
		</view>
		<view class="item">
			<view class="label">按月重复</view>
			<switch color="#03A174" :checked="isRepeat" @change="repeatChange()" />
		</view>
		<view class="item" v-if="isRepeat">
			<view class="label">结束时间</view>
			<picker mode="date" v-model="end" fields="month" @change="bindDateChange">
				<view class="date">{{endDate}}</view>
			</picker>
		</view>
		<u-button class="submit" type="success"  @click="submit()">提交</u-button>
	</view> -->
	<view class="content">
		<u-form class="form" :model="plan" ref="uForm">
			<u-form-item label="预算"><u-input v-model="plan.plan" inputAlign="right"/></u-form-item>
			<!-- <u-form-item label="日期"><u-picker mode="time" v-model="showDatePicker" :params="params" @confirm="" :defaultTime="plan.date" @click="showPicker"></u-picker></u-form-item> -->
			<u-form-item label="日期">
				<picker class="picker" mode="date" v-model="plan.date" fields="month" @change="bindDateChange">
					<view class="date">{{plan.date}}</view>
				</picker>
			</u-form-item>
			<u-form-item label="是否重复" label-width="auto"><u-switch v-model="isRepeat" slot="right" active-color="#03A174"></u-switch></u-form-item>
			<u-form-item label="结束日期" label-width="auto" v-if="isRepeat">
				<picker class="picker" mode="date" v-model="endDate" fields="month" @change="bindEndDateChange">
					<view class="date">{{endDate}}</view>
				</picker>
			</u-form-item>
		</u-form>
		<u-button class="submit" type="success"  @click="submit()">提交</u-button>
	</view>
	
	
</template>

<script>
	import submit from '../../../components/submit.vue'
	import util  from '@/static/js/utils.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				plan:{
					plan:0.00,
					date:moment().format("YYYY-MM"),
				},
				showDatePicker:false,
				isRepeat:false,
				endDate:moment().format("YYYY-MM"),
				params:{
					year: true,
					month: true,
				}
			}
		},
		components:{
			submit
		},
		onLoad() {
			this.username = util.getItem("username")
			let that = this
			uniCloud.callFunction({
				name:'getPlan',
				data:{
					username:that.username,
					date:that.plan.date
				},
				success(res) {
					console.log(res.result.data)
					if(res.result.data&&res.result.data.length!=0){
						that.plan = res.result.data[0]
					}
				},
				fail(res) {
					console.log('fail')
				}
			})
		},
		methods: {
			bindEndDateChange(e){
				this.endDate = e.target.value
			},
			bindDateChange(e){
				this.date = e.target.value
			},
			repeatChange(){
				console.log("change")
				this.isRepeat =!this.isRepeat
			},
			submit(){
				console.log("点击提交")
			}
			
		}
	}
</script>

<style scoped>
.content{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}

.content .form{
	width: 90%;
}

.content .item{
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 10rpx 20rpx;
}


.content .item  .switch{
	transform:scale(0.7);
	color: #03A174;
	/* margin-left: 65%; */
	text-align: right;
}

.content picker{
	width: 100%;
	text-align: right;
}

.submit{
	background-color: #03A174;
	width: 80%;
	margin-top: 60rpx;
}
</style>

<style>
/* 样式没生效 */
.uni-picker-container .uni-picker-action .uni-picker-action-confirm{
	color: #03A174;
}
</style>
