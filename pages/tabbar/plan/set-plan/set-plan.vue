<template>
	<view class="content">
		<view class="item">
			<view class="label">预算</view>
			<input class="plan" type="number" focus placeholder="0.00" v-model="plan.plan"/>
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
		<submit text="提交" @clickEvent="submit()"></submit>
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
				isRepeat:false,
				endDate:moment().format("YYYY-MM")
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
.content .item{
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 10rpx 20rpx;
}

.content .item .label{
	padding-left: 20rpx;
	width: 22%;
}
.content .item .plan{
	width: 78%;
	text-align: right;
	padding-right: 30rpx;
}
.content .item switch{
	transform:scale(0.7);
	color: #03A174;
	margin-left: 65%;
}

.content .item picker{
	width: 78%;
}
.content .date{
	text-align: right;
	padding-right: 20rpx;
}
</style>
