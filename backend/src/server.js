import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

import notesRoutes from './routes/notesRoutes.js'
import {connectDB} from './config/db.js'
// import rateLimiter from './middleware/rateLimiter.js'

dotenv.config()
const PORT = process.env.PORT || 5001


const app = express();
const __dirname = path.resolve() // gives the current directory path

if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin: "http://localhost:5173"
    }))
}


app.use(express.json()) // this middleware will parse JSON bodies: req.body
// app.use(rateLimiter)


// simple custom middleware
// app.use(function(req, res, next){
//     console.log(`Request Method is ${req.method} and Request URL is ${req.url}`)
//     next()
// })



app.use("/api/notes", notesRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", function(req, res){
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}

connectDB().then(function(){
    app.listen(PORT, function(){
    console.log("Server started on PORT: ", PORT)
})
})