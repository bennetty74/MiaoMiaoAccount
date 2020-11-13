<template>
    <view class="content">
        <view class="header" @click="toUserInfoEdit">
            <view class="avatar">
            	<image class="img" :src="userInfo.avatar" mode=""></image>
            </view>
			<view class="info">
				<view class="nickname">{{userInfo.nickname}}</view>
				<view class="desc">{{userInfo.desc}}</view>
			</view>
			<view class="operation">
				<image class="img" src="@/static/img/mine/icon-right.png" mode=""></image>
			</view>
        </view>
		
		<!-- <view class="middle">
			<view class="item">
				<view class="value">5</view>
				<view class="label">目标规划</view>
			</view>
			<view class="item">
				<view class="value">5</view>
				<view class="label">记账天数</view>
			</view>
			<view class="item">
				<view class="value">5</view>
				<view class="label">记账笔数</view>
			</view>
		</view> -->
		<view class="assets">
			<view class="net">
				<view class="label">净资产(元)：</view>
				<view class="value">{{total_net_assets}}</view>
			</view>
			<view class="details-container">
				<view class="item-container">
					<view class="label">负债：</view>
					<view class="debt">-{{total_debt}}</view>
				</view>
				<view class="item-container">
					<view class="label">总资产：</view>
					<view class="total-assets">{{total_assets}}</view>
				</view>
			</view>
		</view>
		
		<!-- 勋章 一期暂不实现 -->
		<!-- <view class="bottom">
			<view class="item center">
				<image class="img" src="@/static/img/add/amount.png" mode=""></image>
			</view>
			<view class="item center">
				<image class="img" src="@/static/img/add/amount.png" mode=""></image>
			</view>
			<view class="item center">
				<image class="img" src="@/static/img/add/amount.png" mode=""></image>
			</view>
			<view class="item center">
				<image class="img" src="@/static/img/add/amount.png" mode=""></image>
			</view>
		</view> -->
		
		
		<view class="menus">
			<view class="item" @click="toAcctManage">
				<view class="left">
					<view class="icon center"><image class="img" src="@/static/img/add/amount.png" mode=""></image></view>
					<view class="name">账户管理</view>
				</view>
				
				<view class="right center"><image class="img" src="@/static/img/mine/icon-right.png" mode=""></image></view>
			</view>
			<view class="line"></view><!-- item间分割线 -->
			<view class="item">
				<view class="left">
					<view class="icon center"><image class="img" src="@/static/img/add/amount.png" mode=""></image></view>
					<view class="name">关于我们</view>
				</view>
				<view class="right center"><image class="img" src="@/static/img/mine/icon-right.png" mode=""></image></view>
			</view>
			<view class="line"></view><!-- item间分割线 -->
		</view>
		
		<view class="footer">
			<button class="logout-btn" type="error" @click="logout">退出登录</button>
		</view>
		
    </view>
</template>

<script>
import util  from '@/static/js/utils.js'
export default{
	data(){
		return{
			total_net_assets:'0.00',//净资产
			total_debt:'0.00',//总负债
			total_assets:'0.00',//总资产
			accounts:[],//账户列表
			userInfo:{}//用户信息
		}
	},
	onLoad() {
		this.getUserInfo()
		this.getUserAccountsAndAeests()
	},
	
	methods:{
		toAcctManage(){
			uni.navigateTo({
				url:'acct-manage/acct-manage'
			})
		},
		toUserInfoEdit(){
			uni.navigateTo({
				url:'userInfoEdit/userInfoEdit?userInfo='+encodeURIComponent(JSON.stringify(this.userInfo))
			})
		},
		async getUserAccountsAndAeests(){
			let that = this;
			let username = util.getItem("username")
			console.log(username,"取出来的数据")
			uniCloud.callFunction({
				name:'getUserAccts',
				data:{
					username:username,
				},
				success(res) {
					console.log(res.result.data[0],'数据')
					that.accounts = res.result.data[0].accounts
					that.total_net_assets = res.result.data[0].total_net_assets
					that.total_debt = res.result.data[0].total_debt
					that.total_assets = res.result.data[0].total_assets
				},
				fail(res) {
					console.log('fail')
				}
			})
		},
		async getUserInfo(){
			let that = this;
			let username = util.getItem("username")
			console.log(username,"取出来的数据")
			uniCloud.callFunction({
				name:'getUserInfo',
				data:{
					username:username,
				},
				success(res) {
					console.log(res.result,"获取user info")
					that.userInfo = res.result.data[0]
				},
				fail(res) {
					console.log('fail',res)
				}
			})
		},
		logout(){
			//清空存储的用户
			uni.removeStorage({
				key:"username",
				success:function(res){
					console.log(res,"清除storage成功")
				}
			})
			//跳转到登录页面
			uni.redirectTo({
				url:"../../sign-in/sign-in",
				animationType: 'pop-in',
				animationDuration: 200
			})
		}
	}
}



</script>


<style>

.center{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.content{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding-top: 100upx;
}

.header{
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 90%;
	padding: 60upx 0 60upx 0;
}

.header .avatar,.header .avatar .img{
	width: 100upx;
	height: 100upx;
}

.header .avatar .img{
	border-radius: 50upx;
}

.header .info{
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 60%;
	height: 100upx;
	margin: 0 0 0 40upx;
	color: #333333;
}

.header .info .nickname{
	color: #333333;
	font-size: 28upx;
	font-weight: bold;
}

.header .info .desc{
	font-size: 24upx;
	color: #666666;
	
}

.header .operation{
	width: 20%;
	height: 100upx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	padding: 0 20upx 0 0;
}
.header .operation .img{
	height: 32upx;
	width: 32upx;
	display: flex;
	flex-direction: row;
}

.middle{
	width: 76%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 30upx 40upx;
	box-shadow: 0 0 5upx #cccccc;
	border-radius: 12upx;
	margin-top: 40upx;
}

.middle .item{
	text-align: center;
	font-size: 28upx;
	
}

.assets{
	display: flex;
	flex-direction: column;
	width: 80%;
	padding: 30rpx 40rpx;
	box-shadow: 0 0 5upx #cccccc;
}

.assets .net{
	font-size: 40upx;
	color: #333333;
	display: flex;
	flex-direction: row;
}

.assets .net .value{
	color: #03A174;
}

.assets .details-container{
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 20rpx;
	font-size: 32rpx;
}

.assets .details-container .item-container{
	display: flex;
	flex-direction: row;
	width: 50%;
}
.assets .details-container .item-container .debt{
	color: #DD524D;
}

.assets .details-container .item-container .total-assets{
	color: #03A174;
}


/* .bottom{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 90%;
	padding: 30upx 0 30upx 0;
}

.bottom .item{
	width: 20%;
	height: 80upx;
}

.bottom .item .img{
	width: 80upx;
	height: 80upx;
} */

.menus{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-top: 60upx;
}

.menus .item{
	display: flex;
	flex-direction: row;
	width: 90%;
	padding: 32upx 0;
}

.menus .item .left{
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 80%;
}

.menus .item .name{
	margin-left: 20upx ;
	color: #333333;
}

.menus .item .right{
	margin-left: 60upx;
}


.menus .item .icon .img{
	width: 40upx;
	height: 40upx;
}

.menus .item .right .img{
	width: 30upx;
	height: 30upx;
}

.menus .line{
	width: 88%;
	height: 1upx;
	background-color: #CCCCCC;
	opacity: 0.3;
	box-shadow: 0 0 2upx #CCCCCC;
	margin: 0 0 0 12%;
}

.footer{
	width: 80%;
	height: 60upx;
	padding: 80upx 0;
}

.footer .logout-btn{
	background-color: #03A174;
	color: #FFFFFF;
}


</style>