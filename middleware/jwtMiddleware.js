const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    console.log(`Inside JWT Middleware`);

    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);

    try {
        const jwtResponse = jwt.verify(token, 'secretKey')
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        console.log(req.payload);
        next()

    } catch (error) {
        res.status(401).json(`Authorization failed due to ${error}`)
    }
}

module.exports = jwtMiddleware



// const jwt = require('jsonwebtoken');

// const authenticate = (req, res, next) => {
//     const token = req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) {
//         return res.status(401).json({
//             success: false,
//             message: 'Authorization token required'
//         });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

//         // Verify required token claims
//         if (!decoded.userId || !decoded.companyId) {
//             throw new Error('Invalid token claims');
//         }

//         req.user = decoded;
//         next();
//     } catch (error) {
//         console.error('JWT Error:', error.message);
//         res.status(401).json({
//             success: false,
//             message: 'Invalid or expired token'
//         });
//     }
// };

// module.exports = { authenticate };