const asyncHandler = require('./../middleware/async')
const ErrorResponce = require('./../utils/errorResponse')

const Profile = require('./../models/Profile')
const Post = require('./../models/Post')

// @desc    Get all posts or get posts by user
// @route   GET api/post/
// @route   GET api/profile/:profileId/post/
// @access  Public
exports.getAllPosts = asyncHandler(async (req, res, next) => {
	let query

	if (req.params.profileId) {
		query = await Post.find({ profile: req.params.profileId })
	} else {
		query = await Post.find()
	}

	const posts = query

	res.status(200).json({
		success: true,
		count: posts.length,
		data: posts,
	})
})

// @desc    Get all my posts
// @route   GET api/post/myposts
// @access  Private
exports.getMyPosts = asyncHandler(async (req, res, next) => {
	const posts = await Post.find({ user: req.user.id })

	res.status(200).json({ success: true, count: posts.length, data: posts })
})

// @desc    Get single post
// @route   GET api/post/:id
// @access  Public
exports.getSinglePost = asyncHandler(async (req, res, next) => {
	const post = await Post.findById(req.params.id)

	if (!post) {
		return next(
			new ErrorResponce(`No post with id ${req.params.id} found...`, 404)
		)
	}

	res.status(200).json({ success: true, data: post })
})

// @desc    Create a post
// @route   POST api/post/
// @access  Private
exports.createPost = asyncHandler(async (req, res, next) => {
	const profile = await Profile.findOne({ user: req.user.id })

	const newPost = await Post.create({
		user: req.user.id,
		text: req.body.text,
		profile,
		nickname: profile.nickname,
		avatar: profile.avatar,
	})

	res.status(200).json({ success: true, data: newPost })
})

// @desc    Delete single post
// @route   DELETE api/post/:id
// @access  Private
exports.deletePost = asyncHandler(async (req, res, next) => {
	let post = await Post.findById(req.params.id)

	if (post.user.toString() !== req.user.id) {
		return next(
			new ErrorResponce('Not authorized to delete this route...', 401)
		)
	}

	post = await Post.findByIdAndRemove(req.params.id)

	res.status(200).json({ success: true, data: {} })
})

// @desc    Like a post
// @route   PUT api/post/like/:id
// @access  Private
exports.like = asyncHandler(async (req, res, next) => {
	let post = await Post.findById(req.params.id)

	if (
		post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
	) {
		return res
			.status(400)
			.json({ success: false, data: 'Post already liked :)' })
	}

	post.likes.unshift({ user: req.user.id })

	await post.save()

	res.status(200).json({ success: true, data: post.likes })
})

// @desc    Unlike a post
// @route   PUT api/post/unlike/:id
// @access  Private
exports.unlike = asyncHandler(async (req, res, next) => {
	let post = await Post.findById(req.params.id)

	if (
		post.likes.filter((like) => like.user.toString() === req.user.id).length ===
		0
	) {
		return res
			.status(400)
			.json({ success: false, data: 'Post has not yet liked :)' })
	}

	const removeIndex = post.likes
		.map((like) => like.user.toString())
		.indexOf(req.user.id)

	post.likes.splice(removeIndex, 1)

	await post.save()

	res.status(200).json({ success: true, data: post.likes })
})

// @desc    Add comment
// @route   POST api/post/comment/:id
// @access  Private
exports.comment = asyncHandler(async (req, res, next) => {
	let post = await Post.findById(req.params.id)

	const profile = await Profile.findOne({ user: req.user.id })

	const newComment = {
		text: req.body.text,
		user: req.user.id,
		nickname: profile.nickname,
		avatar: profile.avatar,
	}

	console.log('PROFILE', profile)
	console.log(newComment)

	post.comments.unshift(newComment)

	await post.save()

	res.status(201).json({
		success: true,
		count: post.comments.length,
		data: post.comments,
	})
})

// @desc    Delete comment
// @route   DELETE api/post/uncomment/:id/:comment_id
// @access  Private
exports.uncomment = asyncHandler(async (req, res, next) => {
	let post = await Post.findById(req.params.id)

	const comment = post.comments.find(
		(comment) => comment.id === req.params.comment_id
	)

	if (!comment) {
		next(new ErrorResponce('No such comment with this id...', 404))
	}

	if (comment.user.toString() !== req.user.id) {
		next(new ErrorResponce('Unauthorized to this route...', 401))
	}

	const removeIndex = post.comments
		.map((comment) => comment.user.toString())
		.indexOf(req.user.id)

	post.comments.splice(removeIndex, 1)

	await post.save()

	res
		.status(200)
		.json({ success: true, count: post.comments.length, data: post.comments })
})
