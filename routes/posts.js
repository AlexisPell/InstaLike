const express = require('express')
const {
	getAllPosts,
	getMyPosts,
	getSinglePost,
	createPost,
	deletePost,
	like,
	unlike,
	comment,
	uncomment,
} = require('./../controllers/posts')

const { protect } = require('./../middleware/auth')

const router = express.Router({ mergeParams: true })

router.route('/').get(getAllPosts).post(protect, createPost)
router.route('/myposts').get(protect, getMyPosts)
router.route('/:id').get(getSinglePost).delete(protect, deletePost)
router.route('/like/:id').put(protect, like)
router.route('/unlike/:id').put(protect, unlike)
router.route('/comment/:id').post(protect, comment)
router.route('/uncomment/:id/:comment_id').delete(protect, uncomment)

module.exports = router
