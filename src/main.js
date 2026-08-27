import express from "express"
import { globalerror } from "./middleware/erroe.message.js"
import { athcontroll,usercontroll,prodcontroller,collectioncontroll,bookcontrol ,logcontroll} from "./moudles/index.js"
import { PORT } from "./config.js"
import { startserver } from "./DB/database.connection.js";

const app=express()
app.use(express.json())
app.all("/",(req,res)=>{
    res.status(200).send({message:"welcome"})
})


app.use("/auth",athcontroll)
app.use("/user",usercontroll)
app.use("/product",prodcontroller)
app.use("/collection",collectioncontroll)
app.use("/books",bookcontrol)
app.use("/logs",logcontroll)








app.all("{/*dummy}",(req,res)=>{
    res.status(404).send({message:"invalid route"})
})
app.use(globalerror)
startserver(PORT, app);
