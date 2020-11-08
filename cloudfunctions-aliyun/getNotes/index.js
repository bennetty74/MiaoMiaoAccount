'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database();
	let res = await db.collection("user_note").where({
		"category":event.category
	}).get()
	//查到了数据
	console.log(res,"返回数据")
	if(res.data.length!=0){
		return {code:'success',msg:'查询成功',data:res.data[0]}
	}
	//返回数据给客户端
	return {code:'fail',msg:'查询失败'}
};
