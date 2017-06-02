const express = require('express')
const LocalStrategy = require('passport-local')
const passport = require('passport')
const path = require('path')
const auth = require('./lib/auth')

const apiRoutes = require('./routes/api')

const app = express()

app.use(express.static('public'))
app.use(passport.initialize())

app.use('/api/', apiRoutes) 

passport.use(new LocalStrategy(auth.verify))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = app
