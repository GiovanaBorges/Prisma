import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { GetAllUserController } from "../modules/users/useCases/getAllUsers/getAllUsersController";

const userRoutes = Router();

const createUserController = new CreateUserController();
const getAllUserController = new GetAllUserController();

userRoutes.post("/", createUserController.handle);
userRoutes.get("/", getAllUserController.handle);

export { userRoutes };
