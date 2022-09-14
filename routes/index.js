const router = require("express").Router();
const uploader = require('../config/cloudinary');
const Graffiti = require("../models/Graffiti");

/* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

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


module.exports = router;