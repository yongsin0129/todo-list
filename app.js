const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars').engine
const Todo = require('./models/todo')
const app = express()
const port = 3000

app.engine('hbs', exphbs({ extname: 'hbs' }))
app.set('view engine', 'hbs')

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('mongodb connected')
  })
  .catch(error => {
    console.log('mongodb error!')
    console.log(error)
  })

// const db = mongoose.connection
// db.on('error', () => {
//   console.log('mongodb error!')
// })
// db.once('open', () => {
//   console.log('mongodb connected')
// })

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(data => res.render('index', { todos: data }))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`server is listen on http://localhost:${port}`)
})
