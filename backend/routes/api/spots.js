const express = require('express');
const {Spot, User, Image, Booking} = require('../../db/models')
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');


const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Street address is required.'),
    check('city')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('City is required.'),
    check('state')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('State is required.'),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isLength({ min: 4, max:  12})
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isLength({ min: 4, max:  12})
      .withMessage('Longitude is not valid'),
    check('name')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isLength({max: 50})
      .withMessage('Name must be less than 50 characters.'),
    check('description')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Description is required.'),
    check('price')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Price per day is required.'),
    handleValidationErrors
  ];


  const validateBooking = [
    check('endDate')
      .exists({ checkFalsy: true })
      .isDate()
      .isAfter('startDate')
      .withMessage('End date cannot be on or before startDate'),
    handleValidationErrors
  ];

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


// GET all Spots
router.get('/', async (req, res, next) => {
let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
const filters = {};

if(!page) page = 1
if(!size) size = 20

if (minLat) {
  filters.lat = { [Op.gte]: parseFloat(minLat) };
}
if (maxLat) {
  filters.lat = { ...filters.lat, [Op.lte]: parseFloat(maxLat) };
}

if (minLng) {
  filters.lng = { [Op.gte]: parseFloat(minLng) };
}
if (maxLng) {
  filters.lng = { ...filters.lng, [Op.lte]: parseFloat(maxLng) };
}
if (minPrice) {
  filters.price = { [Op.gte]: parseInt(minPrice) };
}
if (maxPrice) {
  filters.price = { ...filters.price, [Op.lte]: parseInt(maxPrice) };
}
const spots = await Spot.findAll({
  where: filters,
  limit: parseInt(size),
  offset: (parseInt(page) - 1) * parseInt(size)
})
return res.json(spots)
})

// GET all Spots by current User
router.get('/current', async (req, res, next) => {
const user = req.user
const spots = await Spot.findAll({where: {ownerId: user.id}})
res.json(spots)
})

// GET spot details by ID
router.get('/:spotId', async (req, res, next) => {
let spotId = req.params.spotId
const spot = await Spot.findOne({
    where: {id: spotId},
    include: [{model: Image}, {model: User}]
})
if(!spot){
res.status(404).json({message: "Spot couldn't be found"})
}
res.json(spot)
})

// POST a new Spot under logged in User
router.post('/', validateSpot, async (req, res, next) => {
    try{
const {address, city, state, country, lat, lng, name, description, price} = req.body
const ownerId = req.user.id

const newSpot = await Spot.create({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,

})
res.json(newSpot)
    } catch(err){
        next({
            status: 400,
            message: err.message
        })
    }
})


// Post an image for a spot, by spot ID
router.post('/:spotId/images', async (req, res, next) => {
    const imageableId = req.params.spotId;
    const spot = await Spot.findByPk(req.params.spotId)
    const {imageableType, url} = req.body
    if(!spot){
        next({
            status: 404,
            message: "Spot couldn't be found"
        })
    }
    const newImage = await spot.createImage({
        imageableId,
        imageableType,
        url
    })
    res.json(newImage)

})

// edit a spot by spotId
router.put('/:spotId', async (req, res, next) => {
const {address, city, state, country, lat, lng, name, description, price} = req.body;
const spot = await Spot.findByPk(req.params.spotId);

await spot.update({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
})
res.json(spot)
})

// DELETE spot by spotId
router.delete('/:spotId', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
        next({
            status: 404,
            message: "Spot couldn't be found"
        })
    }
    await spot.destroy()
    res.json(spot)
})

// POST a review based on spotId
router.post('/:spotId/reviews', validateReview, async (req, res, next) => {
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


// GET all reviews by a spot's Id
router.get('/:spotId/reviews', async (req, res, next) => {
  const spot = req.params.spotId;
  const isThereASpot = await Spot.findByPk(spot);
  if(!isThereASpot){
      res.status(404).json({message: "Spot couldn't be found"})
  }
  const reviews = await Review.findAll({where: {spotId: spot}});
  res.json(reviews)
});


// POST a booking for a spot based on the spot's ID
router.post('/:spotId/bookings', async (req, res, next) => {
  const {startDate, endDate} = req.body;
  const spotId = req.params.spotId;
  const bookings = await Booking.findAll({where: {spotId: spotId}})
  const errors = {}
  for(let i = 0; i < bookings.length; i++){
      let booked = bookings[i];

      if(booked.startDate <= startDate && startDate <= booked.endDate){
          errors.startDate = "Start date conflicts with an existing booking"
      }

      if (booked.startDate <= endDate && endDate <= booked.endDate){
          errors.endDate = "End date conflicts with an existing booking"
      }

      if(Object.keys(errors).length === 0){
          if(booked.startDate > startDate && endDate > booked.endDate){
              errors.conflict = "Either the start date, end date, or both conflicts with an existing booking"
          }
  }
  }
  if(Object.keys(errors).length === 0){
  const userId = req.user.id;
  const booking = await Booking.create({
      spotId,
      userId,
      startDate,
      endDate
  })
  res.json(booking)
  } else {
  res.status(403)
  res.json({message: "Sorry this spot is already booked for the specified dates", errors: errors})
  }
  });


  // GET all bookings for a Spot based on the Spot's ID
router.get('/:spotId/bookings', async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId)
  const user = req.user
  const bookings = await Booking.findAll({where: {spotId: req.params.spotId}})
  if(!spot){
      next({
          status: 404,
          message: "Spot couldn't be found"
      })
  } else if (spot.ownerId === req.user.id){
      const userBookings = await Booking.findAll({
          include: {model: User},
          where: {spotId: req.params.spotId}
      })
      res.json({Bookings: userBookings})
  } else {
  res.json({Bookings: bookings})
  }
})

module.exports = router;
