//app.js
const path = require("node:path")
const express = require("express")
const session = require("express-session")
const passport = require("passport")
const memberRouter = require("./routes/memberRouter")
const LocalStrategy = require('passport-local').Strategy;
const pgSession = require('connect-pg-simple')(session)
require('dotenv').config();
const pool = require('./db/pool')
const bcrypt = require("bcryptjs")


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
      tableName: 'sessions',
    }),
    cookie: {maxAge: 30*24*60*60*1000}
  })
)

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const {rows} = await pool.query("SELECT * FROM members WHERE username = $1", [username])
      const user = rows[0]

      if (!user) {
        return done(null,false, { message: "Incorrect username"})
      }

      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        return done(null,false,{message: "incorrect password"})
      }
      console.log('passwords match')

      return done(null,user)
    } catch (err) {
      return done(err)
    }
  })
)

app.use(passport.session())


passport.serializeUser((user, done) => {
  console.log('serialize')
  done(null,user.id)
})

app.use((req, res, next) => {
  console.log("Session on request:", req.session);
  next();
});

passport.deserializeUser(async (id, done) => {
  console.log("Deserializing user with ID:", id); // Debugging
  try {
    const { rows } = await pool.query("SELECT * FROM members WHERE id = $1", [id]);
    const user = rows[0];
    console.log("User deserialized:", user); // Debugging

    done(null, user);
  } catch (err) {
    console.error("Error deserializing user:", err);
    done(err);
  }
});


app.use((req, res, next) => {
  console.log("req.user:", req.user)
  res.locals.currentUser = req.user || null;
  next()
})

app.post("/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
)

app.use('/', memberRouter)


const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log("app listening on port 3000"))

