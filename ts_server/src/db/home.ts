const { query } = require('./db')
async function getUserData( data:string) {
    let sql = `SELECT * FROM user where user = ${data}` 
    let dataList = await query( sql )
    return dataList
  }
  
async function setUserData(data:any) {
    let sql = `insert into user values(${data});`
    let dataList = await query( sql )
    return dataList
}

async function loginUser(data: string) {
    let sql = `select * from user where ${data};`
    let dataList = await query( sql )
    return dataList
}

class Home {
    getUserData(data:string) {
        return  getUserData(data)
        }
    setUserData(data:any) {
        return setUserData(data)
    }
    loginUser(data: string) {
        return loginUser(data)
    }
}

module.exports = new Home()