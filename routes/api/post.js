// Handles forum area, add posts, comment, etc.
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route    POST api/post
// @desc     Create post
// @access   Private
router.post(
    '/',
    [
        auth,
        [
            check('text', 'Text is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            });

            const post = await newPost.save();

            res.json(post);
        } catch (ex) {
            console.error(ex.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    GET api/post
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        // Get all posts and sort in descending order of date
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (ex) {
        console.error(ex.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/post/:post_id
// @desc     Get post by id
// @access   Private
router.get('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.json(post);
    } catch (ex) {
        console.error(ex.message);
        if (ex.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/post/:post_id
// @desc     Delte post by id
// @access   Private
router.delete('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Check whether user deleting the post is the user that owns the post
        if (post.user.toString() !== req.user.id) {
            // typecasting because comparing object id with string user id
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await post.remove();

        res.json({ msg: 'Post removed' });
    } catch (ex) {
        console.error(ex.message);
        if (ex.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route    PUT api/post/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // Check if the post is already liked by the same user
        if (
            post.likes.filter(like => like.user.toString() === req.user.id)
                .length > 0
        ) {
            return res.status(400).json({ msg: 'Post already liked' });
        }

        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (ex) {
        console.error(ex.message);
        res.status(500).send('Server Error');
    }
});

// @route    PUT api/post/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // Check if the post is already liked by the same user
        if (
            post.likes.filter(like => like.user.toString() === req.user.id)
                .length === 0
        ) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }

        // Get remove index
        const removeIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);

        await post.save();
        res.json(post.likes);
    } catch (ex) {
        console.error(ex.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
