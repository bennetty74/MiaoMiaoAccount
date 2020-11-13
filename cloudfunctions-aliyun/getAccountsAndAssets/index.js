'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	let res = db.collection('user_acct').where({
		username:event.username,
	}).get()
	//返回查询结果
	return res
};
