
import { clerk } from '../config/clerkConfig.js';

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const user = await clerk.users.verifyToken(token);  

    req.user = user;  
    next();  
  } catch (err) {
    console.error('Error verifying token:', err);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default authenticateToken;
