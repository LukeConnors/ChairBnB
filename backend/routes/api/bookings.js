const express = require('express');
const {Spot, User, Image, Booking} = require('../../db/models')
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { where } = require('sequelize');
const { requireAuth } = require('../../utils/auth');

const validateBooking = [
    check('endDate')
      .exists({ checkFalsy: true })
      .isDate()
      .withMessage('End date cannot be on or before startDate'),
    handleValidationErrors
  ];

// GET all of the current user's bookings
router.get('/current', requireAuth, async (req, res, next) => {
  const user = req.user
    const bookings = await Booking.findAll({
      where: {userId: user.id},
        include: [Spot],
      });

      const formattedBookings = bookings.map((booking) => {
        return {
          id: booking.id,
          spotId: booking.spotId,
          Spot: {
            id: booking.Spot.id,
            ownerId: booking.Spot.ownerId,
            address: booking.Spot.address,
            city: booking.Spot.city,
            state: booking.Spot.state,
            country: booking.Spot.country,
            lat: booking.Spot.lat,
            lng: booking.Spot.lng,
            name: booking.Spot.name,
            price: booking.Spot.price,
            previewImg: booking.Spot.previewImg,
          },
          userId: booking.userId,
          startDate: booking.startDate,
          endDate: booking.endDate,
          createdAt: booking.createdAt,
          updatedAt: booking.updatedAt,
        };
      });

      res.json({ Bookings: formattedBookings });
    })

    // PATCH a booking by bookingId (Edit a booking)
router.put('/:bookingId', requireAuth, async (req, res, next) => {
const { startDate, endDate } = req.body;
const user = req.user;
const booking = await Booking.findByPk(req.params.bookingId);
const errors = {};

if (endDate <= startDate) {
  errors.endDate = "endDate cannot be on or before startDate";
  return res.status(400).json({ message: "Bad Request", errors: errors });
}

if (!booking) {
  return next({
    status: 404,
    message: "Booking couldn't be found",
  });
}

if (user.id !== booking.userId) {
  return next({
    status: 403,
    message: "Forbidden",
  });
}

const bookings = await Booking.findAll({
  where: { spotId: booking.spotId },
});

const bookingEndDate = new Date(booking.endDate);
const today = new Date();
if (bookingEndDate < today) {
  return next({
    status: 403,
    message: "Past bookings can't be modified",
  });
}


if (endDate < booking.startDate) {
  errors.endDate = "endDate cannot come before startDate";
}

for (let i = 0; i < bookings.length; i++) {
  let booked = bookings[i];

  if (booked.id !== booking.id) {
    if (startDate >= booked.startDate && startDate <= booked.endDate) {
      errors.startDate = "Start date conflicts with an existing booking";
    }

    if (endDate >= booked.startDate && endDate <= booked.endDate) {
      errors.endDate = "End date conflicts with an existing booking";
    }

    if (
      startDate <= booked.startDate &&
      endDate >= booked.endDate &&
      !errors.startDate &&
      !errors.endDate
    ) {
      errors.conflict =
        "There is already an existing booking within your selected date range, please select a new start or end date.";
    }
  }
}

if (Object.keys(errors).length === 0) {
  await booking.update({
    startDate,
    endDate,
  });
  res.json(booking);
} else {
  const errorResponse = {
    message: "Sorry, this spot is already booked for the specified dates",
    errors: {},
  };

  if (errors.startDate) {
    errorResponse.errors.startDate = errors.startDate;
  }

  if (errors.endDate) {
    errorResponse.errors.endDate = errors.endDate;
  }

  if (errors.conflict) {
    errorResponse.errors.conflict = errors.conflict;
  }

  res.json(errorResponse);
}
});

// DELETE a booking by bookingId
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    const user = req.user;
    if (!booking) {
      next({
        status: 404,
        message: "Booking couldn't be found"
      });
      return;
    }
    if (booking.userId !== user.id) {
      next({
        status: 403,
        message: "Forbidden"
      });
      return;
    }
    const bookingStartDate = new Date(booking.startDate);
    const bookingEndDate = new Date(booking.endDate);
    const today = new Date();

    if (bookingStartDate < today && bookingEndDate > today) {
      next({
        status: 403,
        message: "Bookings that have been started can't be deleted"
      });
      return;
    }
    await booking.destroy();
    res.json({ message: "Successfully deleted" });
  });







  module.exports = router;
