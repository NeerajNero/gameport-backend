const Address = require('../models/address.model')
const addAddress = async(req,res) => {
    try{
        const {address} = req.body 
        const {user} = req.user
        console.log("reached backend")
        if(!user.userId || !address){
            return res.status(404).json({message: "user not authenticated or no address added"})
        }
        const findAddress = await Address.findOne({userId: user.userId})
        console.log(findAddress)
        if(!findAddress){
            console.log("address not found")
            const newAddress = {
                userId: user.userId,
                addresses: [
                    {
                        address
                    }
                ]
            }
            const saveAddress = new Address(newAddress);
            await saveAddress.save();
            return res.status(201).json({message: "no address was present so added a new address", address})
        }
        findAddress.addresses.push({ address });
        await findAddress.save();
        return res.status(200).json({message: "address added successfully", address})
    }catch(error){
        res.status(500).json({message: "unexpected error occured", error: error.message})
    }
}
const getAddress = async(req,res) => {
    try{
        const {user} = req.user
        if(!user){
            return res.status(404).json({message: "user not found or not authenticated"})
        }
        const findAddress = await Address.findOne({userId: user.userId})
        if(!findAddress){
            return res.status(404).json({message: "no address found"})
        }
        res.status(200).json({message: "address found", address: findAddress})
    }catch(error){
        res.status(500).json({message: "unexpected error occured", error: error.message})
    }
}
const deleteAddress = async(req,res) => {
    try{
        const {user} = req.user
        const {addressId} = req.body
        if(!user){
            return res.status(404).json({message: "user not found or not authenticated"})
        }
        const findAddress = await Address.findOne({userId: user.userId})
        if(!findAddress){
            return res.status(404).json({message: "no address found"})
        }
        const updatedAddresses = await findAddress.addresses.filter((address) => address._id.toString() !== addressId)

        if (updatedAddresses.length === findAddress.addresses.length) {
            return res.status(404).json({ message: "Address ID not found" });
        }

        findAddress.addresses = updatedAddresses
        await findAddress.save()
        return res.status(200).json({ message: "Address deleted successfully", addresses: findAddress.addresses });
    }catch(error){
        res.status(500).json({message: "an unexpected error has occured", error: error.message})
    }
}
module.exports = {addAddress, getAddress, deleteAddress}