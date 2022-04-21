import ProductModel from '../models/productModel.js'
import CategoryModel from '../models/categoryModel.js'
import BrandModel from '../models/brandModel.js'
import * as fs from 'fs'

// Path avec ES module
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Create
export const addProduct = async (req, res) => {
    try {
        const product = new ProductModel({
            ...req.body,
            category: req.body.category === "" ? null : req.body.category,
            brand: req.body.brand === "" ? null : req.body.brand,
            price: req.body.price * 100,
            image: `${req.protocol}://${req.get('host')}/images/products/${req.file.filename}` 
        })
        await product.save()
        if (req.body.category) {
            await CategoryModel.findOneAndUpdate(
                { _id: req.body.category },
                { $push: {products: product._id} },
                { new: true }
            )
        }
        if (req.body.brand) {
            await BrandModel.findOneAndUpdate(
                { _id: req.body.brand },
                { $push: {products: product._id} },
                { new: true }
            )
        }
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
        const oldProduct = await ProductModel.find({ _id: req.params.id })

        // delete image if changed
        if (req.body.image !== "none") {
            const filename = oldProduct[0].image.split('/images/products/')[1]
            fs.unlink(`images/products/${filename}`, () => { return })
        }
        
        const product = await ProductModel.findByIdAndUpdate(req.params.id,
            {
                ...req.body,
                category: req.body.category === "" ? null : req.body.category,
                brand: req.body.brand === "" ? null : req.body.brand,
                price: req.body.price * 100, // convert cent
                // if image = none -> not new image -> send old url image
                // else send new image
                image: req.body.image === "none" ? oldProduct[0].image : `${req.protocol}://${req.get('host')}/images/products/${req.file.filename}` 
            }
        )
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
        const product = await ProductModel.find({ _id: req.params.id })
        const filename = product[0].image.split('/images/products/')[1]
        fs.unlink(`images/products/${filename}`, async () => {
            await ProductModel.findByIdAndDelete(req.params.id)
            await CategoryModel.findOneAndUpdate(
                { _id: product.category },
                { $pull: {products: product._id} }
            )
            await BrandModel.findOneAndUpdate(
                { _id: product.brand },
                { $pull: {products: product._id} },
            )
        })

        res.status(201).send("Product deleted")
    }
    catch (err) {
        res.status(400).send(err)
    }
}