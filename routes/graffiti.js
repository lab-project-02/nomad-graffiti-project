const router = require("express").Router();
const uploader = require('../config/cloudinary');
const Graffiti = require('../models/Graffiti')

router.get('/users/profile', (req, res, next) => {
	// this only displays the graffitis of the logged in user
	Graffiti.find({ owner: req.user._id })
		.then(graffitis => {
			res.render('users/profile', { graffitis })
		})
		.catch(err => next(err))
});

router.get('/graffiti/add', (req, res, next) => {
    res.render('graffiti/add')
});


router.post('/graffiti/add', uploader.single('image'), (req, res, next) => {
    // this is where express / multer adds the info about the uploaded file
    const { title, description } = req.body
    const imgName = req.file.originalname
    Graffiti.create({ owner: req.session.user, title, description, imgName, imageUrl: req.file.path })
    .then(newlyCreatedGraffitiFromDB => {
      console.log(newlyCreatedGraffitiFromDB);
	  res.redirect('/auth/users/profile')
    })
    .catch(err => next(err))
});

router.get('/graffiti/:id/delete', (req, res, next) => {
	// if you are an admin you can delete any room
	// if you are a user you can only delete the rooms
	// that you have created
	const graffitiId = req.params.id
	const query = { _id: graffitiId }
	if (req.session.role === 'user') {
		query.owner = req.user._id
	}

	Graffiti.findOneAndDelete(query)
		.then(() => {
			res.redirect('/auth/users/profile')
		})
		.catch(err => next(err))
});

module.exports = router;