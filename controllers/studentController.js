const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ================= CREATE STUDENT (ADMIN CAN ADD) =================
exports.createStudent = async (req, res) => {
  try {
    const { name, email, enrollmentNo, course, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        error: "Student already exists with this email",
      });
    }

    const student = await User.create({
      name,
      email,
      enrollmentNo,
      course,
      password,
      role: "user",
    });

    res.status(201).json({
      success: true,
      student,
    });
  } catch (error) {
    console.error("Create student error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ================= GET ALL STUDENTS =================
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "user" })
      .select("name email enrollmentNo course createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    console.error("Get students error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ================= GET TOTAL STUDENT COUNT =================
exports.getStudentCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "user" });

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error("Count students error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ================= ADMIN: UPDATE ANY STUDENT =================
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await User.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        email: req.body.email,
        enrollmentNo: req.body.enrollmentNo,
        course: req.body.course,
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        error: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      student: updated,
    });
  } catch (error) {
    console.error("Update student error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
// ================= GET CURRENT STUDENT PROFILE =================
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user || user.role !== "user") {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get student profile error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= STUDENT: UPDATE OWN PROFILE =================
// ================= STUDENT: UPDATE OWN PROFILE =================
exports.updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware

    const { name, email, enrollmentNo, course, currentPassword, password } =
      req.body;

    // ❗ IMPORTANT FIX: explicitly select password
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ===== CHANGE PASSWORD (IF PROVIDED) =====
    if (password) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: "Current password is required to change password",
        });
      }

      const isMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      user.password = password; // will be hashed by pre-save hook
    }

    // ===== UPDATE OTHER FIELDS =====
    user.name = name || user.name;
    user.email = email || user.email;
    user.enrollmentNo = enrollmentNo || user.enrollmentNo;
    user.course = course || user.course;

    await user.save();

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        enrollmentNo: user.enrollmentNo,
        course: user.course,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= DELETE STUDENT =================
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Delete student error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
