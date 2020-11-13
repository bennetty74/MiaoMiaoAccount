'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	let res = await db.collection("user_acct").where({
		username: event.username
	}).get()
	//如果之前没有账户 新建账户
	if (res.data.length == 0) {
		console.log("没有数据")
		if (event.category === 'debit') {
			console.log("借记卡")
			let addRes = await db.collection("user_acct").add({
				username: event.username,
				total_net_assets: event.balance,
				total_assets: event.balance,
				total_debt: '0.00',
				accounts: [{
					name: event.name,
					img_src: event.img_src,
					category: event.category,
					balance: event.balance,
					card_number: event.card_number,
					note: event.note
				}]
			})
			if (addRes) {
				return {
					code: "success",
					msg: "添加成功"
				}
			}
			return {
				code: "fail",
				msg: "添加s失败"
			}
		} else if (event.category === 'credit') {
			console.log("信用卡")
			let addRes = await db.collection("user_acct").add({
				username: event.username,
				total_net_assets: '0.00',
				total_assets: event.total_debt,
				total_debt: event.total_debt,
				accounts: [{
					name: event.name,
					img_src: event.img_src,
					category: event.category,
					total_quota: event.total_quota,
					total_debt: event.total_debt,
					available_quota: event.available_quota,
					card_number: event.card_number,
					note: event.note
				}]
			})
			if (addRes) {
				return {
					code: "success",
					msg: "添加成功"
				}
			}
			return {
				code: "fail",
				msg: "添加s失败"
			}
		}
	}
	//如果有数据  只需要更新
	else {
		console.log("有数据")
		let id = res.data[0]._id
		console.log(id, "更新ID")
		delete res.data[0]._id
		if (event.category === 'debit') {
			console.log("借记卡")
			//计算总资产
			let newTotalAssets = parseFloat(res.data[0].total_assets) + parseFloat(event.balance)
			res.data[0].total_assets = newTotalAssets.toFixed(2)
			//计算净资产
			let newTotalNetAssets = parseFloat(res.data[0].total_net_assets) + parseFloat(event.balance)
			res.data[0].total_net_assets = newTotalNetAssets.toFixed(2)
			
			res.data[0].accounts.push({
				name: event.name,
				img_src: event.img_src,
				category: event.category,
				balance: event.balance,
				card_number: event.card_number,
				note: event.note
			})
			let updateRes = await db.collection("user_acct").where({
				"_id": id
			}).update(res.data[0])
			console.log(updateRes, "储蓄卡修改响应")
		} else if (event.category === 'credit') {
			console.log("信用卡")
			//计算总资产 额度不算资产 负债算为总资产
			let newTotalAssets = parseFloat(res.data[0].total_assets) + parseFloat(event.total_debt)
			res.data[0].total_assets = newTotalAssets.toFixed(2)
			// //计算净资产 添加信用卡的负债时 净资产不变 总资产增加
			// let newTotalNetAssets = parseFloat(res.data[0].total_net_assets) - parseFloat(event.total_debt)
			// res.data[0].total_net_assets = newTotalNetAssets.toFixed(2)
			//计算总负债
			let newTotalDebt = parseFloat(res.data[0].total_debt) + parseFloat(event.total_debt)
			res.data[0].total_debt = newTotalDebt.toFixed(2)
			
			res.data[0].accounts.push({
				name: event.name,
				img_src: event.img_src,
				category: event.category,
				total_quota: event.total_quota,
				total_debt: event.total_debt,
				available_quota: event.available_quota,
				card_number: event.card_number,
				note: event.note
			})
			let updateRes = await db.collection("user_acct").where({
				"_id": id
			}).update(res.data[0])
			console.log(updateRes, "信用卡修改响应")
		}
		return {
			code: "success",
			msg: "添加成功"
		}
	}
	//返回数据给客户端
	return {
		code: "fail",
		msg: "添加失败"
	}
};

