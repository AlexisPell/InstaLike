const express = require('express')
const {
	getAllProfiles,
	getSingleProfile,
	getMe,
	createProfile,
	updateProfile,
	deleteProfile,
	uploadProfilePhoto,
} = require('./../controllers/profiles')

const { protect } = require('./../middleware/auth')

// Include other routers
const postsRouter = require('./posts')

const router = express.Router()

// Re-routing
router.use('/:profileId/post', postsRouter)

router.route('/').get(getAllProfiles).post(protect, createProfile)
router.route('/me').get(protect, getMe)
router.route('/me/photo').put(protect, uploadProfilePhoto)
router
	.route('/:id')
	.get(getSingleProfile)
	.put(protect, updateProfile)
	.delete(protect, deleteProfile)

module.exports = router
