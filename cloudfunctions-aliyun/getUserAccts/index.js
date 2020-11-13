'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	let res = await db.collection("user_acct").where({
		username:event.username
	}).get()
	console.log(res,"后端res")
	//返回数据给客户端
	return res
};
