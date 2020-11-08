const crypto = require('crypto')
const SECRETY_KEY = "com.miao.miao"

/**
 * 密码加密函数
 * @param {Object} password
 */
function encryPassword(password){
	const str = `password=${password}&key=${SECRETY_KEY}`
	let md5 = crypto.createHash('md5')
	return md5.update(str).digest('hex')
}


module.exports =  {
	encryPassword
}
