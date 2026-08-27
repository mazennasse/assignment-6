import { db } from "../../DB/database.connection.js"

export const createBooksCollection=async()=>{
    const result=await db.createCollection("books",{
        validator:{
            $jsonSchema:{
                bsonType:"object",
                required:["title"],
                properties:{
                    title:{
                        bsonType:"string",
                        minLength:1
                    }
                }

            }
        }
    })

    return {"ok":1}
}



export const createAuthorCollection=async(inputs)=>{
    const result=await db.collection("authors").insertOne(inputs)
    return result
}


export const createLogsCollection=async()=>{
    await db.createCollection("logs",{
        capped:true,
        size:1024*1024
    })
    return {"ok":1}
}


export const createindex=async()=>{
    const result=await db.collection("books").createIndex({
        title:1
    })

    return result
}