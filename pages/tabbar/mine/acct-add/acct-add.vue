<template>
	<view class="content">
		<view class="header">
			<image class="img" :src="acctArray[acctIndex].imgSrc" mode=""></image>
			<!-- <image class="img" src="@/static/img/mine/acct/招商银行.png" mode=""></image> -->
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
				<view class="label">账户类别</view>
				<picker class="value" @change="bindCategoryChange" :value="categoryIndex" :range="categoryArray" :range-key="'name'">
					<view class="uni-input">{{categoryArray[categoryIndex].name}}</view>
				</picker>
			</view>
			<!-- 借记卡展示余额 -->
			<view class="item" v-if="categoryArray[categoryIndex].value === 'debit'">
				<view class="label">余额</view>
				<input class="value" type="text" v-model="balance" placeholder="0" />
			</view>
			<!-- 信用卡展示总额度、总还款、可用额度 -->
			<view class="item" v-if="categoryArray[categoryIndex].value === 'credit'">
				<view class="label">总额度</view>
				<input class="value" type="text" v-model="totalQuota" placeholder="信用卡总额度" @input="calcAvailableQuota($event,1)"/>
			</view>
			<view class="item" v-if="categoryArray[categoryIndex].value === 'credit'">
				<view class="label">总还款</view>
				<input class="value" type="text" v-model="totalDebt" placeholder="信用卡总欠款" @input="calcAvailableQuota($event,2)" />
			</view>
			<view class="item" v-if="categoryArray[categoryIndex].value === 'credit'">
				<view class="label">可用额度</view>
				<input class="value" type="text" v-model="availableQuota" placeholder="信用卡可用额度" @input="calcAvailableQuota($event,3)"/>
			</view>
			
			<view class="item" style="margin-top: 20rpx;">
				<view class="label">银行卡号</view>
				<input class="value" type="text" v-model="cardNumber" placeholder="请输入银行卡号后四位" maxlength="4"/>
			</view>
			<view class="item">
				<view class="label">备注</view>
				<input class="value" type="text" v-model="note" placeholder="如工资卡/消费卡等"/>
			</view>
		</view>
		<submit text="添加" @clickEvent="submit()"></submit>
	</view>
</template>

<script>
import util from '@/static/js/utils.js'
	import submit from '../../../components/submit.vue'
	export default {
		data() {
			return {
				acctArray:[
					{
						name:"微信",
						imgSrc:require('@/static/img/mine/acct/微信.png'),
						category:'debit'
					},
					{
						name:"支付宝",
						imgSrc:require('@/static/img/mine/acct/支付宝.png'),
						category:'debit'
					},
					{
						name:"招商银行",
						imgSrc:require('@/static/img/mine/acct/招商银行.png'),
						category:'debit'
					}
				],
				acctIndex:0,
				categoryArray:[
					{
						name:"借记卡",
						value:"debit"
					},{
						name:"信用卡",
						value:"credit"
					},
				],
				categoryIndex:0,
				balance:'',//余额
				totalQuota:'',//总额度
				totalDebt:'',//总欠款
				availableQuota:'',//可用额度
				cardNumber:'',//银行卡后四位
				note:'',//银行卡备注
			}
		},
		components:{
			submit
		},
		onShow() {
			
		},
		methods: {
			calcAvailableQuota(e,index){
				//如果是数字
				if(Number(e.detail.value)){
					if(index==2){
						this.availableQuota = (parseFloat(this.totalQuota)-parseFloat(this.totalDebt))
					}else if(index==3){
						this.totalDebt = (parseFloat(this.totalQuota)-parseFloat(this.availableQuota))
					}
				}else{
					console.log("数字")
					//如果不是数字
					if(index == 1){
						let tmp = this.totalQuota.replace(/[^\-?\d.]/g,'')
						//需要这么写 不然输入框数据不更新
						this.$nextTick(() => {
							this.totalQuota = tmp
						})
					}else if(index == 2){
						let tmp = this.totalDebt.replace(/[^\-?\d.]/g,'')
						//需要这么写 不然输入框数据不更新
						this.$nextTick(() => {
							this.totalDebt = tmp
						})
					}else if(index == 3){
						let tmp = this.availableQuota.replace(/[^\-?\d.]/g,'')
						//需要这么写 不然输入框数据不更新
						this.$nextTick(() => {
							this.availableQuota = tmp
						})
					}
				}
				if(!this.totalDebt){
					this.availableQuota = parseFloat(this.totalQuota)
					return
				}
			},
			bindAcctChange(e){
				this.acctIndex = e.target.value
			},
			bindCategoryChange(e){
				this.categoryIndex =e.target.value
			},
			submit(){
				let that = this
				let username = util.getItem("username")
				let data = {}
				//如果选择的是借记卡
				if(this.categoryArray[this.categoryIndex].value === 'debit'){
					data = {
						username:username,
						name:that.acctArray[that.acctIndex].name,
						img_src:that.acctArray[that.acctIndex].imgSrc,
						balance:util.toDecimal(that.balance),
						category:that.acctArray[that.acctIndex].category,
						card_number:that.cardNumber,
						note:that.note
					}
				}else if(this.categoryArray[this.categoryIndex].value === 'credit'){
					data = {
						username:username,
						name:that.acctArray[that.acctIndex].name,
						img_src:that.acctArray[that.acctIndex].imgSrc,
						total_quota:util.toDecimal(that.totalQuota),
						total_debt:util.toDecimal(that.totalDebt),
						available_quota:util.toDecimal(that.availableQuota),
						category:that.categoryArray[that.categoryIndex].value,
						card_number:that.cardNumber,
						note:that.note
					}
				}
				uniCloud.callFunction({
					name:'addUserAcct',
					data:data,
					success(res) {
						console.log(res,"成功")
						if(res.success&&res.result.code === "success"){
							console.log("添加成功")
							uni.redirectTo({
								url:'../acct-manage/acct-manage'
							})
						}
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
	height: 260rpx;
	padding-top: 40rpx;
	background-color: #FFFFFF;
}

.header .img{
	width: 160rpx;
	height: 160rpx;
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
	height: 50rpx;
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
</style>
