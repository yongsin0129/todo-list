const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars').engine
const methodOverride = require('method-override')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const router = require('./routes')
require('./config/mongoose')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
const app = express()
// 如果在 Heroku 環境則使用 process.env.PORT
// 否則為本地環境，使用 3000
const PORT = process.env.PORT || 3000

// 設定模板引擎
app.engine('hbs', exphbs({ extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)
// 引入 bodyParser , 4.16 之後不需要另外 install， express 有內建
app.use(express.urlencoded({ extended: true }))
// methodOverride 讓 HTML 的 Form 可以使用 PUT DELETE
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg') // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg') // 設定 warning_msg 訊息
  res.locals.error_msg = req.flash('error') // 設定 warning_msg 訊息
  next()
})
// 將 request 導入路由器
app.use(router)

app.listen(PORT, () => {
  console.log(`APP is listen on http://localhost:${PORT}`)
})
