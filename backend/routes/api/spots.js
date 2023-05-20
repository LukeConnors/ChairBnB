const express = require('express');
const {Spot, User, Image} = require('../../db/models')
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


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


// GET all Spots
router.get('/', async (req, res, next) => {
const spots = await Spot.findAll()
return res.json(spots)
})

// GET all Spots by current User
router.get('/mySpots', async (req, res, next) => {
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

module.exports = router;
