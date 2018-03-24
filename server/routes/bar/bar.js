///////////////////////////////////
//Find bar request route handler //
///////////////////////////////////
import express from "express";
import axios from "axios";
import Businesses from "../../model/bar";

import privateEnv from "../../config/private_keys";

const router = express.Router();

////////////////////////////
//Find bars route handler //
////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////////////
//Indicate user going to a certain bar & remove user from a certain bar route handler //
////////////////////////////////////////////////////////////////////////////////////////
router.post("/update", (req, res) => {
  const { barID, businessID, userID } = req.body.data;
  Businesses.findOne({ _id: businessID }).then((bar) => {
    if (bar) {
      const business = bar;
      let i = 0;
      const N = bar.businesses.length;
      for (i; i < N; i++) {
        if (business.businesses[i]._id.toString() === barID) {
          let j = 0;
          const L = business.businesses[i].attendees.length;
          if (L === 0) {
            business.businesses[i].attendees.push(userID);
            business.businesses[i].going_count++;
            business.save().then((result) => {
              res.json({ result });
            });
          } else {
            for (j; j < L; j++) {
              if (business.businesses[i].attendees[j] === userID) {
                const position = business.businesses[i].attendees.indexOf(userID);
                business.businesses[i].attendees.splice(position, 1);
                business.businesses[i].going_count--;
                business.save().then((result) => {
                  res.json({ result });
                });
              }
            }
          }
        }
      }
    }
  });
});

export default router;
