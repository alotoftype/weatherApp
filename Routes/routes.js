const express = require('express');

const app = express();
const myRouter = express.Router();

myRouter.route('/').get(function (req, res) {
  console.log("this is my request", req);
  res.send("this is where we have boxes");
});
myRouter.route('/edit').get(function (req, res) {
  console.log("this is my request", req);
  res.send("this is where we edit boxes");
});

module.exports = myRouter;