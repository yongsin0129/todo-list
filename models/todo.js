const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  done: Boolean
})
/**
 * 資料庫 name : todo-list
 * Collection name : YS-Todo
 */
module.exports = mongoose.model('YS-Todo', todoSchema)
