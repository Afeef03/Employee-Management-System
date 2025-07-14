import express from 'express'
import { PORT } from './config/env.js';
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.route.js'
import employeeRouter from './routes/employee.route.js'
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import cors from "cors"
import fileUpload from 'express-fileupload';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extented: false }));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({

}))
// app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/employees", employeeRouter)
app.use("/api/v1/users", userRouter)

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send("Welcome Afeef")
})
app.listen(PORT, async () => {
  console.log(`Server running on ${PORT}`)
  await connectToDatabase()
})