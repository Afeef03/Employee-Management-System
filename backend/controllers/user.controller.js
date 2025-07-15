import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserData = async (req, res, next) => {
  try {
    res.status(200).json({
      data: { user: req.user },
    });
  } catch (error) {
    next(error);
  }
};


export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            name,
            email,
            location,
            phone,
            summary
        } = req.body;

        const updateUser = {}
        if (name) updateUser.name = name;
        if (email) updateUser.email = email;
        if (location) updateUser.location = location
        if (phone) updateUser.phone = phone
        if (summary) updateUser.summary = summary

        const updatedUser = await User.findByIdAndUpdate(id, { $set: updateUser },
            {
                new: true,
                runValidators: true,
            });

        if (!updatedUser) {
            const error = new Error("User does not exists");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            updateUser
        })

    } catch (error) {
        next(error);
    }
}