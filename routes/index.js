// ! routes 底下的 index 就是總路由 , 在 app.js 中設定 app.use(router) 即可轉入此總路由
// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 各種 route 由 modules 統一管理
const home = require('./modules/home')
const todos = require('./modules/todos')

// 準備引入路由模組
router.use('/', home)
router.use('/', todos)

// 匯出路由器
module.exports = router
