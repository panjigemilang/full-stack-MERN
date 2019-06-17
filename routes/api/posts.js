const express = require("express")
const router = express.Router()
const passport = require("passport")

// Validation
const validationPost = require("../../validation/posts")

// Load model
const Post = require("../../models/Post")
const Profile = require("../../models/Profile")

// @route   POST api/posts
// @desc    add post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validationPost(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    const post = new Post({
      user: req.user.id,
      text: req.body.text,
      name: req.user.name,
      avatar: req.user.avatar
    })

    post.save().then(() => {
      res.json(post)
    })
  }
)

// @route   GET api/posts
// @desc    Get all post
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({
      date: -1
    })
    .then(posts => {
      return res.json(posts)
    })
    .catch(() => {
      return res.status(404).json({
        notFound: "posts not found"
      })
    })
})

// @route   GET api/posts/:user_id
// @desc    Get post by user ID
// @access  Public
router.get("/:user_id", (req, res) => {
  Post.findById(req.params.user_id)
    .then(post => {
      return res.json(post)
    })
    .catch(() => {
      return res.status(404).json({
        postNotFound: "no post found by that ID"
      })
    })
})

// @route   DELETE api/posts/:user_id
// @desc    Delete post by user ID
// @access  private
router.delete(
  "/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      Post.findById(req.params.user_id).then(post => {
        // check the owner of post
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({
            unauthorized: "you cannot delete other's post"
          })
        }

        post
          .remove()
          .then(() => {
            res.json({ success: true })
          })
          .catch(err => {
            res.status(404).json(`cannot delete posts with errors : ${err}`)
          })
      })
    })
  }
)

// @route   POST api/posts/like/:user_id
// @desc    like a post
// @access  private
router.post(
  "/like/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      Post.findById(req.params.user_id).then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res.json({
            liked: "you cannot like post more than once"
          })
        }

        post.likes.unshift({
          user: req.user.id
        })
        post
          .save()
          .then(post => {
            return res.json(post)
          })
          .catch(errors => {
            return res.status(400).json({
              errors: `something error with ${errors}`
            })
          })
      })
    })
  }
)

// @route   POST api/posts/unlike/:user_id
// @desc    unlike a post
// @access  private
router.post(
  "/unlike/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      console.log(`what is this ID? => ${profile.id}`)

      Post.findById(req.params.user_id).then(post => {
        console.log(`then why is this null? => ${post}`)

        //  check if this post had been liked by user
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res.json({
            liked: "you cannot unlike post that you haven't like it"
          })
        }

        const removeIndex = post.likes
          .map(item => {
            item.user.toString()
          })
          .indexOf(req.user.id)

        // splice out item from array
        post.likes.splice(removeIndex, 1)

        post.save().then(post => {
          res.json(post)
        })
      })
    })
  }
)

// @route   POST api/posts/comment/:user_id
// @desc    add comment
// @access  private
router.post(
  "/comment/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.user_id).then(post => {
      const { errors, isValid } = validationPost(req.body)

      if (!isValid) {
        return res.status(400).json(errors)
      }

      const comment = {
        user: req.user.id,
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.avatar
      }

      // add comment to array
      post.unshift(comment)

      post
        .save()
        .then(post => {
          return res.json(post)
        })
        .catch(err => {
          return res.status(404).json(`there's an error with this : ${err}`)
        })
    })
  }
)

// @route   DELETE api/posts/comment/:user_id
// @desc    Delete comment by user ID
// @access  private
router.delete(
  "/comment/:user_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.user_id).then(post => {
      // check to see if comment exists
      if (
        post.comments.filter(
          comment => comment.user.toString() === req.params.comment_id
        ).length < 1
      ) {
        return res.status(404).json({
          commentNotFound: "comment doesn't exists"
        })
      }

      const removeIndex = post.comments
        .map(item => {
          item.user.toString()
        })
        .indexOf(req.user.id)

      // splice out item from array
      post.comments.splice(removeIndex, 1)

      post.save().then(post => {
        res.json(post)
      })
    })
  }
)

module.exports = router
