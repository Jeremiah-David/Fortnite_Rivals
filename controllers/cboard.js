const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')
const axios = require('axios');
const { Console } = require('console');
require('dotenv').config()
let apikey = process.env.API_KEY




router.get('/index', (req, res) => {
    db.comment.findOne({
        where: { userId: req.user.epicUsername }
    }).then((comment) => {
        console.log('#&$^&#*$^$&^@#$' + comment + '&*^#%$&*$^*&#$*&#@$^')
        res.render('cboard/index', {comment})
    })
})

router.post('/index', (req, res) => {
    console.log('55555555' + req.body.rivalSpeak + '55555555')
    db.comment.findOrCreate({
        where: { userId: req.user.epicUsername },
        defaults: {
            rivalId: req.body.rivalEpicName,            
            content: req.body.rivalSpeak
        },
    }).then(() => {
        res.redirect('/cboard/index')
    })
})





module.exports = router