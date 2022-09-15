const router = require("express").Router();
const uploader = require('../config/cloudinary');
const Graffiti = require("../models/Graffiti");

/* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

/* GET route to retrieve and display all graffiti */ 
router.get("/", (req, res, next) => {
  Graffiti.find()
          .then(allGraffitis => {
            console.log('Retrieved books from DB:', allGraffitis);
            res.render('index.hbs', { graffitis: allGraffitis });
          })  
          .catch(error => {
            console.log('Error while getting the graffiti from the DB: ', error);
            next(error);
          });
});

router.get('/graffiti/map', (req, res, next) => {
  res.render('graffiti/map')
});

module.exports = router;