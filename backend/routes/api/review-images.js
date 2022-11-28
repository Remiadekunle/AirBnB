const express = require('express')
const { setTokenCookie, requireAuth, restoreUser, requireProperAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { response } = require('../../app');
const router = express.Router();


router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const {user} = req;

    const id = req.params.imageId;

    const image = await ReviewImage.findOne({
        where: {
            id
        },
        include: [
            {
                model: Review
            }
        ]
    })

    if (!image){
        const err = new Error("Review Image couldn\'t be found")
        err.status = 404;
        return next(err)
    };


    if (image.Review.userId !== user.id){
        requireProperAuth(req, res, next);
    };


    await image.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
});


module.exports = router;
