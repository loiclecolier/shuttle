import Brand from '../models/Brand.js'
import Product from '../models/Product.js'

// Create
export const addBrand = async (req, res) => {
    try {
        const brand = new Brand(req.body)
        const savedBrand = await brand.save()
        res.status(201).json(savedBrand)
    } catch (err) {
        res.status(500).json(err)
    }
}

// Read All
export const getBrands = async (_, res) => {
    try {
        const brands = await Brand.find({})
        res.status(200).json(brands)
    }
    catch (err) {
        res.status(500).json(err)
    }

}

// Read One
export const getBrand = async (req, res) => {
    try {
        const brand = await Brand.find({ _id: req.params.id })
        res.status(200).json(brand)
    }
    catch (err) {
        res.status(500).json(err)
    }

}

// Update
export const updateBrand = async (req, res) => {
    try {
        const brand = await Brand.findByIdAndUpdate(req.params.id, req.body)
        const updatedBrand = await brand.save()
        res.status(201).json(updatedBrand)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

// Delete
export const deleteBrand = async (req, res) => {
    try {
        const brand = await Brand.find({ _id: req.params.id })
        // Delete brand of products
        for (const product of brand[0].products) {
            await Product.findOneAndUpdate(
                { _id: product },
                { $unset: {brand: 1} }
            )
        }
        // Delete brand
        await Brand.findByIdAndDelete(req.params.id)
        res.status(201).json("Brand deleted")
    }
    catch (err) {
        res.status(500).json(err)
    }
}