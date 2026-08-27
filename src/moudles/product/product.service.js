import { ObjectId } from "mongodb"
import { ProductModel } from "../../DB/models/products.model.js"

export const addproduct=async(inputs)=>{
    const{title,price,quantity,UserID}=inputs
    const insertinformation=await ProductModel.insertOne(
        {title,price,quantity,UserID:ObjectId.createFromHexString(UserID)}
    )
    return insertinformation
}


export const allproductwiththeirusers=async()=>{
    const products=await ProductModel.aggregate([
        {
            $lookup:{
                from:"users",
                localField:"UserID",
                foreignField:"_id",
                as:"this product created by this user"
            }
        }
    ]).toArray()
    return products
}