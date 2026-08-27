import { Router } from "express";
import { findBookWithTitle, insertBook, insertBooks, BooksInYear, updateYearBook, BooksHasGenre, getThreeBooks,getBooksWithINTYear,excludeGenres, deletebefore2000,aggregate1 ,aggregate2,aggregate3,aggregate4} from "./book.service.js";
import { sucessresponse } from "../../common/utlis/success.response.js";
const router=Router()

router.post("/",async(req , res , next)=>{
    const information=await insertBook(req.body)
    return sucessresponse({res,data:information})
})

router.post("/batch",async(req , res , next)=>{
    const information=await insertBooks(req.body)
    return sucessresponse({res,data:information})
})

router.patch("/Future",async(req , res , next)=>{
    const result=await updateYearBook()
    return sucessresponse({res,data:result})
})


router.get("/title",async (req,res,next)=>{
    const book=await findBookWithTitle(req.query)
    return sucessresponse({res,data:book})
})


router.get("/genre",async (req,res,next)=>{
   const books=await BooksHasGenre(req.query)
   return sucessresponse({res,data:books})
})

router.get("/skip-limit",async (req,res,next)=>{
    const books=await getThreeBooks()
    return sucessresponse({res,data:books})
})

router.get("/year-integer",async (req,res,next)=>{
    const books=await getBooksWithINTYear()
    return sucessresponse({res,data:books})
})




router.get("/exclude-genres",async (req,res,next)=>{
    const books=await excludeGenres()
    return sucessresponse({res,data:books})
})


router.delete("/before-year",async (req,res,next)=>{
    const result=await deletebefore2000(req.query)
    return sucessresponse({res,data:result})
})


router.get("/aggregate1",async (req,res,next)=>{
    const books=await aggregate1()
    return sucessresponse({res,data:books})
})

router.get("/aggregate2",async (req,res,next)=>{
    const books=await aggregate2()
    return sucessresponse({res,data:books})
})

router.get("/aggregate3",async (req,res,next)=>{
    const books=await aggregate3()
    return sucessresponse({res,data:books})
})


router.get("/aggregate4",async (req,res,next)=>{
    const books=await aggregate4()
    return sucessresponse({res,data:books})
})







export default router 