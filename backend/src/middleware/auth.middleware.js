import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Missing token" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // { id, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export function checkRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }

    next();
  };
}
