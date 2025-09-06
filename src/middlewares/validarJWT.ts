import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const validarJWT = (req: Request, res: Response, next: NextFunction) => {
  // Obtener el token del header Authorization
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "No se proporcionó token" });
  }

  // El token suele venir como: "Bearer <token>", separamos
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token mal formateado" });
  }

  try {
    const secret = process.env.JWT_SECRET || "secret"; // Usa tu secreto real aquí
    const payload = jwt.verify(token, secret);
    // Opcional: guardar info del usuario en el request para usar después
    (req as any).user = payload;
    next(); // Continuar con la siguiente función/middleware
  } catch (error) {
    return res.status(401).json({ message: "Token no válido" });
  }
};
