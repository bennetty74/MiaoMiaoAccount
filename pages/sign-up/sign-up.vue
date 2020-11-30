<template>
	<view class="content">
		<view class="header">
			<view class="title">欢迎来到喵喵记账</view>
			<view class="desc">欢迎程序员伙伴一起创造</view>
		</view>
		<view class="body">
			<view class="account">
				<u-field v-model="username" type="text" label="用户名" required placeholder="请输入用户名"></u-field>
			</view>
			<view class="password">
				<u-field v-model="password" type="text" :password="true" label="密码" required placeholder="请输入密码"></u-field>
			</view>
			<view class="password">
				<u-field v-model="repeatPassword" type="text" :password="true" label="重复密码" required placeholder="请输入再次输入密码"></u-field>
			</view>
		</view>
		<u-button class="submit" type="success"  @click="signUp()">注册</u-button>
		<view class="sign-in" @click="toSignIn">已有账户？点击登录</view>
		
		<u-toast ref="uToast"></u-toast>
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
				if(!this.repeatPassword){
					this.$refs.uToast.show({
						title: '请再次输入密码',
						type: 'warning',
					})
					return
				}
				if(this.password!=this.repeatPassword){
					this.$refs.uToast.show({
						title: '密码输入不一致',
						type: 'warning',
					})
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
						that.$refs.uToast.show({
							title: '注册成功',
							type: 'success',
							url:'/pages/sign-in/sign-in'
						})
					},
					fail(res) {
						that.$refs.uToast.show({
							title: res.result,
							type: 'error',
						})
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

.submit{
	margin-top: 40rpx;
	width: 80%;
	background-color: #03A174;
}

</style>
