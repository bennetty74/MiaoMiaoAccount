<template>
	<view class="content">
		<view class="category">
			<view class="item">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="name">购物</view>
			</view>
			<view class="item">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="name">购物</view>
			</view>
			<view class="item">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="name">购物</view>
			</view>
			<view class="item">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="name">购物</view>
			</view>
			<view class="item">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="name">购物</view>
			</view>
			<view class="item">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="name">购物</view>
			</view>
			<view class="item">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="name">购物</view>
			</view>
			<view class="item">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="name">购物</view>
			</view>
			<view class="item">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="name">购物</view>
			</view>
			<view class="item">
				<image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image>
				<view class="name">购物</view>
			</view>
		</view>
		
		<view class="account">
			<view class="label">
				账户
			</view>
			<view class="value">
				<!-- <image class="icon" src="../../../static/img/tabbar/add.png" mode=""></image> -->
				<view class="text">
					<!-- 微信零钱 -->
					<picker @change="bindAccountChange" :value="index" :range="accounts">
						<view class="uni-input">{{accounts[index]}}</view>
					</picker>
				</view>
			</view>
		</view>
		
		<view class="keybord">
			<view class="keybord-top">
				<view class="note">
					<image class="icon" src="../../../static/img/qa.png" mode=""></image>
					<text class="text">金额：</text>
				</view>
				<view class="amount">
					{{amount}}
				</view>
			</view>
			<view class="keybord-content">
				<view class="item number" data-num="7"  @click="getValue($event)">7</view>
				<view class="item number" data-num="8"  @click="getValue($event)">8</view>
				<view class="item number" data-num="9"  @click="getValue($event)">9</view>
				<view class="item number" @click="backspace()"><image src="../../../static/img/add/backspace.png" class="icon"></image></view>
				
				<view class="item number" data-num="4"  @click="getValue($event)">4</view>
				<view class="item number" data-num="5"  @click="getValue($event)">5</view>
				<view class="item number" data-num="6"  @click="getValue($event)">6</view>
				<view class="item number" data-num="+"  @click="getValue($event)">+</view>
				
				<view class="item number" data-num="1"  @click="getValue($event)">1</view>
				<view class="item number" data-num="2"  @click="getValue($event)">2</view>
				<view class="item number" data-num="3"  @click="getValue($event)">3</view>
				<view class="item number" data-num="-"  @click="getValue($event)">-</view>
				
				<view class="item number" data-num="."  @click="getValue($event)">.</view>
				<view class="item number" data-num="0"  @click="getValue($event)">0</view>
				<view class="item number" data-num="="  @click="getEquals()">=</view>
				<view class="item complete" @click="submit()">完成</view>
			</view>
		</view>
		
		
	
	</view>
</template> 

<script>
export default {
	data() {
		return {
			amount:'0.00',
			note:'',
			accounts:['微信零钱','支付宝余额','支付宝余额宝','微信零钱通'],
			index:0
		};
	},
	
	methods: {
		bindAccountChange(e){
			this.index = e.target.value
			console.log(this.account)
		},
		submit(){
			if(this.amount.indexOf('-')!=-1||this.amount.indexOf('+')!=-1){
				this.getEquals()
			}
			console.log(this.amount)
			
			//将amount设置为默认值0.00
			// this.amount = '0.00'
		},
		/**
		 * 获取键盘值
		 * @param {Object} event
		 */
		getValue(event){
			let value = event.currentTarget.dataset.num.toString()
			if(this.amount==='0.00'){
				this.amount = value
				return
			}
			console.log(this.amount,value)
			this.amount = this.amount+value
		},
		/**
		 * backspace
		 */
		backspace(){
			//如果是0.00  不执行
			if(this.amount==='0.00'){
				return
			}
			//删除末尾字符
			this.amount = this.amount.substr(0,this.amount.length-1)
			//如果字符为空，展示位默认的0.00
			if(this.amount===''){
				this.amount='0.00'
			}
		},
		getEquals(){
			let num1=''
			let num2=''
			let operator='+'
			let isFirstOprator=true
			// debugger
			for(let char of this.amount){
				if(char==='+'||char==='-'){
					if(isFirstOprator){
						isFirstOprator=false
					}else{
						if(operator==='+'){
							num1=(parseFloat(num1)+parseFloat(num2)).toString()
						}else{
							num1=(parseFloat(num1)-parseFloat(num2)).toString()
						}
						num2=''
					}
					operator=char
				}else{
					if(isFirstOprator){
						num1=num1+char
					}else{
						num2=num2+char
					}
				}
				
			}
			if(operator==='+'){
				this.amount=(parseFloat(num1)+parseFloat(num2)).toString()
			}else{
				this.amount=(parseFloat(num1)-parseFloat(num2)).toString()
			}
			console.log(this.amount)
		}
	}
};
</script>

<style scoped>

.content{
	display: flex;
	flex-direction: column;
	align-items: center;
}
.category{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	width: 100%;
}

.category .item{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 20%;
	padding: 20upx 0 20upx 0;
}

.category .item .icon,.account .value .icon{
	height: 45upx;
	width: 45upx;
}

.account{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin: 50upx 0 0 0;
	/* padding: 0 0 0 45upx; */
	width: 88%;
}

.account .value{
	display: flex;
	flex-direction: row;
	align-items: center;
	/* margin: 0 0 0 50%; */
}

.account .value .text{
	margin: 0 0 0 15upx;
}

.money{
	width: 88%;
	height: 50upx;
	text-align: end;
	margin: 50upx 0 0 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.money .input{
	padding: 0 0 0 20upx ;
	width: 150upx;
	font-size: 36upx;
}

.keybord{
	width: 100%;
	height: 40%;
	display: flex;
	flex-direction: column;
	position: fixed;
	bottom: 0upx;
}

.keybord-top{
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
}

.keybord-top .note{
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 30%;
	padding: 0 0 0 20upx;
}

.keybord-top .note .icon{
	height: 40upx;
	width: 40upx;
}

.keybord-top .note .text{
	margin: 0 0 0 16upx;
}

.keybord-top .amount{
	width: 70%;
	text-align: right;
	margin: 0 10upx 0 0;
}

.keybord-content{
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	flex-wrap: wrap;
	width: 100%;
	height: 85%;
	margin: 15upx 0 0 0;
}

.keybord-content .icon{
	height: 50upx;
	width: 50upx;
}

.keybord-content .item{
	height: 24.8%;
	background-color: #f0f2f1;
	border: #ececec 1upx solid;
	text-align: center;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 1upx 0 0 0;
	flex: 1;
	width: 24.5%;
	min-width: 24.5%; // 加入这两个后每个item的宽度就生效了
	max-width: 24.5%; // 加入这两个后每个item的宽度就生效了
}

.keybord-content .complete{
	background-color: #03a174;
	color: #FFFFFF;
}

</style>
