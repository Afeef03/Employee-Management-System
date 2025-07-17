import { Router } from "express";
import {
  getEmployee,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployee,
  getJoiningStats,
  getPieChartStats
} from "../controllers/employee.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const employeeRouter = Router();

employeeRouter.get('/search', authorize, searchEmployee); 

employeeRouter.get('/', getEmployees);
employeeRouter.get('/joining-stats', getJoiningStats);
employeeRouter.get('/pie-chart',getPieChartStats);

employeeRouter.get('/:id', authorize, getEmployee);
employeeRouter.put('/:id', authorize, updateEmployee);
employeeRouter.delete('/:id', deleteEmployee);

employeeRouter.post('/', createEmployee);

export default employeeRouter;
