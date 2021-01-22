module.exports = (req, res, next) => {
    if(!req.user) {
        req.flash('error', 'You must be logged in to ass that page')
        res.redirect('/auth/login')
    } else {
        next()
    }
}