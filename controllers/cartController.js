const User = require('../models/user.model')
const Cart = require('../models/cart.model')
const addToCart = async(req,res) => {
    try{
        const {userId, items} = req.body
        const findUser = await User.findOne({_id: userId})
        if(!findUser){
            return res.status(404).json({message: "User doesnt exist"})
        }
        const findCart = await Cart.findOne({userId})
        if(!findCart){
            const cartItems = {
                userId,
                items
            }
            const saveCart = new Cart(cartItems);
            await saveCart.save();
            res.status(201).json({message: "item added successfully", cart: saveCart})
        }else{
            items.forEach((item) => {
                const existingItem = findCart.items.find((cartItem) => cartItem.product.toString() === item.product)
                if(existingItem){
                    existingItem.quantity+= item.quantity;
                }else{
                    findCart.items.push(item)   
                }
            })
            await findCart.save();
            return res.status(200).json({ message: "Cart updated successfully", cart: findCart });
        }

    }catch(error){
        console.log(error)
        res.status(500).json({message: "error occured while adding to cart"})
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
        const {id, productId} = req.body
        const findCart = await Cart.findOne({userId: id})
        if(!findCart){
            return res.status(404).json({message: "cart not found"})
        }

        const item = findCart.items.find((item) => item.product.toString() === productId.toString())
        if(!item){
            return res.status(404).json({ message: "Item not found" }); 
        }
        findCart.items = findCart.items.filter((item) => item.product.toString() !== productId.toString())
        await findCart.save()
        return res.status(200).json({ message: "Item deleted successfully", cart: findCart });
    }catch(error){
        res.status(500).json({message: "error occured while deleting", error: error.message})
    }
}
const getCart = async(req,res) => {
    try{
        const {userId} = req.body
        const cartItems = await Cart.findOne({userId})
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