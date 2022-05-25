const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

// ! 主頁
router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' }) // 反之 descending
    .then(data => res.render('index', { todos: data }))
    .catch(error => console.log(error))
})

module.exports = router
