import { ObjectId } from "mongodb"
import { db } from "../../DB/database.connection.js"

export const createlog=async(input)=>{
    const{book_id,action}=input
    const information=await db.collection("logs").insertOne({
        book_id:ObjectId.createFromHexString(book_id),
        action
    })
    return information
}