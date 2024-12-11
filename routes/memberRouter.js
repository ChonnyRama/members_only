//memberrouter.js
const { Router } = require('express')
const memberController = require('../controllers/memberController')

const memberRouter = Router()

memberRouter.get('/', memberController.memberIndexGet)
memberRouter.get('/register', memberController.memberSignupGet)
memberRouter.get('/member-auth', memberController.membershipUpdateGet)
memberRouter.get('/new-message', memberController.newMessageGet)
memberRouter.post('/register', memberController.memberSignupPost)
memberRouter.post('/member-auth', memberController.membershipUpdatePost)
memberRouter.post('/new-message', memberController.newMessagePost)

module.exports = memberRouter