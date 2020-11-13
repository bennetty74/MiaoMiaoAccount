'use strict';
const {encryPassword} = require('encry-utils')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const crypto = require('crypto')
	const db = uniCloud.database()
	let res = await db.collection("user").where({
		"username":event.username
	}).get()
	//如果未查到，说明该用户名没有注册
	if(res.data.length==0){
		console.log("没有找到",event.username)
		let res = await db.collection("user").add({
			username:event.username,
			password:encryPassword(event.password),
			status: 0,
			nickname:"点击设置您的昵称",
			desc:"点击设置您的个人简介",
			avatar:"/static/img/mine/avatar-boy.png",
			male:""
		})
		console.log(res,"插入数据的反馈")
		return {code:"success",msg:"注册成功"}
	}else{
		return {code:"fail",msg:"用户名已被注册"}
	}
	return {code:"fail",msg:"其他原因错误"}
};
