// const jwt = require('jsonwebtoken');
// const User = require('../model/userModel');

// const authenticate = async (req, res, next) => {
//     try {
//         // Check for token in headers
//         const authHeader = req.headers.authorization;
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return res.status(401).json({ 
//                 success: false,
//                 message: 'No token provided or malformed' 
//             });
//         }

//         const token = authHeader.split(' ')[1];
        
//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
//         // Check if user still exists
//         const user = await User.findById(decoded.id);
//         if (!user) {
//             return res.status(401).json({ 
//                 success: false,
//                 message: 'User belonging to this token no longer exists' 
//             });
//         }

//         // Attach user to request
//         req.user = user;
//         next();
//     } catch (error) {
//         console.error('Authentication error:', error);
        
//         let message = 'Not authorized';
//         if (error.name === 'JsonWebTokenError') {
//             message = 'Invalid token';
//         } else if (error.name === 'TokenExpiredError') {
//             message = 'Token expired';
//         }

//         return res.status(401).json({ 
//             success: false,
//             message 
//         });
//     }
// };

// module.exports = authenticate;

// module.exports = { authenticate };
