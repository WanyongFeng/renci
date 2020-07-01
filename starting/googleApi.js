const { google } = require("googleapis");
const keys = require("../keys.json");
const { content } = require("googleapis/build/src/apis/content");

const clientSH = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ["https://www.googleapis.com/auth/spreadsheets"]
);

const clientDOC = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ["https://www.googleapis.com/auth/documents.readonly"]
);

exports.clientSH = clientSH;
exports.clientDOC = clientDOC;
