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
			<view class="password">
				<!-- <view class="label">密码</view> -->
				<input class="value" type="password" v-model="repeatPassword" placeholder="请确认输入密码"/>
			</view>
		</view>
		<submit text="注册" @clickEvent="signUp"></submit>
		<view class="sign-in" @click="toSignIn">已有账户？点击登录</view>
	</view>
</template>

<script>
	import submit from '../components/submit.vue'
	export default {
		data() {
			return {
				username:'',
				password:'',
				repeatPassword:''
			}
		},
		components:{
			submit
		},
		methods: {
			toSignIn(){
				uni.redirectTo({
					url:'../sign-in/sign-in'
				})
			},
			signUp(){
				if(!this.username){
					console.log("用户名不能为空")
					return
				}
				if(!this.password){
					console.log("密码不能为空")
					return
				}
				if(!this.repeatPassword){
					console.log("请再次输入密码")
					return
				}
				if(this.password!=this.repeatPassword){
					console.log("两次密码输入不一致，请重新输入")
					return
				}
				
				let that = this
				console.log(that.username,that.password,'注册信息')
				uniCloud.callFunction({
					name:'signUp',
					data:{
						username:that.username,
						password:that.password
					},
					success(res) {
						console.log(res.result)
						uni.showToast({
							title:"注册成功",
							duration:1000
						})
						if(res.result.code === 'success'){
							uni.redirectTo({
								url:'../sign-in/sign-in'
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

.sign-in{
	width: 80%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	margin-top: 20rpx;
	font-size: 24rpx;
	color: #03A174;
}

</style>
