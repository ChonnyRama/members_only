const path = require("node:path")
const express = require("express")
const session = require("express-session")
const passport = require("passport")
const memberRouter = require("./routes/memberRouter")
const LocalStrategy = require('passport-local').Strategy;
const pgSession = require('connect-pg-simple')(session)
require('dotenv').config();
const pool = require('./db/pool')

const app = express();
app.set("views", path.join(__dirname, "views"))
app.set("view engine", 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
      pool: pool,
      tableName: 'members_only',
    }),
    cookie: {maxAge: 30*24*60*60*1000}
  })
)

app.use('/', memberRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log("app listening on port 3000"))
