const express = require('express')
const { setTokenCookie, requireAuth, restoreUser, requireProperAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { response } = require('../../app');
const router = express.Router();

router.get('/current', restoreUser,  async (req, res) =>  {
    const { user } = req;
    const where = {}
    if (user){
        where.id = user.id
    }
    console.log(user.id)
    const Reviews = await Review.findAll({
        where,
        include: [
            {
                model: User,
                attributes: {
                    exclude: ['username', 'hashedPassword', 'createdAt', 'updatedAt', 'email']
                }
            },
            {
                model: Spot,
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            },
            {
                model: ReviewImage,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "reviewId"]
                }
            }
        ]
    })

    return res.json({
        Reviews
    })
})

router.get('/:spotId/reviews', async (req, res, next) => {
    const id = req.params.spotId;
    const spot = await Spot.findOne({
        where: {
            id
        },
        include: [
            {
                model: User
            },
            {
                model: ReviewImage
            }
        ],

    })

    if (!spot){
        const err = new Error("Spot couldn\'t be found")
        err.status = 404;
        return next(err)
    }

    res.json(spot)
})


module.exports = router;
