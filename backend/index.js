import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import { connectDB } from "./config/db.js"

const PORT  = process.env.PORT || 4000

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:'http://localhost:5173',credentials:true}))

connectDB()

app.get( "/",(req,res) => {
    res.send("Servidor Ok")
})


app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)

app.listen(PORT,() => {
    console.log(`Servidor rodando na porta ${PORT}`)
})