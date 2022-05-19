const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars').engine
const app = express()
const port = 3000

app.engine('hbs', exphbs({ extname: 'hbs' }))
app.set('view engine', 'hbs')

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected')
})

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`server is listen on http://localhost:${port}`)
})
