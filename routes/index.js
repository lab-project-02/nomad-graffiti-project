const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


// route to display profile page
router.get('/profile', (req, res, next) => {
  res.render('profile', { username: username })
})


module.exports = router;