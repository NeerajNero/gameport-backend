const User = require('../models/user.model')
const Cart = require('../models/cart.model')
const addToCart = async(req,res) => {
    try{
        const {items} = req.body
        const {user} = req.user
        const {userId} = user
        const findCart = await Cart.findOne({userId})
        if(!findCart){
            const cartItems = {
                userId,
                items
            }
            const saveCart = new Cart(cartItems);
            await saveCart.save();
            const populatedCart = await saveCart.populate({path: 'items.0.product'})
            res.status(201).json({message: "item added successfully", item: populatedCart.items[0]})
        }
        const findProduct = await findCart.items.find((item) => item.product.toString() === items[0].product.toString())
        if(!findProduct){
            findCart.items.push(items[0])
            await findCart.save()
            const populatedCart = await findCart.populate({path: `items.${findCart.items.length - 1}.product`})
            return res.status(200).json({message: "item added, cart updated successfully", item: populatedCart.items[findCart.items.length - 1]})
        }
        findProduct.quantity++
        await findCart.save()
        const populatedCart = await findCart.populate({path: `items.${findCart.items.indexOf(findProduct)}.product`})
        res.status(200).json({message: "item quantity incremented, cart updated successfully", item: populatedCart.items[findCart.items.indexOf(findProduct)]})

    }catch(error){
        console.log(error)
        res.status(500).json({message: "error occured while adding to cart",error: error.message})
    }
} 

const decFromCart = async(req,res) => {
    try{
        const {id,productId} = req.body
        const findCart = await Cart.findOne({userId: id})
        if (!findCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = findCart.items.find((cartItem) => cartItem.product.toString() === productId.toString())
        if(!item){
           return res.status(404).json({ message: "Item not found" });
        }
        
        if(item.quantity > 1){
            item.quantity--
        }else{
            findCart.items = findCart.items.filter((item) => item.product.toString() !== productId.toString())
        }
        await findCart.save();
        return res.status(200).json({ message: "Item updated successfully", cart: findCart });
    }catch(error){
        res.status(500).json({message: "unable to dec item"})
    }
}
const incFromCart = async(req,res) => {
    try{
        const {id,productId} = req.body
        const findCart = await Cart.findOne({userId: id})
        if(!findCart){
            return res.status(404).json({message: "cart not found"})
        }
        const item = findCart.items.find((item) => item.product.toString() === productId.toString())
        if(item){
            item.quantity++
            await findCart.save();
            res.status(200).json({message: "item updated successfully", cart: findCart})
        }else{
            res.status(404).json({messgae: "item not found"})
        }
    }catch(error){
        res.status(500).json({messgae: "unable to inc item", error: error.message})
    }
}
const deleteProduct = async(req,res) => {
    try{
        const {productId} = req.body
        const {user} = req.user
        const {userId} = user
        const findCart = await Cart.findOne({userId})
        if(!findCart){
            return res.status(404).json({message: "cart not found"})
        }

        const item = findCart.items.find((item) => item.product.toString() === productId.toString())
        if(!item){
            return res.status(404).json({ message: "Item not found" }); 
        }
        findCart.items = findCart.items.filter((item) => item.product.toString() !== productId.toString())
        await findCart.save()
        return res.status(200).json({ message: "Item deleted successfully", item });
    }catch(error){
        res.status(500).json({message: "error occured while deleting", error: error.message})
    }
}
const getCart = async(req,res) => {
    try{
        const {user} = req.user
        const {userId} = user
        const cartItems = await Cart.findOne({userId}).populate({path: 'items.product'})
        if(!cartItems){
           return res.status(404).json({message: "Cart not found"})
        }
        if(cartItems.items.length === 0){
            return res.status(200).json({message: "no items in cart"})
        }
        res.status(200).json({message: "items fetched successfully", cartItems: cartItems.items})
    }catch(error){
        res.status(500).json({message: "unable to fetch data"})
    }
}
module.exports = {addToCart,decFromCart,incFromCart,deleteProduct,getCart}