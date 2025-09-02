import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ message: "Acesso negado." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido ou expirado." });
  }
};
