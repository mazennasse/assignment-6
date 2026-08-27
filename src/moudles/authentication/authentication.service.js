import { UserModel } from "../../DB/models/user.model.js"

export const signup=async(input)=>{
    const{email}=input
    const checkemail=await UserModel.findOne(
        {
            email
        }
    )
    if(checkemail){
        throw new Error("this email is already exisits",{cause:{
            status:409
        }})
    }
    const insertresult=await UserModel.insertOne(input)
    return insertresult
}



export const login=async(input)=>{
    const{email,password}=input
    const checkemailAndPassword=await UserModel.findOne(
        {
            email,
            password
        }
    )
    if(!checkemailAndPassword){
        throw new Error("invalid login",{cause:{
            status:404
        }})
    }
    return checkemailAndPassword
}