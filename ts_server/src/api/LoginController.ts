// import send from '../config/MailConfig'
// import moment from 'moment'
// import jsonwebtoken from 'jsonwebtoken'
// import config from '../config'
// import { checkCode } from '@/common/Utils'
// import User from '@/model/User'

class LoginController {
  constructor() { }

  async login(ctx:any) {
        const {sid,code} = ctx.request.body
        console.log(ctx.request.body)
        ctx.body = {
           data: "5000"
        }

    }
}
export default new LoginController()
