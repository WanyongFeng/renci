const mongoose = require("mongoose");
const db = function () {
  mongoose
    .connect("mongodb://localhost/renci")
    .then(() => console.log("Connected to Mongo"))
    .catch((err) => console.error("failed to connet", err));
};

exports.db = db;
