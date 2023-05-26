const express = require('express');
const {Spot, User, Image, Booking, Review} = require('../../db/models')
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const spot = require('../../db/models/spot');


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


let avgStarRating = Sequelize.fn('AVG', Sequelize.cast(Sequelize.col('Reviews.stars'), 'FLOAT'));

const spots = await Spot.findAll({
  group: 'Spot.id',
  where: filters,
  limit: parseInt(size),
  offset: (parseInt(page) - 1) * parseInt(size),
  include: {
    model: Review,
    attributes: [],
    duplicating: false,
    required: false,
  },
  attributes: [
    'id',
    'ownerId',
    'address',
    'city',
    'state',
    'lat',
    'lng',
    'name',
    'description',
    'price',
    'createdAt',
    'updatedAt',
    [avgStarRating, 'avgStarRating'],
    'previewImg'
  ],
})
return res.json({
  Spots: spots,
  page: page,
  size: size
  })
})


// GET all spots owned by the current user.
router.get('/current', requireAuth ,async (req, res, next) => {
  const user = req.user
  let avgStarRating = Sequelize.fn('AVG', Sequelize.cast(Sequelize.col('Reviews.stars'), 'FLOAT'));
  const spots = await Spot.findAll({
    group: 'Spot.id',
    where: {ownerId: user.id},
    include: {
      model: Review,
      attributes: [],
      duplicating: false,
      required: false,
    },
    attributes: [
      'id',
      'ownerId',
      'address',
      'city',
      'state',
      'lat',
      'lng',
      'name',
      'description',
      'price',
      'createdAt',
      'updatedAt',
      [avgStarRating, 'avgStarRating'],
      'previewImg'
    ],
  })
  res.json({Spots: spots})
})

// GET spot details by ID
// needs numReviews, and avgStarRating in spot data
router.get('/:spotId', async (req, res, next) => {

const numReviews = Sequelize.fn('COUNT', Sequelize.cast(Sequelize.col('Reviews.stars'), 'FLOAT'));
const avgStarRating = Sequelize.fn('AVG', Sequelize.cast(Sequelize.col('Reviews.stars'), 'FLOAT'));

let spotId = parseInt(req.params.spotId)

const spot = await Spot.findOne({
  where: {id: spotId},
  include: [
    {

        model: Image, as: 'SpotImages',
        attributes: [
          'id',
          'url',
          'preview'
        ]
      },
      {
        model: Review,
        attributes: [],
        duplicating: false,
        required: false,
      },
      {
        model: User,
        as: 'Owner',
        attributes: [
          'id',
          'firstName',
          'lastName'
        ],
      },
    ],
    attributes: [
      'id',
      'ownerId',
      'address',
      'city',
      'state',
      'lat',
      'lng',
      'name',
      'description',
      'price',
      'createdAt',
      'updatedAt',
      [numReviews, 'numReviews'],
      [avgStarRating, 'avgStarRating'],
    ],
    group: ['Spot.id', 'Owner.id', 'SpotImages.id'],
})
if(!spot){
res.status(404).json({message: "Spot couldn't be found"})
}
res.json(spot)
})

// POST a new Spot under logged in User
router.post('/', validateSpot, requireAuth, async (req, res, next) => {
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


res.status(201).json({
  id: newSpot.id,
  ownerId: newSpot.ownerId,
  address: newSpot.address,
  city: newSpot.city,
  state: newSpot.state,
  country: newSpot.country,
  lat: newSpot.lat,
  lng: newSpot.lng,
  name: newSpot.name,
  description: newSpot.description,
  price: newSpot.price,
  createdAt: newSpot.createdAt,
  updatedAt: newSpot.updatedAt,
})
    } catch(err){
        next({
            status: 400,
            message: err.message
        })
    }
})


// Post an image for a spot, by spot ID
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const imageableId = parseInt(req.params.spotId);
    const spot = await Spot.findByPk(req.params.spotId)
    const user = req.user
    if(!spot){
        next({
            status: 404,
            message: "Spot couldn't be found"
        })
        return
    }
    if(spot.ownerId !== user.id){
      next({
        status: 403,
        message: "Forbidden"
      })
      return
    }
    const imageableType = 'Spot'
    const {url, preview} = req.body
    const newImage = await Image.create({
        imageableId,
        imageableType,
        url,
        preview
    })
    if(newImage.preview === true){
      spot.update({
        previewImg: newImage.url
      })
    }
    res.json({
      id: newImage.id,
      url: newImage.url,
      preview: newImage.preview

    })

})

// edit a spot by spotId
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
const {address, city, state, country, lat, lng, name, description, price} = req.body;
const spot = await Spot.findByPk(req.params.spotId);
if(!spot){
  next({
      status: 404,
      message: "Spot couldn't be found"
  })
  return
}
const user = req.user
if(spot.ownerId !== user.id){
  next({
    status: 403,
    message: "Forbidden"
  })
  return
}

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
res.json({
  id: spot.id,
  ownerId: spot.ownerId,
  address: spot.address,
  city: spot.city,
  state: spot.state,
  country: spot.country,
  lat: spot.lat,
  lng: spot.lng,
  name: spot.name,
  description: spot.description,
  price: spot.price,
  createdAt: spot.createdAt,
  updatedAt: spot.updatedAt
})
})

// DELETE spot by spotId
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const user = req.user
    if(!spot){
      next({
        status: 404,
        message: "Spot couldn't be found"
      })
      return
    }
    if(spot.ownerId !== user.id){
      next({
        status: 403,
        message: "Forbidden"
      })
      return
    }
    await spot.destroy()
    res.json({message: "Successfully deleted"})
})

// POST a review based on spotId
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
  const {review, stars} = req.body;
  const spotId = parseInt(req.params.spotId);
  const userId = req.user.id;
  const spot = await Spot.findByPk(spotId);
  const spotReview = await Review.findOne({where: {userId: userId, spotId: spotId}})

  if(spot.ownerId === req.user.id){
    res.status(403).json({message: "Forbidden"})
    return
  }
  if(!spot){
      res.status(404).json({message: "Spot couldn't be found"})
  }
  if(spotReview){
      res.status(500).json({message: "User already has a review for this spot"});
      return
  }
  const newReview = await Review.create({
      spotId,
      userId,
      review,
      stars
  })
res.status(201).json(newReview)
})


// GET all reviews by a spot's Id
router.get('/:spotId/reviews', async (req, res, next) => {
  const spot = req.params.spotId;
  const isThereASpot = await Spot.findByPk(spot);
  if(!isThereASpot){
      res.status(404).json({message: "Spot couldn't be found"})
  }
  const reviews = await Review.findAll({
    where: {spotId: spot},
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
    },
      {
        model: Image, as: 'ReviewImages',
        attributes: ['id', 'url']
    }
    ]

  });
  res.json({Reviews: reviews})
});


// POST a booking for a spot based on the spot's ID
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const {startDate, endDate} = req.body;
  const spotId = parseInt(req.params.spotId);
  const user = req.user
  const bookings = await Booking.findAll({where: {spotId: spotId}})
  const spot = await Spot.findByPk(spotId)
  if(!spot){
    next({
      status: 404,
      message: "Spot couldn't be found"
    })
    return
  }
  const errors = {}
  if(spot.ownerId === user.id){
    next({
      status: 403,
      message: "Forbidden"
    })
    return
  }
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
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId)
  const user = req.user
  if(!spot){
      next({
          status: 404,
          message: "Spot couldn't be found"
      })
  } else if (spot.ownerId === user.id){
      const userBookings = await Booking.findAll({
        where: {spotId: req.params.spotId},
          attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
          include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName'],
          },

      })
      const formattedUserBookings = userBookings.map((booking) => ({
        User: {
          id: booking.User.id,
          firstName: booking.User.firstName,
          lastName: booking.User.lastName,
        },
        id: booking.id,
        spotId: booking.spotId,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      }));

      res.json({Bookings: formattedUserBookings})
  } else {
    const bookings = await Booking.findAll({
      where: { spotId: req.params.spotId },
      attributes: ['spotId', 'startDate', 'endDate'],
    });
  res.json({Bookings: bookings})
  }
})

module.exports = router;
