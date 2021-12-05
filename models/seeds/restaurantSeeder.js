const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入 model

mongoose.connect('mongodb://localhost/restaurant_list') // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Restaurant.create({ name: 'name-' + i })
  }
  console.log('done')
})