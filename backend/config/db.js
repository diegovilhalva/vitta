import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Banco de dados conectado")
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados")
        process.exit(1)
    }
}
