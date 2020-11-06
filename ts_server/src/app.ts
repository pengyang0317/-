const app = require('koa')

import Config from './config/init'
const App = new app();

import router from './router/routes'
const bodyParser = require('koa-bodyparser')
const Home = require('./db/home')
const {getUserData,setUserData,loginUser} = Home

const email = require('./utils/sendEmail.js'); //引入封装好的函数
var svgCaptcha = require('svg-captcha');



// import {  setValue,getValue} from './config/RedisConfig'



type ctxType = { request: { body: { username: any; password: any; }; }; body: { code:any; data: {}; message: string; }; }

// router.get('/getVerificationCode', async (ctx: any,next: any)=> {
//   const {sid} = ctx.request.query
//   const {data,text} = svgCaptcha.create({
//     width: 100,
//     height: 32,
//     fontSize: 46,
//     ignoreChars: '0o1i',
//     noise: Math.random() * 5, 
//     color: true ,
//   })
//   setValue(sid, text, 1 * 60 )
//   getValue(sid).then((res: any) => {
//     console.log(res)
//   })
//     ctx.body= {
//       code: '0000',
//       data: data,
//       message: '获取验证码成功了'
//     }
// })
// router.post('/registereduser', async (ctx:ctxType) => {
//   let dbData = await getUserData(`"${ctx.request.body.username}"`)
//   let _data = {}
//   if(dbData.length) {
//     _data = {
//       code: '0001',
//       data: '',
//       message: `当前用户已经存在`
//     }
//   }else{
//     console.log(ctx.request.body)
//     let dbData = await setUserData(`"${ctx.request.body.username}","${ctx.request.body.password}"`)
//     console.log(dbData)
//     _data = {
//       code: '0000',
//       data: '',
//       message: `写入数据库`
//     }
//   }
//   ctx.body = {
//     code: '0000',
//     data: _data,
//     message: '保存用户成功了'
//   }
// })
// router.post('/loginUser',async (ctx: ctxType) => {
//   const {username,password} = ctx.request.body
//   let dbData:[] = await loginUser(`user= "${username}" and password="${password}"`)
//   let _data = {}
//   if(!dbData || dbData.length > 0) {
//     console.log(`有值`)
//     ctx.body = {
//       code: '0000',
//       data: _data,
//       message: '登录成功'
//     }
//   }else{
//     console.log(`没有值`)
//     ctx.body = {
//       code: '0001',
//       data: _data,
//       message: '登录失败'
//     }
//   }


// } )
// const check:any = {} //声明一个对象缓存邮箱和验证码，留着
// router.post('/email', async (ctx: { request: { body: { email: any; }; }; body: string; }, next: any) => {
// 	const mail =  "234277894@qq.com"  //ctx.request.body.email
// 	const code = '1234' //parseInt(Math.random(0, 1) * 10000) //生成随机验证码
// 	check[mail] = code
// 	if (!mail) {
// 		return ctx.body = '参数错误' //email出错时或者为空时
// 	}
// 	async function timeout() {
// 		return new Promise((resolve, reject) => {
// 			email.sendMail(mail, code, (state: unknown) => {
// 				resolve(state);
// 			})
// 		})
// 	}
// 	await timeout().then(state => {
// 		if (state) {
// 			return ctx.body = "发送成功"
// 		} else {
// 			return ctx.body = "失败"
// 		}
// 	})
// })



App
  .use(bodyParser())
  .use(router())
  // .use(router.routes())
  // .use(router.allowedMethods())

  
App.listen(Config.port, () => {
    console.log(`服务启动在${Config.port}`)
})
