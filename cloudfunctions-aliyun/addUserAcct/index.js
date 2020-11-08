'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	let res = await db.collection("user_acct").where({
		username:event.username
	}).get()
	//如果之前没有账户 新建账户
	if(res.data.length==0){
		if(event.category==='debit'){
			let addRes = await db.collection("user_acct").add({
				username:event.username,
				total_net_assets:event.balance,
				total_assets:event.balance,
				total_debt:0,
				accounts:[
					{
						name:event.name,
						category:event.category,
						balance:event.balance,
						note:event.note
					}
				]
			})
			if(addRes){
				return {code:"success",msg:"添加成功"}
			}
			return {code:"fail",msg:"添加s失败"}
		}
	}else{
		let id = res.data[0]._id
		delete res.data[0]._id
		if(event.category==='debit'){
			res.data[0].accounts.push({
				name:event.name,
				category:event.category,
				balance:event.balance,
				note:event.note
			})
			console.log(res.data[0],"修改后书局 ")
			let updateRes = await db.collection("user_acct").where({
				id:id
			}).update(res.data[0])
			console.log(updateRes,"修改响应")
		}else{
			console.log("账户不为储蓄卡")
		}
		
	}
	//返回数据给客户端
	return res
};
