<template>
	<view class="content">
		<view class="header">
			<view class="title">欢迎来到喵喵记账</view>
			<view class="desc">欢迎程序员伙伴一起创造</view>
		</view>
		<view class="body">
			<view class="account">
				<view class="label">用户名</view>
				<input class="value" type="text" v-model="username" placeholder="请输入用户名"/>
			</view>
			<view class="password">
				<!-- <view class="label">密码</view> -->
				<input class="value" type="password" v-model="password" placeholder="请输入密码"/>
			</view>
		</view>
		<view class="submit" @click="signIn">登录</view>
		<view class="sign-up" @click="toSignUp">还没有账户？点击注册</view>
	</view>
</template>

<script>
import util  from '../../static/js/utils.js'
	export default {
		data() {
			return {
				username:'',
				password:''
			}
		},
		mounted() {
			
		},
		methods: {
			toSignUp(){
				uni.redirectTo({
					url:'../sign-up/sign-up',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			signIn(){
				if(!this.username){
					console.log("用户名不能为空")
					return
				}
				if(!this.password){
					console.log("密码不能为空")
					return
				}
				
				let that = this
				uniCloud.callFunction({
					name:'signIn',
					data:{
						username:that.username,
						password:that.password
					},
					success(res) {
						console.log(res.result)
						if(res.result.code === 'success'){
							util.setItem("username",that.username)
							uni.switchTab({
								url:"../tabbar/index/home",
								animationType: 'pop-in',
								animationDuration: 200,
							})
						}
					},
					fail(res) {
						console.log(res.result.msg)
					}
				})
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
	margin-top: 20%;
}
.header{
	/* margin: 60rpx 0 0 40rpx; */
	/* padding: 60rpx 0 0 40rpx; */
	width: 80%;
}
.header .title{
	font-size: 48rpx;
}
.header .desc{
	font-size: 28rpx;
	margin-top: 10rpx;
	color: #ACACAC;
}

.body{
	width: 80%;
	margin-top: 20%;
	/* padding: 60rpx 0 0 40rpx; */
}

.body .password{
	margin-top: 60rpx;
}

.body .label{
	color: #ACACAC;
	font-size: 24rpx;
	margin-top: 20rpx;
}
.body .value{
	font-size: 24rpx;
	height: 56rpx;
	padding-top: 10rpx;
	border-bottom: #CCCCCC solid 1rpx;
	width: 100%;
}


.submit{
	width: 80%;
	background-color: #03A174;
	border-radius: 10rpx;
	height: 60rpx;
	color: #FFFFFF;
	text-align: center;
	margin-top: 60rpx;
	padding-top: 10rpx;
}

.sign-up{
	width: 80%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	margin-top: 20rpx;
	font-size: 24rpx;
	color: #03A174;
}

</style>
