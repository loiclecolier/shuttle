import BrandModel from '../models/brandModel.js'
import ProductModel from '../models/productModel.js'

// Create
export const addBrand = async (req, res) => {
    try {
        const brand = new BrandModel(req.body)
        await brand.save()
        res.status(201).send("Brand created")
    } catch (err) {
        res.status(400).send(err)
    }
}

// Read All
export const getBrands = async (_, res) => {
    try {
        const brands = await BrandModel.find({})
        res.status(200).send(brands)
    }
    catch (err) {
        res.status(400).send(err)
    }

}

// Read One
export const getBrand = async (req, res) => {
    try {
        const brand = await BrandModel.find({ _id: req.params.id })
        res.status(200).send(brand)
    }
    catch (err) {
        res.status(400).send(err)
    }

}

// Update
export const updateBrand = async (req, res) => {
    try {
        const brand = await BrandModel.findByIdAndUpdate(req.params.id, req.body)
        await brand.save()
        res.status(201).send("Brand updated")
    }
    catch (err) {
        res.status(400).send(err)
    }
}

// Delete
export const deleteBrand = async (req, res) => {
    try {
        const brand = await BrandModel.find({ _id: req.params.id })
        // Delete brand of products
        for (const product of brand[0].products) {
            await ProductModel.findOneAndUpdate(
                { _id: product },
                { $unset: {brand: 1} }
            )
        }
        // Delete brand
        await BrandModel.findByIdAndDelete(req.params.id)
        res.status(201).send("Brand deleted")
    }
    catch (err) {
        res.status(400).send(err)
    }
}