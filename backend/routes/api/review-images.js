const express = require('express');
const {Spot, User, Image, Booking} = require('../../db/models')
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const image = await Image.findByPk(req.params.imageId);
    const user = req.user;
    if(image.imageableType === 'Review'){
        const spot = await Spot.findByPk(image.imageableId)
        if(spot.ownerId !== user.id){
            next({
                status: 403,
                message: "Forbidden"
            })
            return
        }
    }
    if(!image){
        next({
            status: 404,
            message: "Review image couldn't be found"
        })
    }
    if(image.imageableType !== 'Review'){
        next({
            status: 400,
            message: "The image you are trying to delete does not belong to the Review!"
        })
        return
    }
    await image.destroy()
    res.json({message: "Successfully deleted"})
})


module.exports = router;
