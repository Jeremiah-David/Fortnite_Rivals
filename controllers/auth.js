const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')
const axios = require('axios');
require('dotenv').config()
let apikey = process.env.API_KEY








router.get('/signup', (req, res) => {
    res.render('auth/signup.ejs')
})

router.post('/signup', (req, res) => {
    console.log('^^^^^^^^^' + req.body.epicUsername + '#########')
    axios.get(`https://fortniteapi.io/v1/lookup?username=${req.body.epicUsername}`, {
        headers: {
            Authorization: apikey
        }
    }).then((userid) => {
        console.log("*!!!!!!!!!!***" + req.body.epicUsername + "****!!!!!!!!**")
        console.log("%%%%%%%%" + userid.data.account_id + '%%%%%%%%%')
        db.user.findOrCreate({
            where: { email: req.body.email },
            defaults: {
                name: req.body.name,
                password: req.body.password,
                epicUsername: req.body.epicUsername,
                epicId: userid.data.account_id
            },
        })
    }).then(([createdUser, wasCreated]) => {
            if (wasCreated) {
                // getepicId()


                // res.send('POST form data from signup.ejs, then redirect')
                passport.authenticate('local', {
                    successRedirect: '/auth/login', // !-> FLASH <-!
                    successFlash: 'Account created please log in!'
                })(req, res) // why does this need to be an IIFE???
                return createdUser
            } else { // !-> FLASH <-!
                req.flash('error', 'email already exists, try logging in')
                // console.log('An account associated with that email address already exists! Did you mean to login?')
                res.redirect('/auth/login')
            }
        })
        // .then(createdUser => {
        //     return axios.get(`https://fortniteapi.io/v1/stats?account=${createdUser.data.account_id}`, {
        //         headers: {
        //             Authorization: apikey
        //         }
        //     }) 
        // console.log("******" + createdUser + "******")
        // }) 
        .catch(err => {
            console.log("catch" + err)
        })

})

router.get('/login', (req, res) => {



    res.render('auth/login.ejs')
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login',
    successRedirect: '/fortnite/index', // !-> FLASH <-!
    failureFlash: 'Invalid username and/or password.',
    successFlash: 'You are now logged in.'

})
)

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})


module.exports = router