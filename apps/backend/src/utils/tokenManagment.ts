import jwt from 'jsonwebtoken';

const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  return jwt.sign(
    { userId },
    secret,
    { expiresIn: '7d' }
  );
};

const verifyToken = (token: string): { userId: string } => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  try {
    const decoded = jwt.verify(token, secret) as { userId: string };
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export { generateToken, verifyToken };