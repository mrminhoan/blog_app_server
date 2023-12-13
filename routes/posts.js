const router = require("express").Router()
const User = require("../models/User");
const Post = require("../models/Post")

// GET POST 
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})


// GET ALL POST
router.get("/", async (req, res) => {
    const username = req.query.user
    const catName = req.query.cat
    try {
        let posts
        if (username) {
            posts = await Post.find({ username })
        } else if (catName) {
            posts = await Post.find({
                categories:
                {
                    $in: [catName],
                },
            })
        } else {
            posts = await Post.find()
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE POST 
router.post("/", async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            desc: req.body.desc,
            photo: req.body.photo,
            username: req.body.username,
            categories: req.body.categories
        })
        const savePost = await newPost.save()
        res.status(200).json(savePost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Update  POST 
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.username) {
            try {
                const updatePost = await Post.findByIdAndUpdate(req.params.id,
                    {
                        $set: req.body
                    },
                    { new: true }
                )
                res.status(200).json(updatePost)
            } catch (error) {
                res.status(401).json(error)
            }
        } else {
            res.status(401).json("You can update only your post")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.username) {
            try {
                await post.delete()
                res.status(200).json("Post has been deleted...")
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(401).json("You can delete only your Post")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router