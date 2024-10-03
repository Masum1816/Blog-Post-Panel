const express = require('express');
const router = express.Router();
const controllers = require('../Controllers/Controllers');
const passport = require('../configFile/passport');
const blogController = require('../Controllers/blogController');
const upload = require('../configFile/multer');

router.get('/', controllers.DefaultController);
router.get('/logIn', controllers.LogInController);
router.get('/signUp', controllers.SignUpController);
router.post('/logIn',passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }), controllers.LogInController);
router.post('/signUp', controllers.SignUpController);
router.get('/logOut', controllers.LogOutController);
router.get('/profile', controllers.ProfilePageController);

router.get('/blog', blogController.DefaultBlogController);
router.get('/blogForm', blogController.AddBlogFormController)
router.post('/addBlog', upload.single('image'), blogController.AddBlogController);
router.get('/editBlog/:id', blogController.EditBlogController);
router.post('/updateBlog/:id', upload.single('image'), blogController.UpdateBlogController);
router.get('/deleteBlog/:id', blogController.DeleteBlogController);
router.get('/allBlogs', blogController.AllBlogsController);

module.exports = router;
