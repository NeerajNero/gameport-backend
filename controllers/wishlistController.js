const Wishlist = require('../models/wishlist.model')
const addToWishlist = async(req,res) => {
    try{
        const {userId, items} = req.body;
        const findWishlist = await Wishlist.findOne({userId})
        if(!findWishlist){
            const newWishlist = {
                userId,
                items
            }
            const saveWishlist = new Wishlist(newWishlist)
            await saveWishlist.save()
            return res.status(201).json({ message: "Wishlist created successfully" });
        }
        const findProduct = await findWishlist.items.find((item) => item.product.toString() === items[0].product.toString())
        if(!findProduct){
            findWishlist.items.push(items[0])
            await findWishlist.save()
            return res.status(201).json({ message: "Wishlist updated successfully" });
        }
        findProduct.quantity++
        await findWishlist.save()
        res.status(201).json({message: "wishlist updated successfully"})
    }catch(error){
        res.status(500).json({message: "error occured while adding product to wishlist"})
    }
}
const getWishlist = async(req,res) => {
    try{
        const {userId} = req.body
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const findWishlist = await Wishlist.findOne({userId})
        if(!findWishlist){
            return res.status(404).json({message: "no wishlist found"})
        }
        if(findWishlist.items.length === 0){
            return res.status(404).json({message: "no items in wishlist"})
        }
        res.status(200).json({message: "items in wishlist fetched successfully", items: findWishlist.items})
    }catch(error)
    {
        res.status(500).json({message: "error occured while fetching wishlist"})
    }
}
module.exports = {addToWishlist,getWishlist}
