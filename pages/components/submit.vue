<template>
	<view class="button" @click="clickEvent">{{text}}</view>
</template>

<script>
	export default{
		name:'submit',
		props:['text'],
		methods:{
			clickEvent(){
				this.$emit("clickEvent")
			}
		}
	}
</script>

<style scoped>
	.button{
		width: 80%;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #03A174;
		color: #FFFFFF;
		margin-top: 60rpx;
		border-radius: 10rpx;
	}
</style>
