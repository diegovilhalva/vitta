import User from "../models/user.model.js"
import bcrypt from "bcrypt";
import { signUpSchema } from "../validation/user.validation.js"

export const signUp = async (req, res) => {
    try {
        const { fullName, email, password, mobile, role } = req.body
        const { error } = signUpSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Este email já está em uso" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            mobile,
            role
        });

        await newUser.save();
        res.status(201).json({ message: "Usuário criado com sucesso" });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" })
    }
}