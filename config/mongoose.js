const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGODB_URI_todo)
  .then(() => {
    console.log('mongodb connected')
  })
  .catch(error => {
    console.log('mongodb error!')
    console.log(error)
  })

module.exports = mongoose
