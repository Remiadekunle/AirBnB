const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: SpotImage,
                where: {
                    preview: true
                },
                attributes: {
                    exclude: ['id', 'spotId', 'createdAt', 'updatedAt']
                }
            },
            {
                model: Review,
            }
        ]
    })
    const Spots = [];
    spots.forEach(spot => {
        const newSpot = spot.toJSON();
        Spots.push(newSpot)
    })
    Spots.forEach((spot) => {
        spot.SpotImages.forEach( (image) => {
            if (image.preview === true){
                spot.previewImage = image.url
            }
        })
        delete spot.SpotImages
        let scores = 0
        spot.Reviews.forEach(review => {
            scores += review.stars
        })
        const stars = scores/spot.Reviews.length
        spot.avgRating = stars
        delete spot.Reviews
    })

    return res.json({
        Spots
    })
})

router.get('/current', restoreUser, async (req, res) => {
    const { user } = req;
    const where = {}
    if (user){
        where.id = user.id
    }
    const spots = await Spot.findAll({
        where,
        include: [
            {
                model: SpotImage,
                where: {
                    preview: true
                },
                attributes: {
                    exclude: ['id', 'spotId', 'createdAt', 'updatedAt']
                }
            },
            {
                model: Review,
            }
        ]
    })
    const Spots = [];
    spots.forEach(spot => {
        const newSpot = spot.toJSON();
        Spots.push(newSpot)
    })
    Spots.forEach((spot) => {
        spot.SpotImages.forEach( (image) => {
            if (image.preview === true){
                spot.previewImage = image.url
            }
        })
        delete spot.SpotImages
        let scores = 0
        spot.Reviews.forEach(review => {
            scores += review.stars
        })
        const stars = scores/spot.Reviews.length
        spot.avgRating = stars
        delete spot.Reviews
    })
    return res.json({
        Spots
    })
})

router.get('/:spotId', async(req, res, next) => {
    const id = req.params.spotId
    const spot = await Spot.findOne({
        where: {
            id
        },
        include: [
            {
                model: Review,
            },
            {
                model: SpotImage,
                attributes: {
                    exclude: ['spotId', 'createdAt', 'updatedAt']
                }
            },
            {
                model: User,
                attributes: {
                    exclude: ['username', 'hashedPassword', 'createdAt', 'updatedAt', 'email']
                }
            }
        ]
    })

    if (!spot) {
        const err = new Error('Spot couldn\'t be found');
        err.statusCode = 404;
        err.message = 'Spot couldn\'t be found';
        return next(err);
    }
    const newSpot = spot.toJSON();
    newSpot.numReviews = newSpot.Reviews.length
    let scores = 0
    newSpot.Reviews.forEach(review => {
        scores += review.stars
    })
    const stars = scores/spot.Reviews.length
    newSpot.avgRating = stars
    delete newSpot.Reviews
    newSpot.Owner = newSpot.User
    delete newSpot.User


    return res.json(newSpot)
})

module.exports = router;
