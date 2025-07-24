import { Router } from "express";
import {
  getEmployee,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  // searchEmployees,
  getJoiningStats,
  getPieChartStats,
  addBulkEmployees
} from "../controllers/employee.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const employeeRouter = Router();


// employeeRouter.get('/search', authorize, searchEmployees);

employeeRouter.get('/', getEmployees);
employeeRouter.get('/joining-stats', getJoiningStats);
employeeRouter.get('/pie-chart', getPieChartStats);

employeeRouter.get('/:id', authorize, getEmployee);
employeeRouter.put('/:id', authorize, updateEmployee);
employeeRouter.delete('/:id', deleteEmployee);

employeeRouter.post('/', createEmployee);
employeeRouter.post('/upload-csv', addBulkEmployees)

export default employeeRouter;
