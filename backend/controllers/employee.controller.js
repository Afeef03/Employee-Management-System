import Employee from "../models/employee.model.js";
import mongoose from "mongoose";

// GET ALL EMPLOYEES
// export const getEmployees = async (req, res, next) => {
//   try {
//     const employees = await Employee.find();

//     res.status(200).json({
//       success: true,
//       data: {
//         employees,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// GET ONE EMPLOYEE BY ID
export const getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      const error = new Error("Employee not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: {
        employee,
      },
    });
  } catch (error) {
    next(error);
  }
};

// CREATE NEW EMPLOYEE
export const createEmployee = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      dateOfJoining,
      currentCTC,
      designation,
      department,
      status,
    } = req.body;

    const todayIST = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    todayIST.setHours(0, 0, 0, 0);

    const joiningDate = dateOfJoining ? new Date(dateOfJoining) : todayIST;

    const existingEmployee = await Employee.findOne({ email }).session(session);

    if (existingEmployee) {
      const error = new Error("Employee already exists");
      error.statusCode = 409;
      throw error;
    }

    const newEmployee = await Employee.create(
      [
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          dateOfJoining: joiningDate,
          currentCTC,
          designation,
          department,
          status,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Employee Created",
      data: {
        employee: newEmployee[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

//UPDATE EMPLOYEE
export const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      status,
      department,
      email,
      designation,
      currentCTC,
      dateOfJoining,
      phoneNumber,
    } = req.body;

    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (status) updateData.status = status;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (department) updateData.department = department;
    if (currentCTC) updateData.currentCTC = currentCTC;
    if (dateOfJoining) updateData.dateOfJoining = dateOfJoining;
    if (designation) updateData.designation = designation;
    if (email) updateData.email = email;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEmployee) {
      const error = new Error("Employee not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "Employee Updated",
      data: updatedEmployee,
    });
  } catch (error) {
    next(error);
  }
};

//DELETE EMPLOYEE
export const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      const error = new Error("Employee not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "Employee deleted",
      deletedEmployee,
    });
  } catch (error) {
    next(error);
  }
};



export const getJoiningStats = async (req, res, next) => {
  try {
    const today = new Date();
    today.setUTCHours(23, 59, 59, 999);

    const startDate = new Date(today);
    startDate.setUTCDate(today.getUTCDate() - 6);
    startDate.setUTCHours(0, 0, 0, 0);

    const data = await Employee.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: today,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const result = [];
    for (let i = 0; i < 7; i++) {
      const current = new Date(startDate);
      current.setUTCDate(startDate.getUTCDate() + i);
      const formatted = current.toISOString().split("T")[0];

      const found = data.find((d) => d._id === formatted);
      result.push({
        date: formatted,
        count: found ? found.count : 0,
      });
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error in getJoiningStats:", error);
    next(error);
  }
};

export const getPieChartStats = async (req, res, next) => {
  try {
    const employee = await Employee.aggregate([
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

export const addBulkEmployees = async (req, res, next) => {
  try {
    const { employees } = req.body;

    if (!employees || !Array.isArray(employees)) {
      return res.status(400).json({ message: "Invalid Data" })
    }

    await Employee.insertMany(employees);

    res.status(200).json({
      message: "Upload successfull"
    })
  } catch (error) {
    next(error)
  }
}

export const getEmployees = async (req, res, next) => {
  try {
    const { search = "", status, department, designation } = req.query;
    const query = {};

    // Search logic
    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [
        { firstName: regex },
        { lastName: regex },
        { email: regex },
        { phoneNumber: regex },
      ];
    }

    // Filter logic
    if (status) query.status = status;
    if (department) query.department = { $regex: department, $options: "i" };
    if (designation) query.designation = designation;

    const employees = await Employee.find(query);

    res.status(200).json({
      data: {
        employees,
      },
    });
  } catch (error) {
    next(error);
  }
};