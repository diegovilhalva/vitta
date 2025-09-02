import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import { loginSchema, signUpSchema } from "../validation/user.validation.js"
import getToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";

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
            role,
            isProfileComplete: true
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


export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Usuário não encontrado" })
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        user.resetOtp = otp
        user.otpExpires = Date.now() + 5 * 60 * 1000
        user.isOtpVerified = false
        await user.save()

        await sendOtpMail(email, otp)
        return res.status(200).json({ message: "Código enviado com sucesso" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Erro interno do servidor" })
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await User.findOne({ email })

        if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Código inválido ou expirado" })
        }

        user.isOtpVerified = true
        user.resetOtp = undefined
        user.otpExpires = undefined
        await user.save()

        return res.status(200).json({ message: "Código verificado com sucesso" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Erro interno do servidor" })
    }
}



export const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.isOtpVerified) {
            return res.status(400).json({ message: "Necessário código de verificação para continuar" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.isOtpVerified = false;
        await user.save();
        return res.status(200).json({ message: "Senha redefinida com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
}

export const googleLogin = async (req, res) => {
    try {
        const { email, fullName } = req.body;
        console.log(fullName)
        let user = await User.findOne({ email });

        // Se não existir, cria com dados básicos
        if (!user) {
            user = new User({
                fullName,
                email,
                password: null, // sem senha
                role: null,     // será definido no complete profile
                mobile: null,   // será definido no complete profile
                provider: "google"
            });
            await user.save();
        }

        const token = getToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login com Google realizado.",
            user:sanitizeUser(user),
            needsProfileCompletion: !user.role || !user.mobile
        });


      
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro no servidor.", error: error.message });
    }
};

export const completeProfile = async (req, res) => {
    try {
        const { role, mobile } = req.body;
        const userId = req.userId; 
        console.log(userId)
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        if (user.role && user.mobile) {
            return res.status(400).json({ message: "Perfil já está completo." });
        }

        user.role = role;
        user.mobile = mobile;
        user.isProfileComplete = true;
        await user.save();

        res.status(200).json({ message: "Perfil atualizado com sucesso!", user:sanitizeUser(user) });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor.", error: error.message });
    }
};

const sanitizeUser = (user) => {
  const { password, resetOtp, otpExpires, ...safeUser } = user.toObject();
  return safeUser;
};
