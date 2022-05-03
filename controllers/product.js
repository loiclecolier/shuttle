import Product from '../models/Product.js'
import Category from '../models/Category.js'
import Brand from '../models/Brand.js'
import * as fs from 'fs'

// Path avec ES module
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Create
export const addProduct = async (req, res) => {
    try {
        const product = new Product({
            ...req.body,
            category: req.body.category === "" ? null : req.body.category,
            brand: req.body.brand === "" ? null : req.body.brand,
            price: req.body.price * 100,
            image: `${req.protocol}://${req.get('host')}/images/products/${req.file.filename}` 
        })
        const savedProduct = await product.save()
        if (req.body.category) {
            await Category.findOneAndUpdate(
                { _id: req.body.category },
                { $push: {products: product._id} },
                { new: true }
            )
        }
        if (req.body.brand) {
            await Brand.findOneAndUpdate(
                { _id: req.body.brand },
                { $push: {products: product._id} },
                { new: true }
            )
        }
        res.status(201).json(savedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
}

// Read All
export const getProducts = async (_, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    }
    catch (err) {
        res.status(500).json(err)
    }

}

// Read One
export const getProduct = async (req, res) => {
    try {
        const product = await Product.find({ _id: req.params.id })
        res.status(200).json(product)
    }
    catch (err) {
        res.status(500).json(err)
    }

}

// Update
export const updateProduct = async (req, res) => {
    try {
        const oldProduct = await Product.find({ _id: req.params.id })

        // delete image if changed
        if (req.body.image !== "none") {
            const filename = oldProduct[0].image.split('/images/products/')[1]
            fs.unlink(`images/products/${filename}`, () => { return })
        }
        
        const product = await Product.findByIdAndUpdate(req.params.id,
            {
                ...req.body,
                category: req.body.category === "" ? null : req.body.category,
                brand: req.body.brand === "" ? null : req.body.brand,
                price: req.body.price * 100, // convert cent
                // if image = none -> not new image -> send old url image
                // else send new image
                image: req.body.image === "none" ? oldProduct[0].image : `${req.protocol}://${req.get('host')}/images/products/${req.file.filename}` 
            },
            { new: true }
        )

        // Delete old category and add new category
        if (req.body.category) {
            // delete
            await Category.findOneAndUpdate(
                { _id: product.category },
                { $pull: {products: product._id} }
            )
            // add
            await Category.findOneAndUpdate(
                { _id: req.body.category },
                { $push: {products: product._id} },
                { new: true }
            )
        }

        // Delete old brand and add new brand
        if (req.body.brand) {
            // delete
            await Brand.findOneAndUpdate(
                { _id: product.brand },
                { $pull: {products: product._id} }
            )
            // add
            await Brand.findOneAndUpdate(
                { _id: req.body.brand },
                { $push: {products: product._id} },
                { new: true }
            )
        }
        
        const updatedProduct = await product.save()
        
        res.status(201).json(updatedProduct)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

// Delete
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.find({ _id: req.params.id })
        const filename = product[0].image.split('/images/products/')[1]
        fs.unlink(`images/products/${filename}`, async () => {
            await Product.findByIdAndDelete(req.params.id)
            await Category.findOneAndUpdate(
                { _id: product.category },
                { $pull: {products: product._id} }
            )
            await Brand.findOneAndUpdate(
                { _id: product.brand },
                { $pull: {products: product._id} },
            )
            res.status(201).json("Product deleted")
        })
    }
    catch (err) {
        res.status(500).json(err)
    }
}