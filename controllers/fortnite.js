const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')
const axios = require('axios');
const { Console } = require('console');
require('dotenv').config()
let apikey = process.env.API_KEY




router.get('/index', (req, res) => {

  console.log('$$$$$$$$$' + req.user.epicId + '********')
  axios.get(`https://fortniteapi.io/v1/stats?account=${req.user.epicId}`, {
    headers: {
      Authorization: apikey
    }
  }).then((stats) => {
    console.log(stats.data)
    res.render('fortnite/index', { stats: stats.data })
  }).then((rivalStats) => {
    return axios.get(`https://fortniteapi.io/v1/stats?account=${req.user.epicId}`, {
      headers: {
        Authorization: apikey
      }
    })
  }).then((bothstats) => {
    res.render('fortnite/compare', { bothstats: stats, rivalStats })
  })
})
// console.log("****" + req.user.epicUsername + "******")
// }).then((userid) => {
//   console.log("*!!!!!!!!!!***" + req.user.epicUsername + "****!!!!!!!!**")
//   console.log("%%%%%%%%" + userid.data.account_id + '%%%%%%%%%')
//   db.user.update({
//       epicId: userid.data.account_id
//     }, { 
//       where: {
//       epicUsername: req.user.epicUsername
//     }
//   })
// })  
//db.user.find db.rival.find .user.
//  defaults: { epicId:rival.data.account_id }
// .then((userid) => {
// // console.log(userid.data.account_id)
// console.log('******&#&#&#&#'  +  account_id  + '******#&*#&#*')
// return axios.get(`https://fortniteapi.io/v1/stats?account=${userid.data.account_id}`, {
//   headers: {
//     Authorization: apikey
//   }
// })
// .then((stats) => {
// console.log('*****' + stats.data.global_stats.squad.placetop1  + '******')
// console.log("******" +  response + "*****")



//     })
//     .catch((error) => {
//       // handle error
//       console.log(error)
//     })

// // })

// })


//req.queary 
router.get('/rival', (req, res) => {
  // console.log("body: %j", req.body)
  // console.log('$$%$%$' + req.body + '^&$^&$^&')
  axios.get(`https://fortniteapi.io/v1/lookup?username=${req.query.rivalepicUsername}`, {
    headers: {
      Authorization: apikey
    }
  })
    .then((rival) => {
      console.log("%%%%%%%%" + rival.data.account_id + '%%%%%%%%%')
      db.rival.findOrCreate({
        where: {
          epicUsername: req.query.rivalepicUsername,
          epicId: rival.data.account_id
        },


        //  defaults: { epicId:rival.data.account_id }
      }).then(([rival, wasCreated]) => {
        // db.user.findOne({
        //   where: {id: req.user.id}

        // }).then(user => {
        //     user.addRival(rival)
        //     .then(() => {
        //       res.send(user)
        //     })
        // })


        // console.log('$$$$$$$' + "body: %j", req.body)
        return axios.get(`https://fortniteapi.io/v1/stats?account=${rival.epicId}`, {
          headers: {
            Authorization: apikey
          }

        })
          .then((rivalStats) => {
            console.log('****' + rivalStats.data.global_stats.squad.placetop1 + "****")
            res.render('fortnite/rival', { rivalStats: rivalStats.data })
            // res.render('/fortnite/rival', {rivalStats: rivalStats.data})
          })
      })

    }).catch(err => {
      console.log(err)
    })
})

router.get('/addrival', (req, res) => {
  res.render('fortnite/addrival')
})


router.get('/compare', (req, res) => {

})

router.get('/compare', (req, res) => {

  console.log('$$$$$$$$$' + req.user.epicId + '********')
  axios.get(`https://fortniteapi.io/v1/stats?account=${req.user.epicId}`, {
    headers: {
      Authorization: apikey
    }
  }).then((stats) => {
 
  }).then((rivalStats) => {
    return axios.get(`https://fortniteapi.io/v1/stats?account=${req.user.epicId}`, {
      headers: {
        Authorization: apikey
      }
    })
  }).then((bothstats) => {
    res.render('fortnite/compare', { bothstats: stats, rivalStats })
  })
})

module.exports = router