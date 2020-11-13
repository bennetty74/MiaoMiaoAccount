'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	delete event._id
	const db = uniCloud.database();
	let res = await db.collection("user").where({
		username:event.username
	}).update(event)
	console.log(res,"范胡思")
	//返回数据给客户端
	return res
};
