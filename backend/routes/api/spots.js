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

module.exports = router;
