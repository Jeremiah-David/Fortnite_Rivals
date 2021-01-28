const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')
const axios = require('axios');
const { Console } = require('console');
require('dotenv').config()
let apikey = process.env.API_KEY




router.get('/index', (req, res) => {
  axios.get(`https://fortniteapi.io/v1/stats?account=${req.user.epicId}`, {
    headers: {
      Authorization: apikey
    }
  }).then((stats) => {
    console.log('!!!##' + stats.data + '!!!!!')
    res.render('fortnite/index', { stats: stats.data })
  })
})

router.get('/rival', (req, res) => {
  axios.get(`https://fortniteapi.io/v1/lookup?username=${req.query.rivalepicUsername}`, {
    headers: {
      Authorization: apikey
    }
  })
    .then((rival) => {
      db.rival.findOrCreate({
        where: {
          epicUsername: req.query.rivalepicUsername,
          epicId: rival.data.account_id
        },
      }).then(([rival, wasCreated]) => {
        db.user.findOne({
          where: { id: req.user.id }
        }).then(user => {
          console.log('userfound')
          user.addRival(rival)
          axios.get(`https://fortniteapi.io/v1/stats?account=${rival.epicId}`, {
            headers: {
              Authorization: apikey
            }
          })
            .then((rivalStats) => {
              res.render('fortnite/rival', { rivalStats: rivalStats.data, epicId: rival.epicId })
            })
        })
      }).catch(err => {
        console.log(err)
      })
    })
})

router.get('/addrival', (req, res) => {
  res.render('fortnite/addrival')
})

router.get('/compare/:id', (req, res) => {
  console.log(req.user)
  console.log('$$$$$$$$$' + req.user.epicId + '********')
  axios.get(`https://fortniteapi.io/v1/stats?account=${req.user.epicId}`, {
    headers: {
      Authorization: apikey
    }
  }).then((stats) => {
    console.log('$$$' + stats.data.global_stats.squad.placetop1 + '%%%%%')
    axios.get(`https://fortniteapi.io/v1/stats?account=${req.params.id}`, {
      headers: {
        Authorization: apikey
      }
    }).then((rivalstats) => {

      console.log(rivalstats.data.global_stats.squad.placetop1 + '*$&$&&' + stats.data.global_stats.squad.placetop1)
      res.render('fortnite/compare', { rivalstats: rivalstats.data, stats: stats.data })
    })
  })

})

module.exports = router