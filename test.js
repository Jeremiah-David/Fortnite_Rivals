
// const FortniteAPI = require("fortnite-api-io")

// const fortniteAPI = new FortniteAPI("5779a9fa-9ec1cf1c-8b20e9f9-06b1cd72")
const axios = require('axios');
require('dotenv').config() 

// let config = {
//   headers: {
//     header1: '5779a9fa-9ec1cf1c-8b20e9f9-06b1cd72',
//   }
// }
jeremiah = '19d8439850d54e9db515ce8019ea90ae'
let apikey = process.env.API_KEY
username = 'DaddyMcMurder'
let epicId
// // Make a request for a user with a given ID
axios.get(`https://fortniteapi.io/v1/lookup?username=${username}`, {
  headers: {
    Authorization: apikey
  }
})
  .then ((response) => {
    // console.log(response.data.account_id)
    return axios.get(`https://fortniteapi.io/v1/stats?account=${response.data.account_id}`, {
      headers: {
        Authorization: apikey
      }
  })
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    // handle error
    console.log(error)
  })
})
