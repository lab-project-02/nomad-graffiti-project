const router = require("express").Router();
const uploader = require('../config/cloudinary');
const Graffiti = require('../models/Graffiti')

router.get('/graffiti/add', (req, res, next) => {
    res.render('graffiti/add')
});

router.post('/graffiti/add', uploader.single('image'), (req, res, next) => {
    // this is where express / multer adds the info about the uploaded file
    const { photographer, title, description, location } = req.body
    const imgName = req.file.originalname
    Graffiti.create({ owner: req.session.user, location, photographer, title, description, imgName, imageUrl: req.file.path })
    .then(newlyCreatedGraffitiFromDB => {
      console.log(newlyCreatedGraffitiFromDB);
	  res.redirect('/auth/users/profile')
    })
    .catch(err => next(err))
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

router.get('/graffiti/:id/edit', (req, res, next) => {
	Graffiti.findById(req.params.id)
		.then(graffitiFromDB => {
			console.log(graffitiFromDB);
			res.render('graffiti/edit', { graffiti: graffitiFromDB })
		})
		.catch(err => next(err))
});

router.post('/graffiti/:id/edit', (req, res, next) => {
	const { photographer, title, description  } = req.body
	Graffiti.findByIdAndUpdate(req.params.id, {
		photographer,
		title,
		description
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