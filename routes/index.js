const router = require("express").Router();
const uploader = require('../config/cloudinary');
const Graffiti = require("../models/Graffiti");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
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

router.get('/graffiti/add', (req, res, next) => {
  res.render('graffiti-add')
});

router.post('/add', uploader.single('image'), (req, res, next) => {
  // this is where express / multer adds the info about the uploaded file
  console.log(req.file)
  const { title, description } = req.body
  const imgName = req.file.originalname
  const imgPath = req.file.path
  Graffiti.create({ title, description, imgName, imgPath })
    .then(movie => {
      console.log(movie)
      res.redirect('/')
    })
    .catch(err => next(err))
});

// router.get('/movie/delete/:id', (req, res, next) => {
// });




// route to display profile page
router.get('/profile', (req, res, next) => {
  res.render('profile', { username: username })
})


module.exports = router;