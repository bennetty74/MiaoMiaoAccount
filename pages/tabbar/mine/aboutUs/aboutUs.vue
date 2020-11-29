<template>
	<view class="container">
		<view class="content">
			<view class="desc">
				96年青年，前端小白。
			</view>
			<view class="">
				目前在浦发银行从事开发工作。
			</view>
			<view class="">
				写这个软件也是基于自己的需求，希望记账软件简洁不太附庸。
			</view>

			<view class="">
				如果有意一起从事开发或设计工作,欢迎加我微信一起交流和学习。
			</view>
			<view class="">
				我会一直维护更新下去的，加油！
			</view>
			<view class="img">
				<image src="../../../../static/img/mine/wechat.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		margin-top: 40rpx;
		position: absolute;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.desc {
		width: 100%;
		font-weight: bold;
		font-size: 28rpx;
	}
	.content view{
		width: 94%;
		margin: 10rpx 0 10rpx 0;
		padding: 0 20rpx 0 20rpx;
		font-size: 28rpx;
		color: #333333;
	}
	.content .img{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 20rpx;
	}
	.content .img image{
		width: 320rpx;
		height: 320rpx;
	}
</style>
