const router = require("express").Router()
const Category = require("../models/Category")

// CREATE CATEGORY
router.post("/", async (req, res)=>{
    try {
        const newCat = new Category({
            name: req.body.name
        })
        const catSave = await newCat.save()
        res.status(200).json(catSave)

    } catch (error) {
        res.status(500).json(error)
    }
})


// GET CATEGORIES
router.get("/", async (req,res)=> {
    try {
        const cat = await Category.find()
        res.status(200).json(cat)
    } catch (error) {
        res.status(500).json
    }
})
module.exports = router