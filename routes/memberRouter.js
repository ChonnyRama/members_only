//memberrouter.js
const { Router } = require('express')
const memberController = require('../controllers/memberController')

const memberRouter = Router()

memberRouter.get('/', memberController.memberIndexGet)
memberRouter.get('/register', memberController.memberSignupGet)
memberRouter.post('/register', memberController.memberSignupPost)

module.exports = memberRouter