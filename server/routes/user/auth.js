///////////////////////////////////////////////
//User one time signup request route handler //
///////////////////////////////////////////////
import express from "express";
import User from "../../model/user";

import parseErrors from "../../utils/parseError";

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body.data;
  const user = new User({
    email,
  });
  user.setPassword(password);
  user.save().then((userRecord) => {
    res.json({ user: userRecord });
  }).catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

export default router;
