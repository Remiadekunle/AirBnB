const express = require('express')
const { setTokenCookie, requireAuth, restoreUser, requireProperAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { response } = require('../../app');
const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {
    const {user} = req;

    const bookings = await Booking.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: SpotImage,
                    where: {
                        preview: true
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'id', 'spotId']
                    },
                }
            }
        ]
    })
    const newBookings = []


    for (let i = 0; i < bookings.length; i++){
        let booking = bookings[9]
        booking = booking.toJSON();

        let image = await SpotImage.findOne({
            where: {
                spotId: booking.spotId,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id', 'spotId', 'preview']
            },
        })
        console.log(image)
        booking.Spot.previewImage = image.url
        
        delete booking.Spot.SpotImages
        newBookings.push(booking)
    }

    res.json({
        newBookings
    })
})


module.exports = router;
