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
module.exports = {addToWishlist}
