import { Router } from "express";
import { deleteuser, getprofilebyid,list, updateuser } from "./user.service.js";
import { sucessresponse } from "../../common/utlis/success.response.js";
const router=Router()

router.get("/:id",async(req ,res ,next)=>{
    const user = await getprofilebyid(req.params)
    return sucessresponse({res,status:200,data:user})
})

router.get("/",async(req ,res ,next)=>{
    const objectt = await list(req.query)
    return sucessresponse({res,status:200,data:{
        countofdocument:objectt.count,
        list:objectt.users,
        pages:objectt.pages
    }})
})



router.patch("/:id",async(req ,res ,next)=>{
    try{
        const user = await updateuser(req.params,req.body)
    return sucessresponse({res,status:200,data:user})
    }catch(error){
        console.log(error)
    }
})

router.delete("/:id",async(req ,res ,next)=>{
    try{
        const informationdelete = await deleteuser(req.params)
    return sucessresponse({res,status:200,data:informationdelete})
    }catch(error){
        console.log(error)
    }
})







export default router