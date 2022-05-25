const mongoose = require('../../config/mongoose')
const Todo = require('../todo')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', async () => {
  await Todo.deleteMany()
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `todo-list ${i}`, done: false })
  }
  console.log('created successfully')
})
