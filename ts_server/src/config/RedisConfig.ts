const redis = require('redis');
const { promisify } = require("util");
const {redisOptions} = require('./init')
const options = {
    host: redisOptions.host,
    port: redisOptions.port,
    password: redisOptions.password,
    detect_buffers: true,
    retry_strategy: function (options: { error: { code: string; }; total_retry_time: number; attempt: number; }) {
      if (options.error && options.error.code === 'ECONNREFUSED') {
        // End reconnecting on a specific error and flush all commands with
        // a individual error
        return new Error('The server refused the connection');
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        // End reconnecting after a specific timeout and flush all commands
        // with a individual error
        return new Error('Retry time exhausted');
      }
      if (options.attempt > 10) {
        // End reconnecting with built in error
        return undefined;
      }
      // reconnect after
      return Math.min(options.attempt * 100, 3000);
    }
  }

  const client = redis.createClient(options)
  client.on('error', (err: string) => {
    console.log('Redis Client Error:' + err)
  })
  
  const setValue = (key: any, value: string | null, time: number) => {
    if (typeof value === 'undefined' || value == null || value === '') {
      return
    }
    if (typeof value === 'string') {
      if (typeof time !== 'undefined') {
        client.set(key, value, 'EX', time)
      } else {
        client.set(key, value)
      }
    } else if (typeof value === 'object') {
      Object.keys(value).forEach((item) => {
        client.hset(key, item, value[item], redis.print)
      })
    }
  }


const getAsync = promisify(client.get).bind(client);

const getValue = (key: string) => {
    return getAsync(key)
  }
  

const getHValue = (key:string) => {
return promisify(key).bind(client)(key)
}
  

const delValue = (key: any) => {
    client.del(key, (err: string, res: number) => {
      if (res === 1) {
        console.log('delete successfully');
      } else {
        console.log('delete redis key error:' + err)
      }
    })
  }

  export {
    client,
    setValue,
    getValue,
    getHValue,
    delValue
  }