const router = require("express").Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const { response, request } = require("express");

router.get('/signup', (req, res, next) => {
    res.render('signup')
});

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body
    // validation
    if (password.length < 4) {
        res.render('signup', { message: 'Password has to be min 4 chars' })
        return
    }
    // check if username is not empty
    if (username === '') {
        res.render('signup', { message: 'Username cannot be empty' })
        return
    }
    // validation passed
    // check if the username is already used
    User.findOne({ username: username })
        .then(usernameFromDB => {
            if (userFromDB !== null) {
                res.render('signup', { message: 'Your username is already taken' })
            } else {
                // we can use that username, hash the password
                const sale = bcrypt.genSaltSync()
                const hash = bcrypt.hashSync(password, salt)
                // create the user
                User.create({ username: username, password: hash})
                    .then(createdUser => {
                        res.redirect('/auth/login')
                    })
                    .catch(err => {
                        next(err)
                    })
            }
        })

});

router.get('/login', (req, res, next) => {
    res.render('login')
});

router.post('/login', (req, res, next) => {
    User.findOne({ username: username })
        .then(userFromDB => {
            if (userFromDB === null) {
                // username is not correct -> show the login form again
                res.render('login', { message: 'Wrong credentials' })
                return
            }
            // username is correct
            // check if the password from the input form matches the hash from the db
            if (bcrypt.compareSync(password, userFromDB.password)) {
                // the password is correct -> the user can be logged in
                // req.session is an object provided to us by 'express-session'
                // this is how we log the user in:
                req.session.user = userFromDB
                response.redirect('/profile')
            } else {
                res.render('login', { message: 'Wrong credentials' })
                return
            }
        })
});

router.get('/logout', (req, res, next) => {
    // this function is used to log the user out
    req.session.destroy()
    res.redirect('/')
});

module.exports = router;