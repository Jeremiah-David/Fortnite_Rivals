const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')
const axios = require('axios');
const { Console } = require('console');
require('dotenv').config()
let apikey = process.env.API_KEY
const methodOverride = require('method-override');





router.get('/index', (req, res) => {
    db.comment.findAll({
        where: { userId: req.user.id }
    }).then((comments) => {
        console.log('#&$^&#*$^$&^@#$' + comments + '&*^#%$&*$^*&#$*&#@$^')
        res.render('cboard/index', { comments })
    }).catch((err) => {
        console.log(err)
    })
})

router.post('/index', (req, res) => {
    console.log('55555555' + req.body.rivalSpeak + '55555555')
    db.rival.findOne({
        where: { epicUsername: req.body.rivalEpicName }
    }).then(rival => {
        db.comment.create({
            content: req.body.rivalSpeak,
            userId: req.user.id,
            rivalId: rival.id
        }).then(() => {
            res.redirect('/cboard/index')
        })

    })
})

router.delete('/:id', (req, res) => {
    db.comment.destroy({
        where: { 
            id: req.params.id
        }
    })
    .then(deleted => {
        res.redirect('/cboard/index');

    })  

    
});

router.put('/:id', (req, res) => {
    db.comment.update({
        content: req.body.editSpeak,
    }, {
        where: { 
            id: req.params.id
        }
    })
    .then(updated => {
        res.redirect('/cboard/index');

    })  

    
});




module.exports = router