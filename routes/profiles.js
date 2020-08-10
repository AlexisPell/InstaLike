const express = require('express')
const {
	getAllProfiles,
	getSingleProfile,
	getMe,
	createProfile,
	updateProfile,
	deleteProfile,
} = require('./../controllers/profiles')

const { protect } = require('./../middleware/auth')

const router = express.Router()

router.route('/').get(getAllProfiles).post(protect, createProfile)
router.route('/me').get(protect, getMe)
router
	.route('/:id')
	.get(getSingleProfile)
	.put(protect, updateProfile)
	.delete(protect, deleteProfile)

module.exports = router
