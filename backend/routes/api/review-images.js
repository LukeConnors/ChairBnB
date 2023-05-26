const express = require('express');
const {Spot, User, Image, Booking, Review} = require('../../db/models')
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

router.delete('/:imageId', requireAuth, async (req, res, next) => {
//     const image = await Image.findByPk(req.params.imageId);
//     const user = req.user;
//     const review = await Review.findByPk(image.imageableId)
//     if(!image){
//         next({
//             status: 404,
//             message: "Review image couldn't be found"
//         })
//         return
//     }
//     if(review.userId !== user.id){
//         next({
//             status: 403,
//             message: "Forbidden"
//         })
//         return
//     }
//     if(image.imageableType !== 'Review'){
//         next({
//             status: 400,
//             message: "The image you are trying to delete does not belong to a Review!"
//         })
//         return
//     } else if(image.imageableType === 'Review'){
//         await image.destroy()
//         res.json({message: "Successfully deleted"})
//     }
// })
const image = await Image.findByPk(req.params.imageId)
const user = req.user
const review = await Review.findByPk(image.imageableId)
if(!image){
    next({
        status: 404,
        message: "Spot image couldn't be found"
    })
    return
}
if(image.imageableType === 'Review'){
    if(review.userId !== user.id){
        next({
            status: 403,
            message: "Forbidden"
        })
        return
    }
}
if(image.imageableType !== 'Review'){
    next({
        status: 400,
        message: "The image you are trying to delete does not belong to a Review!"
    })
    return
}
await image.destroy()
res.json({message: "Successfully deleted"})
})



module.exports = router;
