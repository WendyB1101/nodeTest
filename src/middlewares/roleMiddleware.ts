import { Request, Response, NextFunction } from "express";

// Checks if user is an admin
export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};

// Checks if user is admin OR accessing their own data
export const adminOrSelf = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  const idParam = req.params.id;

  if (user.role !== "admin" && user.id !== idParam) {
    return res.status(403).json({ message: "Forbidden: Admin or owner only" });
  }

  next();
};