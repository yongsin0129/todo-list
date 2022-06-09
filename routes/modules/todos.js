const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

// ! 新建立 Todo 功能
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('', (req, res) => {
  const userId = req.user._id
  const typeName = req.body.name
  const newTodo = new Todo({ name: typeName, userId })
  newTodo
    .save()
    .then(() => {})
    .catch(error => {
      console.log(error)
    })
  res.redirect('/')
})
// ! 查看 details 功能
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Todo.findOne({ _id, userId })
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
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Todo.findOne({ _id, userId })
    .lean()
    .then(todo => {
      res.render('edit', { todo })
    })
    .catch(error => {
      console.log('NG !')
      console.log(error)
    })
})
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, isDone } = req.body
  Todo.findOne({ _id, userId })
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
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Todo.findOne({ _id, userId })
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
