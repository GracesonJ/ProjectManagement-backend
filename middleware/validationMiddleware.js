// // validationMiddleware.js
// const mongoose = require('mongoose');

// exports.validateObjectId = (req, res, next) => {
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//         return res.status(400).json({
//             success: false,
//             error: 'Invalid ID format'
//         });
//     }
//     next();
// };