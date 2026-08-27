import { ObjectId, ReturnDocument } from "mongodb"
import { UserModel } from "../../DB/models/user.model.js"

export const getprofilebyid=async(inputs)=>{
    const{id}=inputs
    const user=await UserModel.findOne(
        {_id:ObjectId.createFromHexString(id)},
        {
            projection:{
                _id:0
            }
        }
    )
    if(!user){
        throw new Error("this user is not found",{cause:{
            status:404
        }})
    }
    return user
}

export const list=async(inputs)=>{
    const{page,limit}=inputs
    page=Math.floor(page<1 ? 1:page)
    limit=Math.floor(limit<1 ? 5:limit)
    const skip=(page-1)*limit

    const count=await UserModel.countDocuments()
    
    const users=await UserModel.find({},
        
        {
            projection:{
                _id:0
            },skip,limit
        }
    ).toArray()
    
    return {count,pages:Math.ceil(count/limit),users}
}


export const updateuser=async(innput1,input2)=>{
    const{id}=innput1
    const checkid=await UserModel.findOne(
        {_id:ObjectId.createFromHexString(id)}
    )
    if(!checkid){
        throw new Error("this user is not found",{cause:{status:404}})
    }
    const user=await UserModel.findOneAndUpdate(
        {
            _id:ObjectId.createFromHexString(id)
        },
        {
            $set:input2
        },{
         returnDocument: "after"}


    )
    return user
}


export const deleteuser=async(input)=>{
    const{id}=input
     const checkid=await UserModel.findOne(
        {_id:ObjectId.createFromHexString(id)}
    )
    if(!checkid){
        throw new Error("this user is not found",{cause:{status:404}})
    }
    const informationdelete=await UserModel.deleteOne(
        
             {
            _id:ObjectId.createFromHexString(id)
        }
        
    )
    return informationdelete
    

}