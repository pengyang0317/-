import service from './axios'
// const icode = '13926EAFCAA16CC3'
// function screenData() {
//   return service({
//     url: '/screen/data',
//     method: 'get',
//     params: { icode }
//   })
// }


// export default {
//     screenData
// }

class Home { 
  getVerificationCode() {  //获取验证码
    return service({
      url: 'getVerificationCode',
      method: 'get'
    })
  }
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