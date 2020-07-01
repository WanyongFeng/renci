const { google } = require("googleapis");
const { clientSH, clientDOC } = require("./starting/googleApi");
const { db } = require("./starting/mongoose");
const { isRecord } = require("./helpers/checkContent");
const { update } = require("./helpers/updateContent");

db();

clientSH.authorize(function (error, tokens) {
  if (error) {
    console.log(error);
    return;
  } else {
    console.log("Connected to Google");
    shRun(clientSH);
  }
});

async function shRun(cl) {
  try {
    const shApi = google.sheets({ version: "v4", auth: cl });
    const opt = {
      spreadsheetId: "1qitezJlL-MQ701IX7rRBu_8wZNjq_6Ix6uo9vLODIJg",
      ranges: "Meeting Coverage as of 03-25-20!A2:A28",
      fields: "sheets/data/rowData/values/hyperlink",
    };
    let res = await shApi.spreadsheets.get(opt);
    for (url of res.data.sheets[0].data[0].rowData) {
      if (url.values) {
        temp = url.values[0].hyperlink.split("/");
        if (temp.length > 6) docRun(clientDOC, temp[5]);
        else docRun(clientDOC, "12Xd7eqF4R-2Wzfb0ZgLlMNsQFzc9gNWrWyhtpWgHNis");
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function docRun(cl, id) {
  try {
    const docApi = google.docs({ version: "v1", auth: cl });
    const opt = {
      documentId: id,
    };
    let data = await docApi.documents.get(opt);
    for (let ele of data.data.body.content) {
      if (!ele.paragraph) continue;
      if (!ele.paragraph.elements[0].textRun) continue;
      const content = ele.paragraph.elements[0].textRun.content.trim();
      if (isRecord(content)) update(content);
    }
  } catch (err) {
    console.log(err);
  }
}
