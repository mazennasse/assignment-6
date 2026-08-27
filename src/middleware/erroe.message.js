export const globalerror=(error,req,res,next)=>{
   
    return res.status(error.cause?.status||500).json({
        Error_Message:error.message || "server error"
    })
}