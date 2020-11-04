import { loginFinish } from '../type'
import service from './axios'

class Home { 
  // getVerificationCode() {  //获取验证码
  //   return service({
  //     url: 'getVerificationCode',
  //     method: 'get'
  //   })
  // }
  registereduser(_data:loginFinish) {  //注册
    return service({
      url: `registereduser`,
      data: _data,
      method: 'post'
    })
  }
  loginUser(_data: loginFinish) { 
    return service({
      url: `loginUser`,
      data: _data,
      method: 'post'
    })
  }
  send() {
    return service({
      url: `email`,
      method: 'post'
    })
  }

}

export default {
  Home: new Home()
}