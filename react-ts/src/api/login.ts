import axios from '../utils/request'

  const getCaptcha = (uuid: string) => {
    return axios.get('/public/getCaptcha', {
      params: { sid: uuid}
    })
  
  }
  
  const forget = (option:object) => {
    return axios.post('/forget', {
      ...option
    })
  }
  
  export { getCaptcha, forget }