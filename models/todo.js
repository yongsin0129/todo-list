const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  done: Boolean
})
module.exports = mongoose.model('YS-Todo', todoSchema)
