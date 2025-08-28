import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectDB } from "./config/db.js"

const PORT  = process.env.PORT || 4000

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

connectDB()

app.get( "/",(req,res) => {
    res.send("Servidor Ok")
})


app.listen(PORT,() => {
    console.log(`Servidor rodando na porta ${PORT}`)
})