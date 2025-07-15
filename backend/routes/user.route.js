import { Router } from "express";
import { getUser, getUserData, getUsers, updateUser } from "../controllers/user.controller.js";
import { authorize, checkAdmin } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/me", authorize, getUserData)

userRouter.get('/:id', authorize, checkAdmin, getUser);
userRouter.get('/', getUsers);

userRouter.put("/:id", updateUser)
export default userRouter;