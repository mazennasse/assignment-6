import { Router } from "express";
import { signup,login } from "./authentication.service.js";
import{sucessresponse} from "../../common/utlis/index.js"
const router=Router()



router.post("/signup",async(req , res , next)=>{
    const insertresult=await signup(req.body)
    return sucessresponse({res,data:insertresult,status:201})
})



router.post("/login",async(req , res , next)=>{
    const insertresult=await login(req.body)
    return sucessresponse({res,data:insertresult,status:201})
})

export default router