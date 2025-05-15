import jwt from 'jsonwebtoken';
import ErrorResponse from '../helpers/helper.error';

const generateToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '9999d' });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

const authCheck = (req: any, res: any, next: () => void) => {
  const token = req.headers.authorization;

  if (!token) {
    return ErrorResponse.Unauthorized(res, res, 'Unauthorized: Token not sent');
  }

  const getToken = token.split(' ')[1];

  try {
    const decoded = verifyToken(getToken);
    req.account = decoded;
    next();
  } catch (error) {
    return ErrorResponse.Unauthorized(req, res, 'Unauthorized: you are not authorized');
  }
};

export { generateToken, verifyToken, authCheck };
