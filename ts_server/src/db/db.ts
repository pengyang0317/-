const mysql = require('mysql')

const pool = mysql.createPool({
  host     :  'localhost',
  user     :  'root',
  password :  'py123456',
  database :  'ts_server'
})

let query = function( sql: any, values?: any ) {

  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err: any, connection: { query: (arg0: any, arg1: any, arg2: (err: any, rows: any) => void) => void; release: () => void }) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })

}

module.exports = {
  query
}
export {}