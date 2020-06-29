const { Record } = require("../models/record");

const update = function (string) {
  const end = string.indexOf("]");
  const origin = string.substring(1, end);
  const key = checkAnoymity(origin) ? "Unknown" : origin;
  const value = string.substring(end + 1);
  createRecord(key, value);
};

const checkAnoymity = function (string) {
  return (
    string.trim().length === 0 ||
    string === "Your name here" ||
    string === "WHO?"
  );
};

const createRecord = async function (key, value) {
  const record = new Record({
    name: key,
    detail: value,
  });
  await record.save();
};

exports.update = update;
