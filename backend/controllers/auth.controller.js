import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import { loginSchema, signUpSchema } from "../validation/user.validation.js"
import getToken from "../utils/token.js";

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
        const token = getToken(newUser._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        const { password: _, ...userData } = newUser.toObject();
        res.status(201).json({ message: "Usuário criado com sucesso", user: userData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" })
    }
}


export const login = async (req, res) => {
    try {
    
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { email, password } = req.body;

       
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Email ou senha incorretos" });
        }

        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Email ou senha incorretos" });
        }

        
        const token = getToken(user._id);

       
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        
        const { password: _, ...userData } = user.toObject();
        res.status(200).json({ message: "Login realizado com sucesso", user: userData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
        });
        res.status(200).json({ message: "Logout realizado com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};
