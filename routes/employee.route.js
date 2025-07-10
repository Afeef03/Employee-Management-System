import { Router } from "express";
import {
  getEmployee,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployee,
  getJoiningStats
} from "../controllers/employee.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const employeeRouter = Router();

employeeRouter.get('/search', authorize, searchEmployee); 

employeeRouter.get('/', authorize, getEmployees);
employeeRouter.get('/joining-stats', authorize, getJoiningStats);

employeeRouter.get('/:id', authorize, getEmployee);
employeeRouter.put('/:id', authorize, updateEmployee);
employeeRouter.delete('/:id', authorize, deleteEmployee);

employeeRouter.post('/', authorize, createEmployee);

export default employeeRouter;
