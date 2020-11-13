<template>
	<view class="content">

		<view class="header">
			<image :src="getUserAvatar()"></image>
			<view class="btn" @click="updateAvatar">点击更换</view>
		</view>

		<view class="middle">
			<view class="item">
				<view class="left">用户名</view>
				<input class="right" v-model="userInfo.username"></input>
			</view>
			<view class="item">
				<view class="left">昵称</view>
				<input class="right" v-model="userInfo.nickname" placeholder="你还没有昵称哦~"></input>
			</view>
			<view class="item">
				<view class="left">性别</view>
				<picker @change="bindMaleChange" :value="maleIndex" :range="males">
					<view class="right">{{males[maleIndex]}}</view>
				</picker>
			</view>
			<view class="item">
				<view class="left">生日</view>
				<picker class="right" @change="bindDateChange" :value="userInfo.birthday" mode="date">
					<view>{{birthday}}</view>
				</picker>
			</view>
			<view class="item">
				<view class="left">自我介绍</view>
				<input class="right" v-model="userInfo.desc" placeholder="你还有没有自我介绍哦~"></input>
			</view>
			<view class="button" @click="updateUserInfo">修改</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		data() {
			const currentDate = moment().format("YYYY-MM-DD")
			return {
				userInfo: {},
				males:["请选择","男","女"],
				maleIndex:0,
				startDate:"1900-01-01",
				endDate:"2100-12-31",
				birthday:currentDate
			}
		},
		onLoad(option) {
			console.log(option.userInfo,"解析前")
			this.userInfo = JSON.parse(decodeURIComponent(option.userInfo))
			console.log(this.userInfo, "--------")
		},
		methods: {
			bindMaleChange(e){
				this.maleIndex = e.target.value
				this.userInfo.male = this.males[this.maleIndex]
			},
			bindDateChange(e){
				this.birthday = e.target.value
			},
			getUserAvatar(){
				console.log("头像地址",this.userInfo.avatar?this.userInfo.avatar:'/static/img/mine/avatar-boy.png')
				return this.userInfo.avatar?this.userInfo.avatar:'/static/img/mine/avatar-boy.png';
			},
			
			updateUserInfo(){
				let that = this
				uniCloud.callFunction({
					name:'updateUserInfo',
					data:that.userInfo,
					success(res) {
						console.log('成功',res.result.data[0])
					},
					fail(res) {
						console.log('失败',res)
					}
				})
			},
			updateAvatar() {
				let that = this
				uni.chooseImage({
					count: 1,
					success(res) {
						console.log(res);
						if (res.tempFilePaths.length > 0) {
							let filePath = res.tempFilePaths[0]
							//进行上传操作
							// callback方式，与promise方式二选一即可
							uniCloud.uploadFile({
								filePath: filePath,
								cloudPath: 'a.jpg',
								onUploadProgress: function(progressEvent) {
									var percentCompleted = Math.round(
										(progressEvent.loaded * 100) / progressEvent.total
									);
								},
								success(res) {
									console.log("获取到的文件路径",res)
									that.userInfo.avatar = res.fileID
									that.updateUserInfo()
								},
								fail() {},
								complete() {}
							});

						}
					}
				});
				console.log(this.userInfo)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		background-color: #F8F8F8;
		width: 100%;
		height: 100%;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 320rpx;
		background-color: #FFFFFF;
		margin-bottom: 40rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 100rpx;
	}
	
	.header .btn{
		width: 182rpx;
		height: 65rpx;
		font-size: 24rpx;
		background-color: #F4F4F4;
		/* background-color: #007AFF; */
		opacity: 0.4;
		position: relative;
		color: #333333;
		top: -60rpx;
		border-radius: 0 0 70rpx 70rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.middle {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 80%;
	}

	.middle .item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 20rpx 0;
		margin-top: 1rpx;
		background-color: #FFFFFF;
	}

	.middle .item image {
		width: 50rpx;
		height: 50rpx;
	}

	.middle .item .left {
		margin-left: 20rpx;
	}

	.middle .item .right {
		margin-right: 20rpx;
		text-align: right;
	}

	.button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #03A174;
		color: #FFFFFF;
		width: 80%;
		height: 80rpx;
		margin-top: 40rpx;
		border-radius: 10rpx;
	}
</style>
