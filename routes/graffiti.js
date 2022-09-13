const router = require("express").Router();
const uploader = require('../config/cloudinary');
const Graffiti = require('../models/Graffiti')

router.get('/graffiti/add', (req, res, next) => {
    res.render('graffiti/add')
});

router.post('/graffiti/add', uploader.single('image'), (req, res, next) => {
    // this is where express / multer adds the info about the uploaded file
    // console.log(req.file)
    const { title, description } = req.body
    const imgName = req.file.originalname
    const imgPath = req.file.path
    Graffiti.create({ title, description, imgName, imgPath })
      .then(newGraffiti => {
        // console.log(newGraffiti)
        res.redirect('../views/users/profile.hbs')
      })
      .catch(err => next(err))
});

module.exports = router;