const path = require('path')
const asyncHandler = require('./../middleware/async')
const ErrorResponce = require('./../utils/errorResponse')

const Profile = require('./../models/Profile')
const User = require('./../models/User')
const Post = require('./../models/Post')

// @route   GET api/profile/
// @desc    Get all profiles
// @access  Public
exports.getAllProfiles = asyncHandler(async (req, res, next) => {
	const profiles = await Profile.find()

	res.status(200).json(profiles)
})

// @route   GET api/profile/:id
// @desc    Get single profile
// @access  Public
exports.getSingleProfile = asyncHandler(async (req, res, next) => {
	const profile = await Profile.findById(req.params.id)

	res.status(200).json(profile)
})

// @route   GET api/profile/me
// @desc    Get my current profile
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
	const profile = await Profile.findOne({ user: req.user.id })

	if (!profile) {
		return next(new ErrorResponce('Unauthorized to get my profile...', 401))
	}

	res.status(200).json(profile)
})

// @route   PUT api/profile/me/photo
// @desc    Upload photo for profile
// @access  Private
exports.uploadProfilePhoto = asyncHandler(async (req, res, next) => {
	let profile = await Profile.findOne({ user: req.user.id })

	if (!profile) {
		return next(new ErrorResponce('Unauthorized to upload photo...', 401))
	}

	if (!req.files) {
		return next(new ErrorResponce('Please, add a photo...', 400))
	}

	let file = req.files.file

	if (!file.mimetype.startsWith('image')) {
		return next(new ErrorResponce('Oops, its not a photo...', 400))
	}

	if (file.size > process.env.MAX_FILE_UPLOAD) {
		return next(
			new ErrorResponce(
				`Please, upload img less than ${process.env.MAX_FILE_UPLOAD}`,
				400
			)
		)
	}

	file.name = `photo_${profile._id}${path.parse(file.name).ext}`

	file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
		if (err) {
			console.error(err)
			return next(new ErrorResponce(`Problem with file upload`, 400))
		}

		profile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{ avatar: file.name },
			{ new: true, runValidators: true }
		)

		res.status(200).json({ success: true, data: profile.avatar })
	})
})

// @route   POST api/profile/
// @desc    Create my profile
// @access  Private
exports.createProfile = asyncHandler(async (req, res, next) => {
	const {
		nickname,
		status,
		age,
		city,
		bio,
		twitter,
		facebook,
		instagram,
		vk,
	} = req.body

	const newProfile = {}

	newProfile.user = req.user.id
	newProfile.nickname = nickname
	newProfile.status = status
	newProfile.age = age
	newProfile.city = city
	if (bio) newProfile.bio = bio

	newProfile.social = {}
	if (twitter) newProfile.social.twitter = twitter
	if (facebook) newProfile.social.facebook = facebook
	if (instagram) newProfile.social.instagram = instagram
	if (vk) newProfile.social.vk = vk

	let profile = await Profile.findOne({ user: req.user.id })

	if (profile) {
		profile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{ $set: newProfile },
			{ new: true, runValidators: true }
		)
	}

	if (!profile) profile = await Profile.create(newProfile)

	res.status(200).json(profile)
})

// @route   DELETE api/profile
// @desc    Delete my profile and user account
// @access  Private
exports.deleteProfile = asyncHandler(async (req, res, next) => {
	await Post.deleteMany({ user: req.user.id })

	await Profile.findOneAndRemove({ user: req.user.id })

	await User.findOneAndRemove({ _id: req.user.id })

	res.status(200).json({ success: true, data: {} })
})
