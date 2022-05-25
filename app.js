const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars').engine
const Todo = require('./models/todo')
const methodOverride = require('method-override')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

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
    .sort({ _id: 'asc' }) // 反之 descending
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
    .then(() => {})
    .catch(error => {
      console.log(error)
    })
  res.redirect('/')
})
// !新增 details 功能
app.get('/detail/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(data => {
      res.render('detail', { data })
    })
    .catch(error => {
      console.log('NG !')
      console.log(error)
    })
})
// ! 新增 Edit 功能
app.get('/edit/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(data => {
      res.render('edit', { data })
    })
    .catch(error => {
      console.log('NG !')
      console.log(error)
    })
})
app.put('/edit/:id', (req, res) => {
  const { id } = req.params
  const { name, isDone } = req.body
  Todo.findById(id)
    // .lean() // !注意 使用 lean 之後就不能用 model類的 method 會導致model.save()失效
    .then(data => {
      data.name = name
      data.isDone = isDone === 'on' //! 注意 checkbox 的回傳值很特別 是on , 如果沒打勾也不會有回傳值
      data.save()
      res.redirect('/')
    })
    .catch(error => {
      console.log('NG !')
      console.log(error)
    })
})
// ! 新增 delete 功能
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    // .lean() // !注意 使用 lean 之後就不能用 model類的 method 會導致model.save()失效
    .then(async data => {
      await data.delete()
      res.redirect('/')
    })
    .catch(error => {
      console.log('NG !')
      console.log(error)
    })
})

app.listen(port, () => {
  console.log(`server is listen on http://localhost:${port}`)
})
