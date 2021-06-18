"use strict";
const db = require("./../db");

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let project = req.params.project;
      const filter = { project };
      for (const el in req.params.query) {
        filter[el] = req.query[el];
      }
      db.findIssues(filter, (err, data) => {
        if (err) {
          console.log(err);
          return res.json({ error: "server error" });
        }
        return res.json(data);
      });
    })

    .post(function (req, res) {
      let project = req.params.project;
      const newIssue = { project };
      for (el in req.params.query) {
        newIssue[el] = req.query[el];
      }
      if (!checkRequiredFields(newIssue))
        return res.json({ error: "required field(s) missing" });

      db.createIssue(newIssue, (err, data) => {
        if (err) {
          console.log(err);
          return res.json({ error: "internal server error" });
        }
        return res.json(data);
      });
    })

    .put(function (req, res) {
      let project = req.params.project;
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};

const checkRequiredFields = (obj) => {
  if (
    !obj.issue_title ||
    !obj.issue_text ||
    !obj.created_by ||
    !obj.assigned_to ||
    !obj.status_text ||
    !obj.project
  )
    return false;
  return true;
};
