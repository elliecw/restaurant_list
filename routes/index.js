// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 準備引入路由模組

// 引入模組程式碼
const Restaurant = require('./modules/restaurant')
// 將網址結構符合 /restaurants 字串開頭的 request 導向 restaurants 模組 
router.use('/restaurants', restaurants)

// 匯出路由器
module.exports = router