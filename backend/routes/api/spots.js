const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: {
            model: SpotImage,
            where: {
                preview: true
            },
            // as: 'previewImage',
            attributes: {
                exclude: ['id', 'spotId', 'createdAt', 'updatedAt', 'preview']
            }
        }
    })
    return res.json({
        spots
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
        include: {
            model: SpotImage,
            where: {
                preview: true
            },
            attributes: {
                exclude: ['id', 'spotId', 'createdAt', 'updatedAt', 'preview']
            }
        }
    })

    return res.json({
        spots
    })
})

module.exports = router;
