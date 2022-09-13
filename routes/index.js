const router = require("express").Router();
const uploader = require('../config/cloudinary');
const Graffiti = require("../models/Graffiti");

/* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

router.get('/users/profile', (req, res, next) => {
  // retrieve the logged in user
  const loggedInUser = req.user
  res.render('users/profile', { user: loggedInUser })
});

/* GET home page with graffiti images */ 
router.get("/", (req, res, next) => {
  Graffiti.find()
    .then(graffitis => {
      res.render('index', { graffitis })
    })
    .catch(err => {
      next(err)
    })
});


// route to display profile page
router.get('/users/profile', (req, res, next) => {
  res.render('users/profile', { username: username })
})


module.exports = router;