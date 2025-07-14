import { Router } from "express";
import { getUser, getUserData, getUsers } from "../controllers/user.controller.js";
import { authorize, checkAdmin } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/:id', authorize, checkAdmin, getUser);
userRouter.get('/', getUsers);
userRouter.get("/me",authorize,getUserData)

export default userRouter;