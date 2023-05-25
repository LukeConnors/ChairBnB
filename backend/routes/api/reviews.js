const express = require('express');
const {Spot, User, Image, Review} = require('../../db/models')
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const validateReview = [
    check('review')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Review text is required.'),
    check('stars')
      .exists({ checkFalsy: true })
      .isInt({min: 1, max: 5})
      .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ];

  // GET all of the reviews the logged in user has written.
router.get('/current', requireAuth, async (req, res, next) => {
  const user = req.user.id
  const reviews = await Review.findAll({
    where: {userId: user},
    include: [
    {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
    },
    {
        model: Spot,
        attributes: [
            'id',
            'ownerId',
            'address',
            'city',
            'state',
            'country',
            'lat',
            'lng',
            'name',
            'price',
            'previewImg'
        ]
    },
    {
        model: Image, as: 'ReviewImages',
        attributes: ['id', 'url']
    }
]

})
  res.json({Reviews: reviews})
})


//   POST an image to a review based on reviewId
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const reviewId = parseInt(req.params.reviewId)
    const user = req.user;
    const review = await Review.findByPk(reviewId);
    if(!review){
        next({
            status: 404,
            message: "Review couldn't be found"
            })
    }
    const imageableId = reviewId
    const imageCount = await Image.count({where: {imageableId: reviewId}})
    if(imageCount > 10){
        next({
        status: 403,
        message: "Maximum number of images for this resource was reached"
        })
        return
    }
    if(review.userId !== user.id){
        next({
            status: 403,
            message: "Forbidden"
        })
        return
    }

    const imageableType = 'Review'
    const {url} = req.body;
    const newImage = await Image.create({
        imageableId,
        imageableType,
        url
    })
    res.json({
        id: newImage.id,
        url: newImage.url
    })
})

// Edit a review by reviewId
router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
    const {review, stars} = req.body;
    const user = req.user
    const thisReview = await Review.findByPk(req.params.reviewId)
    if(!thisReview){
        next({
            status: 404,
            message: "Review couldn't be found"
            })
    }
    if(thisReview.userId !== user.id){
        next({
            status: 403,
            message: "Forbidden"
        })
    }
    await thisReview.update({
        review,
        stars
    })
    res.json(thisReview)
})

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);
    const user = req.user
    if(!review){
        next({
            status: 404,
            message: "Review couldn't be found"
        })
    }
    if(review.userId !== user.id){
        next({
            status: 403,
            message: "Forbidden"
        })
        return
    }

    await review.destroy()
    res.json({message: "Successfully deleted"})
})


  module.exports = router;
