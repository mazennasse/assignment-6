import { Router } from "express";
import { createBooksCollection,createAuthorCollection,createLogsCollection, createindex } from "./collection.service.js";
import { sucessresponse } from "../../common/utlis/success.response.js";
const router=Router()



router.post("/books",async(req , res , next)=>{
    const result=await createBooksCollection()
    return sucessresponse({res,data:result})
})



router.post("/authors",async(req , res , next)=>{
    const result=await createAuthorCollection(req.body)
    return sucessresponse({res,data:result})
})




router.post("/logs/capped",async(req , res , next)=>{
    const result=await createLogsCollection()
    return sucessresponse({res,data:result})
})




router.post("/books/index",async(req , res , next)=>{
    const result=await createindex()
    return sucessresponse({res,data:result})
})




export default router