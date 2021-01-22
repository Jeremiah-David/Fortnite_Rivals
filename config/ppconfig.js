const passport = require('passport')
const db = require('../models')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')

// ----------------------> Serialization<----------


//tell passport to seralize the user using
// the id by passit it on the callback

passport.serializeUser((user, doneCallback) => {
    console.log('serializing the user...')
    doneCallback(null, user.id)
})

// tells password to deserilize by looking up in database based on id

passport.deserializeUser((id, doneCallback)=> {
    db.user.findByPk(id)
    .then(foundUser=>{
        console.log('deserializing user...')
        doneCallback(null, foundUser)
    })
    .catch(err=>{
        console.log('Error deserialiing user')
    })
})


// -------------------->strategy set up <----------------

const findAndLogInUser = (email, password, doneCallback) =>{
    // tell pp how to check our user is legit
    db.user.findOne({where: {email:email}})
    .then(async foundUser=> {
        let match
        if(foundUser) {
            match = await foundUser.validPassword(password)
        }
        if(!foundUser || !match) { // there's something funky about user
        console.log('password was not validated match was false')
            return doneCallback(null, false)
        } else {
            return doneCallback(null, foundUser)
        }
    })
    .catch(err=>doneCallback(err))
}
/* think of doneCallbaclk as a function that looks lijke this:
login(error, usertobe loggedin {
    we porivde null for no error or false for
    no user or password invaled
    })
    */
const fieldsToCheck = {
    usernameField: 'email',
    passwordField: 'password'
}

// Creat an istance of local strategy
// constr arg 1 
// object to refefer to two fields 
// constructor arg 2
// a callback that is readty to reeive the two fields

const strategy = new LocalStrategy(fieldsToCheck, findAndLogInUser) 


passport.use(strategy)

module.exports = passport