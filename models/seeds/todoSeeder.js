const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Todo = require('../todo')
const User = require('../user')
const db = require('../../config/mongoose').connection
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '123'
}
db.once('open', async () => {
  await User.deleteMany()
  await Todo.deleteMany()
  console.log('Database has been deleted successfully')
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash
      })
    )
    .then(async user => {
      const userId = user._id
      for (let i = 0; i < 10; i++) {
        await Todo.create({ name: `name-${i}`, userId })
      }
    })
    .then(() => {
      console.log('New Dummy Data has been created successfully.')
      process.exit()
    })
})
