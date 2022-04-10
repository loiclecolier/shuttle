import ProductModel from '../models/productModel.js'
import CategoryModel from '../models/categoryModel.js'
import BrandModel from '../models/brandModel.js'

// Create
export const addProduct = async (req, res) => {
    try {
        const product = new ProductModel(req.body)
        await product.save()
        await CategoryModel.findOneAndUpdate(
            { _id: req.body.category },
            { $push: {products: product._id} },
            { new: true }
        )
        await BrandModel.findOneAndUpdate(
            { _id: req.body.brand },
            { $push: {products: product._id} },
            { new: true }
        )
        res.status(201).send("Product created")
    } catch (err) {
        res.status(400).send(err)
    }
}

// Read All
export const getProducts = async (_, res) => {
    try {
        const products = await ProductModel.find({})
        res.status(200).send(products)
    }
    catch (err) {
        res.status(400).send(err)
    }

}

// Read One
export const getProduct = async (req, res) => {
    try {
        const product = await ProductModel.find({ _id: req.params.id })
        res.status(200).send(product)
    }
    catch (err) {
        res.status(400).send(err)
    }

}

// Update
export const updateProduct = async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body)
        await product.save()

        // Delete old category and add new category
        if (req.body.category) {
            // delete
            await CategoryModel.findOneAndUpdate(
                { _id: product.category },
                { $pull: {products: product._id} }
            )
            // add
            await CategoryModel.findOneAndUpdate(
                { _id: req.body.category },
                { $push: {products: product._id} },
                { new: true }
            )
        }

        // Delete old brand and add new brand
        if (req.body.brand) {
            // delete
            await BrandModel.findOneAndUpdate(
                { _id: product.brand },
                { $pull: {products: product._id} }
            )
            // add
            await BrandModel.findOneAndUpdate(
                { _id: req.body.brand },
                { $push: {products: product._id} },
                { new: true }
            )
        }
        
        res.status(201).send("Product updated")
    }
    catch (err) {
        res.status(400).send(err)
    }
}

// Delete
export const deleteProduct = async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id)
        await CategoryModel.findOneAndUpdate(
            { _id: product.category },
            { $pull: {products: product._id} }
        )
        await BrandModel.findOneAndUpdate(
            { _id: product.brand },
            { $pull: {products: product._id} },
        )
        res.status(201).send("Product deleted")
    }
    catch (err) {
        res.status(400).send(err)
    }
}