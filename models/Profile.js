const mongoose = require('mongoose')

const ProfileSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	nickname: {
		type: String,
		required: [true, 'Please, add a nickname to profile'],
		match: [/^[^0-9]\w+$/, 'Uncorrect nickname'],
	},
	status: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
		minlength: [6, 'You are boring :)'],
		maxlength: [500, '500 chars are the limit'],
	},
	social: {
		twitter: {
			type: String,
		},
		facebook: {
			type: String,
		},
		instagram: {
			type: String,
		},
		vk: {
			type: String,
		},
	},
	avatar: {
		type: String,
		default: 'no-photo.jpg',
	},
})

module.exports = mongoose.model('Profile', ProfileSchema)
