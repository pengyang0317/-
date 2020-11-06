var svgCaptcha = require('svg-captcha');
const {  setValue,getValue} = require('../config/RedisConfig') ;
class PublicController {
    constructor() {}
    async getCaptcha(ctx:any) {
        const {sid} = ctx.request.query
        let options = {
            width: 100,
            height: 32,
            fontSize: 46,
            ignoreChars: '0o1i',
            noise: Math.random() * 5, 
            color: true ,
        }
        const {data,text} = svgCaptcha.create(options)
            setValue(sid, text, 1 * 60 )
            ctx.body= {
                code: '0000',
                data: data,
                message: '获取验证码成功了'
            }
    }
}


export default new PublicController()