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
    const Bookings = []


    for (let i = 0; i < bookings.length; i++){
        let booking = bookings[i]
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
        Bookings.push(booking)
    }

    res.json({
        Bookings
    })
})

// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const {user} = req;

    const id = req.params.bookingId;

    const {startDate, endDate} = req.body;

    const booking = await Booking.findOne({
        where: {
            id
        }
    });

        if (!booking){
            const err = new Error("Booking couldn\'t be found")
            err.status = 404;
            return next(err)
        };

    if (user.id !== booking.userId){
        requireProperAuth(req, res, next);
    };

    if (endDate <= startDate){
        const err = new Error("endDate cannot come before startDate");
        err.status = 400;
        return next(err);
    };

    const current = new Date()

    if (booking.endDate < current){
        const err = new Error("Past bookings can't be modified");
        err.status = 403;
        return next(err);
    }
    const errors = {}

    booking.startDate = startDate;
    booking.endDate = endDate;

    const bookings = await Booking.findAll()

    for (let i = 0; i < bookings.length; i++){
        let bookingA = bookings[i];
        let bStart = bookingA.startDate.getTime();
        let bEnd = bookingA.endDate.getTime();

        const start = booking.startDate.getTime();
        const end = booking.endDate.getTime();

        if ((start >= bStart) && (start <= bEnd)){
            errors.startDate = "Start date conflicts with an existing booking";
            break
        }
        if ((end >= bStart) && (end <= bEnd)){
            errors.endDate = "End date conflicts with an existing booking";
            break
        }
    }

    if (Object.values(errors).length > 0){
        const err = new Error("Sorry, this spot is already booked for the specified dates");
        err.status = 403;
        err.errors = errors
        return next(err)
    }




    await booking.save();
    res.json(booking)
})


router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const {user} = req;

    const id = req.params.bookingId;

    const booking = await Booking.findOne({
        where: {
            id
        }
    });

    if (!booking){
        const err = new Error("Spot couldn\'t be found")
        err.status = 404;
        return next(err)
    };

    const spot = await Spot.findOne({
        where:{
            id: booking.spotId
        }
    });


    if ((user.id !== booking.userId) && (user.id !== spot.ownerId) ){
        requireProperAuth(req, res, next);
    };


    const current = new Date();

    if ((booking.startDate < current) && (booking.endDate > current)){
        const err = new Error("Bookings that have been started can't be deleted")
        err.status = 403;
        return next(err)
    }

    await booking.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })

})
module.exports = router;
