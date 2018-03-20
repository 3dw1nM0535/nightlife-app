///////////////////////////////////
//Find bar request route handler //
///////////////////////////////////
import express from "express";
import axios from "axios";
import Businesses from "../../model/bar";

import privateEnv from "../../../config/private_keys";

const router = express.Router();

router.post("/find", (req, res) => {
  const { data } = req.body;
  Businesses.findOne({ location: data.location }).then((bars) => {
    if (bars) {
      res.json({ bars });
    } else {
      axios.get(`https://api.yelp.com/v3/businesses/search?location=${data.location}&categories=bars`, {
        headers: { Authorization: `Bearer ${privateEnv.API_KEY}` },
      }).then((response) => {
        if (response.data) {
          const { businesses } = response.data;
          const { location } = req.body.data;
          const business = new Businesses({
            businesses,
            location,
          });
          business.save().then((result) => {
            if (result) {
              res.json({ bars: result });
            } else {
              res.json({});
            }
          });
        }
      });
    }
  });
});

export default router;
