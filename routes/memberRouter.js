const { Router } = require('express')
const memberController = require('../controllers/memberController')

const memberRouter = Router()

memberRouter.get('/', memberController.getIndex)
memberRouter.get('/register', memberController.getSignup)
memberRouter.post('/register', memberController.postSignup)

module.exports = memberRouter