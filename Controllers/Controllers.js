const User = require('../Models/Schema');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const DefaultController = async (req, res) => {

    console.log("DEFAULT CONTROLLER");

    try{

        const users = await User.find();
        console.log("USERS : ", users);
        res.render('index', { users });

    }catch(err){

        console.error("ERROR : ", err);
        res.render('index');

    }

}

const LogInController = (req, res) => {

    console.log("LOGIN CONTROLLER");
    res.render('logIn');

};

const SignUpController = async (req, res) => {

    console.log("SIGNUP CONTROLLER");

    if(req.body.password === req.body.confirmPassword){

        try{

            const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

            const UserData = {
                name: req.body.name,
                email: req.body.email,
                password: hashPassword
            };

            const newUser = new User(UserData);
            await newUser.save();
            console.log("User Data:", UserData);
            res.redirect('/logIn');

        }catch(err){

            console.error("ERROR:", err);
            res.render('signUp', { message: 'An error occurred while signing up. Please try again.' });

        }

    }else{

        console.log("Passwords do not match");
        res.render('signUp', { message: 'Passwords do not match, please try again.' });

    }
};

const LogOutController = (req, res) => {

    console.log("LOGOUT CONTROLLER");

    req.logout(err => {
        if (err) {
          console.error('ERROR : ', err);
          res.redirect('/');
        }
        console.log('LOGGES OUT');
        res.redirect('/logIn');
      });

}

const ProfilePageController = async (req, res) => {

    console.log("PROFILE PAGE CONTROLLER");

    try{

        const users = await User.find();
        console.log("USERS : ", users);
        res.render('profilePage', { users });

    }catch(err){

        console.error("ERROR : ", err);
        res.render('index');

    }

}

module.exports = { DefaultController, LogInController, SignUpController, ProfilePageController, LogOutController };
