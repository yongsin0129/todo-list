const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

// ! 新增 Todo 功能
router.get('/todos/new', (req, res) => {
  res.render('new')
})

router.post('/todos', (req, res) => {
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
router.get('/todos/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => {
      res.render('detail', { todo })
    })
    .catch(error => {
      console.log('NG !')
      console.log(error)
    })
})
// ! 新增 Edit 功能
router.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => {
      res.render('edit', { todo })
    })
    .catch(error => {
      console.log('NG !')
      console.log(error)
    })
})
router.put('/todos/:id', (req, res) => {
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
router.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    // .lean() // !注意 lean 會將 model 物件轉為 plain 的 js 物件資料，不能使用 model 物件的任何 method 及 attr
    .then(async data => {
      await data.delete()
      res.redirect('/')
    })
    .catch(error => {
      console.log('NG !')
      console.log(error)
    })
})

module.exports = router
