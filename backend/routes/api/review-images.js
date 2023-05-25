const express = require('express');
const {Spot, User, Image, Booking} = require('../../db/models')
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.delete('/:imageId', async (req, res, next) => {
    const image = await Image.findByPk(req.params.imageId)
    if(image.imageableType !== 'Review'){
        next({
            status: 404,
            message: "Review image couldn't be found"
        })
    }
    await image.destroy()
    res.json({message: "Successfully deleted"})
})


module.exports = router;
