///////////////////////////////////
//Find bar request route handler //
///////////////////////////////////
import express from "express";
import axios from "axios";

import privateEnv from "../../../config/private_keys";

const router = express.Router();

router.post("/find", (req, res) => {
  const { data } = req.body;
  axios.get(`https://api.yelp.com/v3/businesses/search?location=${data.location}&categories=bars`, {
    headers: { Authorization: `Bearer ${privateEnv.API_KEY}` },
  })
    .then((response) => {
      res.json({ bars: response.data });
    });
});

export default router;
