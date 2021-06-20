const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env["MONGO_URI"], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

const issueSchema = new mongoose.Schema(
  {
    project: String,
    assigned_to: { type: String, default: "" },
    status_text: { type: String, default: "" },
    open: { type: Boolean, default: true },
    issue_title: String,
    issue_text: String,
    created_by: String,
  },
  { timestamps: { createdAt: "created_on", updatedAt: "updated_on" } }
);

let Issue = mongoose.model("Issue", issueSchema);

const createIssue = (args, done) => {
  issueDoc = new Issue(args);
  issueDoc.save((err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};
const updateIssue = (id, args, done) => {
  findById(id, (err, data) => {
    if (err) return done(true);
    if (!data) return done(true);
    for (const arg in args) {
      data[arg] = args[arg];
    }
    Issue.findByIdAndUpdate(id, args, (err, data) => {
      if (err) return done(err);
      return done(null, data);
    });
  });
};

const findIssues = (args, done) => {
  Issue.find(args, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

const deleteById = (id, done) => {
  Issue.findByIdAndRemove(id, (err, data) => {
    if (err) {
      console.log(err);
      return done(true);
    }
    return done(false, data);
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

module.exports = { createIssue, updateIssue, findIssues, deleteById };
