const express = require('express')
const layouts = require('express-ejs-layouts')
const app = express()
require('dotenv').config()  //config envoriments
const session = require('express-session') 
const passport = require('./config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn.js')

app.use(express.urlencoded({extended: false}))
// set up the view engine to ejs
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnitialized: true
}))


//passport middleware
app.use(express.static(__dirname+"/public"))
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())


app.set('view engine', 'ejs')
app.use(layouts)
// CUSTOM MIDDLE
app.use(( req, res, next) => {
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next() // move on next peiv
})
//controller middleware
app.use('/auth', require('./controllers/auth.js'))
app.use('/fortnite', require('./controllers/fortnite.js'))
app.use('/cboard', require('./controllers/cboard.js'))


app.get('/', (req, res)  => {
    res.render('home')
    // res.render('home.ejs')
})

app.get('/profile', isLoggedIn, (req, res)  => {
    res.render('fortnite/index')
})

app.get('*', (req, res) => {
    res.render('404')
})

app.listen(process.env.PORT, ()=> {
    console.log("cyberpunk " + process.env.PORT)
})

