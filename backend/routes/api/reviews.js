const express = require('express');
const {Spot, User, Image, Review} = require('../../db/models')
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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
router.get('/reviews/current', async (req, res, next) => {
  const user = req.user.id
  const reviews = await Review.findAll({where: {userId: user}})
  res.json(reviews)
})


//   POST an image to a review based on reviewId
router.post('/:reviewId/images', async (req, res, next) => {
    const reviewId = req.params.reviewId
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
    }
    const imageableType = 'Review'
    const {url} = req.body;
    const newImage = await Image.create({
        imageableId,
        imageableType,
        url
    })
    res.json(newImage)
})

// Edit a review by reviewId
router.put('/:reviewId', validateReview, async (req, res, next) => {
    const {review, stars} = req.body;
    const thisReview = await Review.findByPk(req.params.reviewId)
    if(!thisReview){
        next({
            status: 404,
            message: "Review couldn't be found"
            })
    }
    await thisReview.update({
        review,
        stars
    })
    res.json(thisReview)
})

// Delete a Review
router.delete('/:reviewId', async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);
    if(!review){
        next({
            status: 404,
            message: "Review couldn't be found"
        })
    }
    await review.destroy()
    res.json(review)
})


  module.exports = router;
