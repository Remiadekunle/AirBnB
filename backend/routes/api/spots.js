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
        err.status = 404;
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

    if (Object.values(errorMessages).length > 0){
        const err = new Error('Please enter all required information');
        err.status = 400;
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
    console.log('hiiiiiiiiii',typeof id)
    const spot = await Spot.findOne({
        where: {
            id
        },
        include: {
            model: User
        }
    })
    if (!spot){
        const err = new Error('Spot couldn\'t be found');
        err.status = 404;
        err.message = 'Spot couldn\'t be found';
        return next(err);
    }

    if (user.id !== spot.User.id){
        return requireProperAuth(req, res, next);
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
});

router.put('/:spotId', async(req, res, next) => {
    const { user } = req;
    const id = parseInt(req.params.spotId);
    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    let spot = await Spot.findOne({
        where: {
            id
        },
        include: {
            model: User
        }
    })
    if (!spot){
        const err = new Error('Spot couldn\'t be found');
        err.status = 404;
        err.message = 'Spot couldn\'t be found';
        return next(err);
    }

    if (user.id !== spot.User.id){
        return requireProperAuth(req, res, next);
    }

    const errors = {}
    if (address) spot.address = address;
    else errors.address = "Street address is required";
    if (city) spot.city = city;
    else errors.city = "City is required";
    if (state) spot.state = state;
    else errors.state = "State is required"
    if (country) spot.country = country;
    else errors.country = "Country is required"
    if (lat) spot.lat = lat;
    else errors.lat = "Latitude is not valid";
    if (lng) spot.lng = lng;
    else errors.lng = "Longitude is not valid";
    if (name) spot.name = name;
    else errors.name = "Name must be less than 50 characters";
    if (description) spot.description = description;
    else errors.description = "Description is required";
    if (price) {
        spot.price = price;
    }
    else {
        errors.price = "Price per day is required";
    }

    if (Object.values(errors).length > 0){
        const err = new Error('Validation Error');
        err.status = 400;
        err.errors = errors
        return next(err)
    }

    spot.save();
    spot = spot.toJSON();
    delete spot.User;
    res.json(spot);
})


router.delete('/:spotId', async(req, res, next) => {
    const { user } = req;
    const id = parseInt(req.params.spotId);

    let spot = await Spot.findOne({
        where: {
            id
        },
        include: {
            model: User
        }
    })

    if (!spot){
        const err = new Error('Spot couldn\'t be found');
        err.status = 404;
        err.message = 'Spot couldn\'t be found';
        return next(err);
    }

    if (user.id !== spot.User.id){
        return requireProperAuth(req, res, next);
    }

    await spot.destroy();
    res.status = 200;
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })

})

module.exports = router;
