const express = require('express');
const router = express.Router();
const jwtMiddleware = require('./middleware/jwtMiddleware')

// Import Controllers
const companyRegController = require('./controller/CompanyRegController');
const userController = require('./controller/userController');
const projectController = require('./controller/projectController')

// Import Middlewares
const { authenticate } = require('./middleware/authMiddleware');
// const { validateObjectId } = require('./middleware/validationMiddleware');

// Company Routes
router.post('/register-company', companyRegController.companyRegister);

// Authentication Routes
router.post('/register-user', userController.userRegisterController);
router.post('/user-login', userController.userLoginController);

// User Management Routes
router.get('/all-users', jwtMiddleware, userController.getAllUsersController);
router.get('/companies/:companyId/users', jwtMiddleware, userController.getCompanyUsersController);
router.get('/users/:id', jwtMiddleware, userController.getUserById);

router.post('/add-project', jwtMiddleware,  projectController.addProjectController )

// get manager List
router.get('/get-managerlist', jwtMiddleware, userController.getManagerListController)


module.exports = router;
