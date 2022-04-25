import Category from '../models/Category.js'
import Product from '../models/Product.js'

// Create
export const addCategory = async (req, res) => {
    try {
        const category = new Category(req.body)
        const savedCategory = await category.save()
        res.status(201).json(savedCategory)
    } catch (err) {
        res.status(500).json(err)
    }
}

// Read All
export const getCategories = async (_, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).json(categories)
    }
    catch (err) {
        res.status(500).json(err)
    }

}

// Read One
export const getCategory = async (req, res) => {
    try {
        const category = await Category.find({ _id: req.params.id })
        res.status(200).json(category)
    }
    catch (err) {
        res.status(500).json(err)
    }

}

// Update
export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body)
        const updatedCategory = await category.save()
        res.status(201).json(updatedCategory)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

// Delete
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.find({ _id: req.params.id })
        // Delete category of products
        for (const product of category[0].products) {
            await Product.findOneAndUpdate(
                { _id: product },
                { $unset: {category: 1} }
            )
        }
        // Delete category
        await Category.findByIdAndDelete(req.params.id)
        res.status(201).json("Category deleted")
    }
    catch (err) {
        res.status(500).json(err)
    }
}