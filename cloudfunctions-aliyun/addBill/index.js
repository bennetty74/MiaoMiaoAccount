'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	//查询数据库有无该用户账单
	const db = uniCloud.database()
	let billRes = await db.collection("user_bill").where({
		username:event.username,
		date:event.dateMonth
	}).get()
	console.log(billRes,"查询数据")
	//如果当月为空
	if(billRes.data.length==0){
		console.log("新增数据")
		let id = await db.collection("user_bill").add({
			username:event.username,
			totalOut:event.amount,
			totalIn:'0.00',
			date:event.dateMonth,
			billList:[
				{
					date:event.date,
					dateTotalOut:event.amount,
					dateTotalIn:'0.00',
					bills:[
						{
							category:event.category,
							account:event.account,
							label:event.label,
							amount:event.amount,
							time:event.time,
							username:event.username,
							imgSrc:event.imgSrc,
						}
					],
				},
			]
		})
		console.log("新增成功",id)
		return {code:'success',msg:'记账成功'}
	}else{
		let id = billRes.data[0]._id
		delete billRes.data[0]._id
		//判断当日是否为空
		let hasDateBill = false
		let dateIndex = 0
		for(let i in billRes.data[0].billList){
			//当日不为空
			if(billRes.data[0].billList[i].date === event.date){
				hasDateBill = true
				dateIndex = i
				break;
			}
		}
		//如果当前日期有数据，找到对应列表，在当日的bills列表push
		if(hasDateBill){
			billRes.data[0].billList[dateIndex].bills.push(
				{
					category:event.category,
					account:event.account,
					label:event.label,
					amount:event.amount,
					time:event.time,
					username:event.username,
					imgSrc:event.imgSrc,
				}
			)
			//计算当日总支出
			billRes.data[0].billList[dateIndex].dateTotalOut = (parseFloat(billRes.data[0].billList[dateIndex].dateTotalOut) + parseFloat(event.amount)).toFixed(2)
			//计算当月总支出
			billRes.data[0].totalOut = (parseFloat(billRes.data[0].totalOut) + parseFloat(event.amount)).toFixed(2)
			//更新数据库
			console.log(billRes.data[0],"0")
			let isUpdated = await db.collection("user_bill").where({
				'_id':id,
			}).update(billRes.data[0])
			console.log(isUpdated,"当日不为空的更新结果")
			return {code:'success',msg:'记账成功'}
		}else{
			//如果没有数据，直接push
			billRes.data[0].billList.push({
				date:event.date,
				dateTotalIn:'0.00',
				dateTotalOut:event.amount,
				bills:[
					{
						category:event.category,
						account:event.account,
						label:event.label,
						amount:event.amount,
						time:event.time,
						username:event.username,
						imgSrc:event.imgSrc,
					}
				]
			})
			//计算当月总支出
			billRes.data[0].totalOut = (parseFloat(billRes.data[0].totalOut) + parseFloat(event.amount)).toFixed(2)
			//更新数据库
			let isUpdated = await db.collection("user_bill").where({
				"_id":id
			}).update(billRes.data[0])
			console.log(isUpdated,"当日为空的更新结果")
			return {code:'success',msg:'记账成功'}
		}
	}
	return {code:'fail',msg:'记账失败'}
};
