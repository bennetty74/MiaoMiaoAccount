'use strict';
const {encryPassword} = require('encry-utils')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	let res = await db.collection("user").where({
		"username":event.username
	}).get()
	//如果未查到
	if(res.data.length==0){
		console.log("未查到数据")
		return {code:"fail",msg:"用户不存在"}
	}else{
		console.log("查到数据",res.data)
		if(encryPassword(event.password) === res.data[0].password){
			return {code:"success",msg:"登录成功"}
		}else{
			return {code:"fail",msg:"密码错误"}
		}
	}
	return {code:"fail",msg:"其他原因错误"}
};
