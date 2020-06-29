const mongoose = require("mongoose");

const recordShema = new mongoose.Schema({
  name: String,
  detail: String,
  date: Date,
});

const Record = mongoose.model("Record", recordShema);

exports.Record = Record;
