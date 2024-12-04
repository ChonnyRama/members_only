const db = require('../db/queries')

async function getIndex(req, res, next) {
  res.render('index')
}

async function getSignup(req, res, next) {
  res.render('register')
}

async function postSignup(req, res, next) {
  
}

module.exports = {
  getSignup,
  getIndex,
  postSignup
}