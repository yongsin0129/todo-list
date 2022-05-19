const mongoose = require('mongoose')
const Todo = require('../todo')

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `todo-list ${i}`, done: false })
  }
  console.log('created successfully')
})
