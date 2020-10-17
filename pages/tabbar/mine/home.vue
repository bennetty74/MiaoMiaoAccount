<template>
    <view class="content">
        <view class="header">
            <view class="avatar">
            	<image class="img" src="../../../static/img/mine/avatar.jpg" mode=""></image>
            </view>
			<view class="info">
				<view class="nickname">爱学习的小皮喵</view>
				<view class="desc">这个人很懒，什么也没留下~</view>
			</view>
			<view class="operation">
				<image class="img" src="../../../static/img/mine/icon-right.png" mode=""></image>
			</view>
        </view>
		
		<view class="middle">
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
		</view>
		
		<!-- 勋章 一期暂不实现 -->
		<!-- <view class="bottom">
			<view class="item center">
				<image class="img" src="../../../static/img/add/amount.png" mode=""></image>
			</view>
			<view class="item center">
				<image class="img" src="../../../static/img/add/amount.png" mode=""></image>
			</view>
			<view class="item center">
				<image class="img" src="../../../static/img/add/amount.png" mode=""></image>
			</view>
			<view class="item center">
				<image class="img" src="../../../static/img/add/amount.png" mode=""></image>
			</view>
		</view> -->
		
		
		<view class="menus">
			<view class="item">
				<view class="left">
					<view class="icon center"><image class="img" src="../../../static/img/add/amount.png" mode=""></image></view>
					<view class="name">账户管理</view>
				</view>
				
				<view class="right center"><image class="img" src="../../../static/img/mine/icon-right.png" mode=""></image></view>
			</view>
			<view class="line"></view><!-- item间分割线 -->
			<view class="item">
				<view class="left">
					<view class="icon center"><image class="img" src="../../../static/img/add/amount.png" mode=""></image></view>
					<view class="name">关于我们</view>
				</view>
				<view class="right center"><image class="img" src="../../../static/img/mine/icon-right.png" mode=""></image></view>
			</view>
			<view class="line"></view><!-- item间分割线 -->
		</view>
		
		<view class="footer">
			<button class="logout-btn" type="error">退出登录</button>
		</view>
		
    </view>
</template>
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