const router = require("express").Router();
const uploader = require('../config/cloudinary');
const Graffiti = require('../models/Graffiti')

router.get('/graffiti/add', (req, res, next) => {
    res.render('graffiti/add')
});

router.post('/graffiti/add', uploader.single('image'), (req, res, next) => {
    // this is where express / multer adds the info about the uploaded file
    const { photographer, hashtags, title, description, location } = req.body
    const imgName = req.file.originalname
    Graffiti.create({ owner: req.session.user, photographer, hashtags ,title, description, location, imgName, imageUrl: req.file.path })
    .then(newlyCreatedGraffitiFromDB => {
      console.log(newlyCreatedGraffitiFromDB);
	  res.redirect('/auth/users/profile')
    })
    .catch(err => next(err))
});

router.get('/graffiti/:id/edit', (req, res, next) => {
	Graffiti.findById(req.params.id)
		.then(graffitiFromDB => {
			console.log(graffitiFromDB);
			res.render('graffiti/edit', { graffiti: graffitiFromDB })
		})
		.catch(err => next(err))
});

router.post('/graffiti/:id/edit', (req, res, next) => {
	const { photographer, hashtags, title, description, location  } = req.body
	Graffiti.findByIdAndUpdate(req.params.id, {
		photographer,
		hashtags,
		title,
		description,
		location
	})
		.then(() => {
			res.redirect('/auth/users/profile')
		})
		.catch(err => next(err))
});

router.get('/graffiti/:id/delete', (req, res, next) => {
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