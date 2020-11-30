<template>
	<view class="content">
		<view class="header">
			<view class="title">欢迎来到喵喵记账</view>
			<view class="desc">欢迎程序员伙伴一起创造</view>
		</view>
		<view class="body">
			<view class="account">
				<!-- <view class="label">用户名</view> -->
				<!-- <input class="value" type="text" v-model="username" placeholder="请输入用户名"/> -->
				<u-field v-model="username" type="text" label="用户名" placeholder="请输入用户名"></u-field>
			</view>
			<view class="password">
				<!-- <view class="label">密码</view> -->
				<!-- <input class="value" type="text" v-model="password" placeholder="请输入密码"/> -->
				<u-field v-model="password" type="text" :password="true" label="密码" placeholder="请输入密码"></u-field>
				
			</view>
		</view>
		<u-button type="success" class="submit" :ripple="true" size="default" @click="signIn()">登录</u-button>
		<view class="sign-up" @click="toSignUp">还没有账户？点击注册</view>
	
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import util  from '../../static/js/utils.js' 
import submit from '../components/submit.vue'
	export default {
		data() {
			return {
				username:'',
				password:''
			}
		},
		components:{
			submit
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
					this.$refs.uToast.show({
						title: '用户名不能为空',
						type: 'warning',
					})
					return
				}
				if(!this.password){
					this.$refs.uToast.show({
						title: '密码不能为空',
						type: 'warning',
					})
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
							console.log(that.$refs)
							that.$refs.uToast.show({
								title: '登录成功',
								type: 'success',
								isTab:true,
								url:'/pages/tabbar/index/home'
							})
						}else{
							console.log(res,"消息")
							that.$refs.uToast.show({
								title: res.result.msg,
								type: 'error',
							})
						}
					},
					fail(res) {
						that.$refs.uToast.show({
							title: res,
							type: 'error',
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.content{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-top: 20%;
}
.header{
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

.sign-up{
	width: 80%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	margin-top: 20rpx;
	font-size: 24rpx;
	color: #03A174;
}

.submit{
	width: 80%;
	margin-top: 40rpx;
	background-color: #03A174;
}

</style>
