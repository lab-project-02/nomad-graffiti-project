const router = require("express").Router();
const Graffiti = require('../models/Graffiti')

router.get('/graffiti', (req, res, next) => {
    // display the graffiti of the logged in user
    Graffiti.find({ owner: req.user._id })
            .then(graffiti => {
                res.render('graffiti/index', { graffiti })
            })
            .catch(err => next(err))
});

router.get('/graffiti/add', (req, res, next) => {
    res.render('graffiti/add')
});

router.post('/graffiti', (req, res, next) => {
    const { name, owner } = req.body
    // create a graffiti
    const loggedInUser = req.user._id
    Graffiti.create({ name, owner: loggedInUser })
            .then(() => {
                res.redirect('/graffiti')
            })
            .catch(err => next(err))
});
    