import { Router } from "express";
import { createlog } from "./log.service.js";
import { sucessresponse } from "../../common/utlis/success.response.js";
const router=Router()

router.post("/",async(req , res ,next)=>{
    const information=await createlog(req.body)
    return sucessresponse({res,data:information})
})




export default router