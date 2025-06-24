import express from "express";
import { User } from "../databse/db.js";
import { registerUserSchema, userLoginSchema } from "../middleware/zod.js";
import JWT from "jsonwebtoken";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    //body validation for login
    const bodyValidation = registerUserSchema.safeParse(req.body);
    if (!bodyValidation.success) {
      const errors = bodyValidation.error.errors.map((err) => ({
        message: err.message,
      }));
      return res.status(400).json({
        errors: bodyValidation.error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
        message: `${errors[0].message}`,
      });
    }
    //signup details from the FE
    const { name, email, password } = req.body;
    //creating user based on details from FE
    await User.create({
      name: name,
      email: email,
      password: password,
    });
    //response to the FE
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (err) {
    //just in any server error case
    res.status(500).json({
      message: "server error",
      err: err,
    });
  }
});

//login logic
router.post("/login", async (req, res) => {
  try {
    //body validation for login
    const bodyValidation = userLoginSchema.safeParse(req.body);
    if (!bodyValidation.success) {
      const errors = bodyValidation.error.errors.map((err) => ({
        message: err.message,
      }));
      return res.status(400).json({
        errors: bodyValidation.error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
        message: `${errors[0].message}`,
      });
    }
    //login details from FE
    const { email, password } = req.body;
    //checking the details on the backend.
    const isUser = await User.findOne({ email: email });
    //checks if user does not exist
    if (!isUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    //check if the password is correct
    const passwordValidation = await isUser.comparePassword(password);
    if (!passwordValidation) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    //if user exists make a jwt and send it to FE
    const token = await JWT.sign(
      {
        id: isUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    //for security purposes
    res.cookie("authorization", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    //send the response to the FE with token to add it into the local storage
    res.status(200).json({
      message: "logged in successfuly",
      name: isUser.name,
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      message: "server error",
      err: err,
    });
  }
});

router.get("/me", protect, async (req, res) => {
  try {
    const userInfo = await User.findById(req.user).select("-password");
    res.status(200).json({ userInfo });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

router.post("/me", protect, async (req, res) => {
  try {
    const budgetUpdate = await User.findByIdAndUpdate(req.user, {
      monthlyBudget: req.body.amount,
    });
    res.status(200).json({
      NewBudget: budgetUpdate,
    });
  } catch (err) {
    res.json({
      err,
    });
  }
});

router.post("/logout", protect, async (req, res) => {
  res.clearCookie("authorization");
  res.status(200).json({ message: "You are logged out successfuly." });
});

export default router;
