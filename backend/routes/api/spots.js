const express = require('express')
const { setTokenCookie, requireAuth, restoreUser, requireProperAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { response } = require('../../app');
const router = express.Router();

router.get('/', async (req, res) => {
    const spots = await Spot.findAll();


    const newSpots = []
    for (let i = 0; i < spots.length; i++){
        let spot = spots[i]
        spot = spot.toJSON();
        let image = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            },
            attributes: {
                exclude: ['id', 'spotId', 'createdAt', 'updatedAt']
            }
        });
        if (image){
            const url = image.url
            spot.previewImage = url;

        }
        else{
            spot.previewImage = 'No preview image found'
        }

        let reviews = await Review.findAll({
            where: {
                spotId: spot.id
            },

        })

        let stars = 0;
        count = 0
        if (reviews.length > 0){
            reviews.forEach(review => {
                stars += review.stars
                count++
            })
            stars = stars/count

            spot.avgRating = stars
        } else{
            spot.avgRating = 'This restaurant has not been rated'
        }

        newSpots.push(spot)
    }

    return res.json({
        newSpots
    })
})

router.get('/current', restoreUser, async (req, res) => {
    const { user } = req;
    const where = {}
    if (user){
        where.ownerId = user.id
    }
    const spots = await Spot.findAll({
        where
    })
    console.log(spots)
    const newSpots = []
    for (let i = 0; i < spots.length; i++){
        let spot = spots[i]
        spot = spot.toJSON();
        let image = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            },
            attributes: {
                exclude: ['id', 'spotId', 'createdAt', 'updatedAt']
            }
        });
        if (image){
            const url = image.url
            spot.previewImage = url;

        }
        else{
            spot.previewImage = 'No preview image found'
        }

        let reviews = await Review.findAll({
            where: {
                spotId: spot.id
            },

        })

        let stars = 0;
        count = 0
        if (reviews.length > 0){
            reviews.forEach(review => {
                stars += review.stars
                count++
            })
            stars = stars/count

            spot.avgRating = stars
        } else{
            spot.avgRating = 'This restaurant has not been rated'
        }

        newSpots.push(spot)
    }

    return res.json({
        newSpots
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

    const newSpot = await Spot.build({
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

    await newSpot.save();

    const check = await Spot.findOne({
        where: {
            price
        }
    })

    console.log(check)

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
    const id = parseInt(req.params.spotId)
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

module.exports = router;
