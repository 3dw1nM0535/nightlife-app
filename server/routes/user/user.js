////////////////////////////////////
//User auth actions route handler //
////////////////////////////////////
import express from "express";
import User from "../../model/user";

const router = express.Router();

////////////////////////
//Login route handler //
////////////////////////
router.post("/", (req, res) => {
  const { data } = req.body;
  User.findOne({ email: data.email }).then((user) => {
    if (user && user.isValidPassword(data.password)) {
      res.json({ user: user.toJSON() });
    } else {
      res.status(400).json({ errors: { global: "Invalid password" } });
    }
  });
});

export default router;
