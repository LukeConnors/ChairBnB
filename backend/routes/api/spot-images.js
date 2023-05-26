const express = require('express');
const {Spot, User, Image, Booking} = require('../../db/models')
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const image = await Image.findByPk(req.params.imageId)
    if(!image){
        next({
            status: 404,
            message: "Spot image couldn't be found"
        })
        return
    }
    const user = req.user
    const spot = await Spot.findByPk(image.imageableId)
    if(image.imageableType === 'Spot'){
        if(spot.ownerId !== user.id){
            next({
                status: 403,
                message: "Forbidden"
            })
            return
        }
    }
    if(image.imageableType !== 'Spot'){
        next({
            status: 400,
            message: "The image you are trying to delete does not belong to a Spot!"
        })
        return
    }
    await image.destroy()
    res.json({message: "Successfully deleted"})
})

module.exports = router;
