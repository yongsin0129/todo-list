const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars').engine
const methodOverride = require('method-override')
const router = require('./routes')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(router)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('mongodb connected')
  })
  .catch(error => {
    console.log('mongodb error!')
    console.log(error)
  })

app.listen(port, () => {
  console.log(`server is listen on http://localhost:${port}`)
})
