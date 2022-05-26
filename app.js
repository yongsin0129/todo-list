const express = require('express')
const exphbs = require('express-handlebars').engine
const methodOverride = require('method-override')
const router = require('./routes')
require('./config/mongoose')
const app = express()
// 如果在 Heroku 環境則使用 process.env.PORT
// 否則為本地環境，使用 3000
const PORT = process.env.PORT || 3000

// 設定模板引擎
app.engine('hbs', exphbs({ extname: 'hbs' }))
app.set('view engine', 'hbs')

// 引入 bodyParser , 4.16 之後不需要另外 install， express 有內建
app.use(express.urlencoded({ extended: true }))
// methodOverride 讓 HTML 的 Form 可以使用 PUT DELETE
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(router)

app.listen(PORT, () => {
  console.log(`APP is listen on http://localhost:${PORT}`)
})
