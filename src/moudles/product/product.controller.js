import { Router } from "express";
import { addproduct, allproductwiththeirusers } from "./product.service.js";
import { sucessresponse } from "../../common/utlis/success.response.js";
const router=Router()




router.post("/",async(req , res ,next)=>{
    const information=await addproduct(req.body)
    return sucessresponse({res,data:information})
})


router.get("/",async(req , res ,next)=>{
    const products=await allproductwiththeirusers()
    return sucessresponse({res,data:products})
})


export default router