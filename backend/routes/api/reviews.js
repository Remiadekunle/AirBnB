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
        where.userId = user.id
    }
    console.log(user.id)
    const reviews = await Review.findAll({
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
    const Reviews = []

    for (let i = 0; i < reviews.length; i++){
        let review = reviews[i]

        review = review.toJSON();
        const spotId = review.spotId
        // console.log(spotId)
        let image = await SpotImage.findOne({
            where: {
                spotId,
                preview: true,
            }
        })
        if (image){
            review.Spot.previewImage = image.url
            console.log('hi')
        } else {
            review.Spot.previewImage = 'Image not found'
            console.log('Bye')
        }
        delete review.Spot.SpotImages;
        console.log(review)
        Reviews.push(review)
    }
    // console.log(image)
    return res.json({
        Reviews
    })
})

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const id = req.params.reviewId;

    const {user} = req;

    const review = await Review.findOne({
        where:{
            id
        },
        include: {
            model: ReviewImage
        }
    })
    if (!review){
        const err = new Error("Review couldn't be found")
        err.status = 404;
        return next(err)
    }

    if (user.id !== review.userId){
        requireProperAuth(req, res, next);
    }

    const {url} = req.body


    if (review.ReviewImages.length > 10){
        const err = new Error("Maximum number of images for this resource was reached")
        err.status = 403;
        return next(err)
    }

    let reviewImage = await ReviewImage.create({
        url,
        reviewId: review.id
    })

    reviewImage = reviewImage.toJSON();
    delete reviewImage.updatedAt;
    delete reviewImage.createdAt;
    delete reviewImage.reviewId;
    res.json(reviewImage)
})

router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const id = req.params.reviewId;

    const {user} = req;

    const {review, stars} = req.body;

    const oldReview = await Review.findOne({
        where:{
            id
        },
    })

    if (!oldReview){
        const err = new Error("Review couldn't be found")
        err.status = 404;
        return next(err)
    }

    if (user.id !== oldReview.userId){
        requireProperAuth(req, res, next);
    }

    const errors = {}

    if (!review){
        errors.review = "Review text is required"
    }
    if (parseInt(stars) < 0 || parseInt(stars) > 5 ){
        errors.stars = "Stars must be an integer from 1 to 5"
    }

    if (Object.values(errors).length > 0){
        const err = new Error('Please enter all required information');
        err.status = 400;
        err.errors = errors
        return next(err)
    }

    oldReview.review = review;
    oldReview.stars = stars;
    oldReview.updatedAt = new Date()

    await oldReview.save();
    res.json(oldReview)
})


router.delete('/:reviewId', requireAuth, async (req, res, next) =>  {
    const id = req.params.reviewId;

    const {user} = req;

    const review = await Review.findOne({
        where:{
            id
        }
    })

    if (!review){
        const err = new Error("Review couldn't be found")
        err.status = 404;
        return next(err)
    }
    console.log(user.id)
    console.log(review.userId)
    console.log(review)
    if (user.id !== review.userId){
        requireProperAuth(req, res, next);
    }



    await review.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})



module.exports = router;
