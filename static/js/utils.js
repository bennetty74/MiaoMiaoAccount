
/**
 * 字符串转为Number，保留两位小数
 * @param {Object} x
 */
function toDecimal(x) {
	//如果找不到小数点，表示整数
	if(x.indexOf('.')==-1){
		x = x+'.00'
	}
	return parseFloat(x).toFixed(2); 
}
	
/**
 * 从local storage 获取数据
 */
function getItem(key){
	let result = uni.getStorageSync(key)
	console.log(result,"result")
	return result
}

/**
 * 存数据到storage
 * @param {Object} key
 * @param {Object} value
 */
function setItem(key,value){
	let isOk = false
	uni.setStorage({
		key:key,
		data:value,
		success:function(res){
			console.log(res,"设置成功")
			isOk = true
		},
		fail:function(res){
			console.log(res,"设置失败")
			isOk = false
		}
	})
	return isOk
}

function removeItem(key){
	uni.removeStorage({
		key:key,
		success:function(res){
			console.log("storage 移除成功")
		}
	})
}


export default{
	getItem,
	setItem,
	toDecimal
}

