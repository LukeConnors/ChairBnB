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

// GET all reviews by a spot's Id
  router.get('/:spotId', async (req, res, next) => {
    const spot = req.params.spotId;
    const isThereASpot = await Spot.findByPk(spot);
    if(!isThereASpot){
        res.status(404).json({message: "Spot couldn't be found"})
    }
    const reviews = await Review.findAll({where: {spotId: spot}});
    res.json(reviews)
  });

// POST a review based on spotId
  router.post('/:spotId', validateReview, async (req, res, next) => {
    const {review, stars} = req.body;
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const isThereASpot = await Spot.findByPk(spotId);
    const spotReview = await Review.findOne({where: {userId: userId, spotId: spotId}})
    if(!isThereASpot){
        res.status(404).json({message: "Spot couldn't be found"})
    }
    if(spotReview){
        res.status(500).json({message: "User already has a review for this spot"})
    }
    const newReview = await Review.create({
        spotId,
        userId,
        review,
        stars
    })
res.json(newReview)
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
