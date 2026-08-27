import { db } from "../database.connection.js";

export const UserModel=db.collection("books",{validator:{$and:[{title:{$type:"string"},email:{$type:"string"}}]}})


export const BookModel=db.collection("books",{validator:{title:{$type:"string"}}})