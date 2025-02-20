import express from "express";
const Router = express.Router()
import { signup, login, logout, authCheck } from "../controllers/authController.js";
import { protectRoutes } from "../middleware/protectMiddleware.js";


// Router.post('/', home)

Router.post('/signup', signup)

Router.post('/login', login)

Router.post('/logout', logout)

Router.get('/authcheck', protectRoutes, authCheck)


export default Router