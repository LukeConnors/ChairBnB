const router = require('express').Router();
const { setTokenCookie } = require('../../utils/auth.js');
const {Spot, User, Image, Review} = require('../../db/models')
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js')
const spotsRouter = require('./spots.js')
const reviewsRouter = require('./reviews.js')

router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter)
router.use('/spots', spotsRouter)
router.use('/reviews', reviewsRouter)

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });


  // GET /api/set-token-cookie
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});


// GET /api/restore-user

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);


// GET /api/require-auth
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

// Provide all of the reviews the logged in user has written.
router.get('/profile/reviews', async (req, res, next) => {
  const user = req.user.id
  const reviews = await Review.findAll({where: {userId: user}})
  res.json(reviews)
})


module.exports = router;
