import CategoryModel from '../models/categoryModel.js'

// Create
export const addCategory = async (req, res) => {
    try {
        const category = new CategoryModel(req.body)
        await category.save()
        res.status(201).send("Category created")
    } catch (err) {
        res.status(400).send(err)
    }
}

// Read All
export const getCategories = async (_, res) => {
    try {
        const categories = await CategoryModel.find({})
        res.status(200).send(categories)
    }
    catch (err) {
        res.status(400).send(err)
    }

}

// Read One
export const getCategory = async (req, res) => {
    try {
        const category = await CategoryModel.find({ _id: req.params.id })
        res.status(200).send(category)
    }
    catch (err) {
        res.status(400).send(err)
    }

}

// Update
export const updateCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body)
        await category.save()
        res.status(201).send("Category updated")
    }
    catch (err) {
        res.status(400).send(err)
    }
}

// Delete
export const deleteCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findByIdAndDelete(req.params.id)
        res.status(201).send("Catgory deleted")
    }
    catch (err) {
        res.status(400).send(err)
    }
}