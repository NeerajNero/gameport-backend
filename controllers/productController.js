const Product = require('../models/product.model')
const addProduct = async(req,res) => {
    try{
        const {productName, description, price, images, platform, condition, stock, genre, releaseDate, rating} = req.body
        const product = new Product({
            productName,
            description,
            price,
            images,
            platform,
            condition,
            stock,
            genre,
            releaseDate,
            rating
        })
        await product.save()
        res.status(201).json({message: "Product added successfully"})
    }catch(error){
        res.status(500).json({message: "unable to add product"})
    }
}

const deleteProduct = async(req,res) => {
    try{
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message: "product not found"})
        }
        res.status(200).json({message: "product deleted successfully"})
    }catch(error){
        res.status(500).json({message: "unable to delete product"})
    }
}
const updateProducts = async(req,res) => {
    try{
        const {id} = req.params;
        const {productName, description, price, images, platform, condition, stock, genre, releaseDate, rating} = req.body
        const product = {
            productName,
            description,
            price,
            images,
            platform,
            condition,
            stock,
            genre,
            releaseDate,
            rating
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true, runValidators: true})
        if(updatedProduct){
            res.status(200).json({message: "product updated successfully", updatedProduct,})
        }else{
            res.status(500).json({message: "failed to update"})
        }
    }catch(error){
        res.status(500).json({message: "error occured while updating products"})
    }
}
const getProducts = async(req,res) => {
    try{
        const products = await Product.find();
        if(!products){
            return res.status(404).json({message: "no data found"})
        }
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({message: "error occurred while fetching products"})
    }
}

module.exports = {addProduct, deleteProduct, getProducts,updateProducts}