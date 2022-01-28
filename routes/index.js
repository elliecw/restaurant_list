// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const index = require("./modules/index")

// 引入模組程式碼
const Restaurant = require('./modules/restaurant')

const users = require('./modules/users')  // add this
const auth = require('./modules/auth')   // 引用模組

// 將網址結構符合 /restaurants 字串開頭的 request 導向 restaurants 模組 
const { authenticator } = require('../middleware/auth')
router.use('/restaurants', authenticator, Restaurant)
router.use('/users', users)  // add this
router.use('/auth', auth)  // 掛載模組
router.use('/', authenticator, index)

module.exports = router