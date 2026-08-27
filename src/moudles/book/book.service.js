import { db } from "../../DB/database.connection.js"

export const insertBook=async(input)=>{
    const informationInser=await db.collection("books").insertOne(input)
    return informationInser
}

export const insertBooks=async(input)=>{
    const informationInser=await db.collection("books").insertMany(input)
    return informationInser
}


export const updateYearBook=async()=>{
    const result=await db.collection("books").updateOne({
        title:"Future"
    },
    {
        $set:{
            year:2022
        }
    }
)
return result
}


export const findBookWithTitle=async(input)=>{
    const{title}=input
    const book=await db.collection("books").findOne({
        title
    })
    if(!book){
        throw new Error("there is no book with this title",{cause:{
            status:404
        }})
    }
    return book
}


export const BooksInYear=async(input)=>{
    const{from,to}=input
    const books=await db.collection("books").find({
        year:{
            $gte:Number(from),
            $lte:Number(to)
        }
    

    }).toArray()
    if(books.length==0){
        throw new Error("there is no books in their years ",{cause:{
            status:404
        }})
    }
    return books
}


export const BooksHasGenre=async(input)=>{
    const{genre}=input
    const books=await db.collection("books").find({
        genres:genre
    

    }).toArray()
    if(books.length==0){
        throw new Error("there is no books has genre you need ",{cause:{
            status:404
        }})
    }
    return books
}


export const getThreeBooks=async()=>{
    const books=await db.collection("books").find().sort({year:-1}).skip(2).limit(3).toArray()
    if(books.length==0){
        throw new Error("there is no books",{
            cause:{
                status:404
            }
        })
    }
    return books
}


export const getBooksWithINTYear=async()=>{
    const books=await db.collection("books").find(
        {
            year:{
                $type:"int"
            }
        }
    ).toArray()

    if(books.length==0){
        throw new Error("there is no book year field int",{cause:{
            status:404
        }})
    }
    return books
}



export const excludeGenres=async()=>{
    const books=await db.collection("books").find(
       {
        genres:{
            $nin:["Horror","Science Fiction"]
        }
       }
    ).toArray()

    if(books.length==0){
        throw new Error("there is no book has genre horror or science fiction",{cause:{
            status:404
        }})
    }
    return books
}


export const deletebefore2000=async(input)=>{
    const{year}=input
    const deleteinformation=await db.collection("books").deleteMany(
        {year:
            {$lt:Number(year)}
        }
    )
    return deleteinformation
}


export const aggregate1=async()=>{
    const books=await db.collection("books").aggregate([
        {
            $match:{
                year:{
                    $gt:2000
                }
            }
        },
        {
            $sort:{
                year:-1
            }
        }
    ]).toArray()
    if(books.length==0){
        throw new Error("there is no book after 2000",{cause:{
            status:404
        }})
        
    }
    return books
    
}


export const aggregate2=async()=>{
    const books=await db.collection("books").aggregate([
        {
            $match:{
                year:{
                    $gt:2000
                }
            }
        },
        {
            $project:{
                _id:0,
                title:1,
                author:1,
                year:1
            }
        }
        
    ]).toArray()
    if(books.length==0){
        throw new Error("there is no book after 2000",{cause:{
            status:404
        }})
        
    }
    return books
    
}

export const aggregate3=async()=>{
    const books=await db.collection("books").aggregate([
        {
            $unwind:"$genres"
        },
        {
            $project:{
                _id:0,
                title:1,
                genres:1
                
            }
        }
        
    ]).toArray()
    if(books.length==0){
        throw new Error("there is no book with genre",{cause:{
            status:404
        }})
        
    }
    return books
    

}


export const aggregate4=async()=>{
    const logswithBooks=await db.collection("logs").aggregate([{
       
        $lookup:{
            from:"books",
            localField:"book_id",
            foreignField:"_id",
            as:"book_details"
        }
    },
    {
        $project:{
             _id: 0,
                action: 1,
                "book_details.title": 1,
                "book_details.author": 1,
                "book_details.year": 1
        }
    }
    ]).toArray()

    if(logswithBooks.length==0){
        throw new Error("there is no book details",{cause:{
            status:404
        }})
        
    }

    return logswithBooks


}