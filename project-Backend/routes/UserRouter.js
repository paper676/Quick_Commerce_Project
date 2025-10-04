const express=require('express');
const { register ,login, logout, isAuth} = require('../controllers/UserController.js');
const { authUser } = require('../middlewares/AuthUser.js');

const UserRouter = express.Router();

UserRouter.post('/register',register);
UserRouter.post('/login',login);
UserRouter.get('/is-auth',authUser,isAuth);
UserRouter.get('/logout',logout);

module.exports=UserRouter