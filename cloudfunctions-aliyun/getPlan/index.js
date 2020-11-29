'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database();
	let res = db.collection("user_plan").where({
		username:event.username,
		date:event.date
	}).get()
	//返回数据给客户端
	return res;
};
