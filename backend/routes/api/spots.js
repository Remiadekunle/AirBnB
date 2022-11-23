const express = require('express')
const { setTokenCookie, requireAuth, restoreUser, requireProperAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { response } = require('../../app');
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

router.post('/', requireAuth, async(req, res, next) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    const { user } = req;
    const id = user.id
    const errorMessages = {}
    if (!address){
        errorMessages.address = 'Street address is required';
    }
    if (!city){
        errorMessages.city = "City is required";
    }
    if (!state){
        errorMessages.state = "State is required";
    }
    if (!country){
        errorMessages.country = "Country is required";
    }
    if (!lat){
        errorMessages.lat = "Latitude is not valid";
    }
    if (!lng){
        errorMessages.lng = "Longitude is not valid";
    }
    if (!name){
        errorMessages.name = "Name must be less than 50 characters";
    }
    if (!description){
        errorMessages.description = "Description is required";
    }
    if (!price){
        errorMessages.price = "Price per day is required";
    }

    if (Object.values(errorMessages)){
        const err = new Error('Please enter all required information');
        err.statusCode = 400;
        err.errors = errorMessages
        return next(err)
    }

    const newSpot = await Spot.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        ownerId: id
    })

    res.json(newSpot)
})

router.post('/:spotId/images', async(req, res, next) => {
    const { user } = req;
    const id = parseInt(req.params.spotId)
    const { url, preview} = req.body;
    console.log(id)
    const spot = await Spot.findOne({
        where: {
            ownerId: id
        },
        include: {
            model: User
        }
    })
    if (!spot){
        const err = new Error('Spot couldn\'t be found');
        err.statusCode = 404;
        err.message = 'Spot couldn\'t be found';
        return next(err);
    }

    if (user.id !== spot.User.id){
        requireProperAuth(req, res, next);
    }

    const newImage = await SpotImage.create({
        url,
        preview,
        spotId: id
    })
    const image = newImage.toJSON();
    delete image.updatedAt;
    delete image.createddAt;
    delete image.spotId;
    res.json(image);
})

module.exports = router;


