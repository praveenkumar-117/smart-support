const bcrypt = require("bcryptjs");
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find().select("-password -activeTokenHash");

    if (allUsers.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No user found",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "user found",
        allUsers,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "unable to find users" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const userData = await User.findById(id).select(
      "-password -activeTokenHash",
    );
    if (!userData) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "user found",
        userData,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "unable to find user",
    });
  }
};



const updateUser = async (req, res) => {
  const { name, email, personalNumber, address } = req.body;

  try {
    const userData = await User.findById(req.user);

    if (!userData) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

   
if (name !== undefined) userData.name = name;

if (email !== undefined) {
  const existingUser = await User.findOne({
    email,
    _id: { $ne: userData._id },
  });

  if (existingUser) {
    return res.status(409).json({
      status: false,
      message: "Email already exists",
    });
  }

  userData.email = email;
}

if (personalNumber !== undefined) {
  userData.personalNumber = personalNumber;
}

if (address !== undefined) userData.address = address;


    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "helpdesk-profiles" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );

        stream.end(req.file.buffer);
      });

      if (userData.profileImagePublicId) {
        await cloudinary.uploader.destroy(userData.profileImagePublicId);
      }

      userData.profileImage = result.secure_url;
      userData.profileImagePublicId = result.public_id;
    }

    await userData.save();
    userData.password = undefined;
    userData.activeTokenHash = undefined;

    return res.status(200).json({
      status: true,
      message: "Profile updated successfully",
      userData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to update profile",
    });
  }
};


const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      status: false,
      message: "Current password and new password are required",
    });
  }

  try {
    const userData = await User.findById(req.user);

    if (!userData) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    const passwordMatches = await bcrypt.compare(
      currentPassword,
      userData.password
    );

    if (!passwordMatches) {
      return res.status(400).json({
        status: false,
        message: "Current password did not match",
      });
    }

    userData.password = await bcrypt.hash(newPassword, 10);
    await userData.save();

    return res.status(200).json({
      status: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Password change error:", error.message);

    return res.status(500).json({
      status: false,
      message: "Password not changed",
    });
  }
};


const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userData = await User.findByIdAndDelete(id);
    if (!userData) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "user deleted ",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "unable to Delete user",
    });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, department, role } = req.body;

  if (!name || !email || !password || !department) {
    return res.status(400).json({
      status: false,
      message: "All Field required",
    });
  }
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    return res.status(400).json({
      status: false,
      message: "user Already Exist",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      department,
      role,
    });

    const safeUser = user.toObject();
    delete safeUser.password;
    delete safeUser.activeTokenHash;

    return res.status(201).json({
      status: true,
      message: "User Created Successfully",
      user: safeUser,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  updatePassword,
};
