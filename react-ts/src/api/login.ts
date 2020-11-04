import axios from '../utils/request'

  const getCode = () => {
    return axios.get('/getVerificationCode')
  }
  
  const forget = (option:object) => {
    return axios.post('/forget', {
      ...option
    })
  }
  
  export { getCode, forget }