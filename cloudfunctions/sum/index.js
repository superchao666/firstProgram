// 云函数入口文件
const cloud = require('../test/wx-server-sdk')

cloud.init()


// 云函数入口函数
exports.main = (event, context) => {
  console.log(1123123);
  console.log(event)
  console.log(context)
  return {
    sum: event.a + event.b
  }
}