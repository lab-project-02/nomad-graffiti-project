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
  
// GET route to retrieve and display details of a specific graffiti
router.get('/graffiti/:graffitiId', (req, res, next) => {
  const { graffitiId } = req.params;
  console.log('The ID from the URL is: ', graffitiId);
  Graffiti.findById(graffitiId)
          .populate('owner')
          .then(theGraffiti => res.render('graffiti/details.hbs', { graffiti: theGraffiti }))
          .catch(error => {
            console.log('Error while retrieving graffiti details: ', error);
            next(error);
          })  
});

module.exports = router;