//memberController.js
const db = require('../db/queries')
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs")

const validateMember = [
  body("username").trim()
    .isAlphanumeric().withMessage('Must be alphanumeric')
    .isLength({ min: 1, max: 14 }).withMessage('Has to be between 1-14 characters'),
  body('email')
    .isEmail().withMessage('Not a valid email'),
  body('password')
    .isLength({ min: 5 }).withMessage('Password must be at least 5 chars long'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error()
    }
    return true
  })
    .withMessage('Passwords do not match')
];


async function memberIndexGet(req, res, next) {
  res.render('index', {user: req.user})
}

async function memberSignupGet(req, res, next) {
  res.render('register', {errors: []})
}

const memberSignupPost = [
  validateMember,
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render("register", {
        errors: errors.array()
      })
    }

    let membership = 'regular'
    if (req.body.passcode === 'Gengar') {
      membership = 'special'
    }

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      await db.createMember({
        ...req.body,
        password: hashedPassword,
        membership: membership,
      })
    })
    
    res.redirect("/")
  }
]

module.exports = {
  memberIndexGet,
  memberSignupGet,
  memberSignupPost
}

