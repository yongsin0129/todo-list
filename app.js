const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars').engine
const Todo = require('./models/todo')
const app = express()
const port = 3000

app.engine('hbs', exphbs({ extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

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
// ! 主頁
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(data => res.render('index', { todos: data }))
    .catch(error => console.log(error))
})

// ! 新增 Todo 功能
app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  const typeName = req.body.name
  const newTodo = new Todo({ name: typeName })
  newTodo
    .save()
    .then(() => {
      console.log('New Todo has been saved')
    })
    .catch(error => {
      console.log(error)
    })
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`server is listen on http://localhost:${port}`)
})
