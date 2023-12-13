const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post")
const bcrypt = require("bcrypt");

//Update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try {
      const result = await User.findById(req.params.id)
      Object.assign(result, req.body)
      result.save()
      res.status(200).json(result)
    } catch (err) {
      res.status(500).json(err);
    }
  } 
  else {
    res.status(401).json("You can update only your account")
  }
});


// Delete
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      try {
        await Post.deleteMany({username: user.username})
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been Deleted")
      } catch (err) {
        res.status(500).json(err)
      }
    } catch (error) {
      res.status(400).json("User not Found")
    }
  } else {
    res.status(401).json("You can delete only your account")
  }
})

// GET USER
router.get("/:id", async (req,res) =>{
  try {
    const user = await User.findById(req.params.id)
    const {password, ...orthers} = user._doc
    res.status(200).json(orthers)
  }catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router;