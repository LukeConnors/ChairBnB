const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
     check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('First Name is required'),
     check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Last Name is required'),
      check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Invalid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Username is required, must be at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password is required, must be 6 characters or more.'),
    handleValidationErrors
  ];

  // GET the current User
  router.get('/current', requireAuth, async (req, res, next) => {
    const user = req.user
    if(!user){
   res.json({user: null})
   return
    }
    const thisUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    }
    res.json({user: thisUser})
  })



// Sign up
router.post('/', validateSignup, async (req, res, next) => {
      const { firstName, lastName, email, password, username } = req.body;
      const sameEmail = await User.findOne({where: {email: email}})
      const sameUsername = await User.findOne({where: {username: username}})
      if(sameEmail){
        next({
          status: 500,
          message: "User already exists",
          errors: {
            email: "User with that email already exists"
          }
        })
        return
      }
      if(sameUsername){
        next({
          status: 500,
          message: "User already exists",
          errors: {
            email: "User with that username already exists"
          }
        })
        return
      }
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ firstName, lastName, email, username, hashedPassword });


      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
    });




module.exports = router;
