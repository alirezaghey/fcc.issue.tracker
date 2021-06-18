const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env["MONGO_URI"], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

const issueSchema = mongoose.Schema({
  project: String,
  assigned_to: String,
  status_text: String,
  open: { type: Boolean, default: true },
  issue_title: String,
  issue_text: String,
  created_by: String,
  created_on: String,
  updated_on: String,
});

let Issue = mongoose.model("Issue", issueSchema);

const createIssue = (args, done) => {
  issueDoc = new Issue(args);
  issueDoc.save((err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};
const updateIssue = (id, args, done) => {};

const findIssues = (args, done) => {
  Issue.find(args, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

const findById = (id, done) => {
  // check if id is a valid mongodb id
  if (!mongoose.isValidObjectId(id)) return done(null, null);
  Issue.findById(id, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

module.exports = { createIssue, updateIssue, findIssues };
