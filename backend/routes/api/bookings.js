const express = require('express');
const {Spot, User, Image, Booking} = require('../../db/models')
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { where } = require('sequelize');
const booking = require('../../db/models/booking');

const validateBooking = [
    check('endDate')
      .exists({ checkFalsy: true })
      .isDate()
      .withMessage('End date cannot be on or before startDate'),
    handleValidationErrors
  ];

// GET all of the current user's bookings
router.get('/current', async (req, res, next) => {
    const user = req.user
    const bookings = await Booking.findAll({where: {userId: user.id}})
    res.json(bookings)
})

// PATCH a booking by bookingId
router.patch('/:bookingId', async (req, res, next) => {
    const {startDate, endDate} = req.body
    const booking = await Booking.findByPk(req.params.bookingId)
    if(!booking){
        next({
            status: 404,
            message: "Booking couldn't be found"
        })
    }
    const bookings = await Booking.findAll({where: {spotId: booking.spotId}})
    const today = new Date()
    const errors = {}
    if(Date(endDate) < today){
        next({
            status: 403,
            message: "Past bookings can't be modified"
        })
    }
    if(Date(booking.endDate) < Date(booking.startDate)){
        errors.endDate = "endDate cannot come before startDate"
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
                errors.conflict = "There is already an existing booking within your selected date range, please select a new start or end date."
                }
            }
        }

    if(Object.keys(errors).length === 0){
    await booking.update({
        startDate,
        endDate
    })
    res.json(bookings)
} else {
res.json({message: "Sorry this spot is already booked for the specified dates", errors: errors})
}
})

// DELETE a booking by bookingId
router.delete('/:bookingId', async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    const today = new Date()
    if(!booking){
        next({
            status: 404,
            message: "Booking couldn't be found"
        })
    }
    if(Date(booking.startDate) < today && Date(booking.endDate) > today){
        next({
            status: 403,
            message: "Bookings that have been started can't be deleted"
        })
    }
    await booking.destroy();
    res.json({message: "Successfully deleted"})
})







  module.exports = router;
