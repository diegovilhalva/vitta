import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId
        if (!userId) {
            return res.status(400).json({ message: "Usuário inválido" })
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "Usuário não encontrado" });
        }
         const { password: _, ...userData } = user.toObject()
        return res.status(200).json({user:userData});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro no servidor.", error: error.message });
    }
}