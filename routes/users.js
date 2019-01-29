import express from "express";
import Validator from "validator";
import User from "../models/User";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send({ request: "GET" });
});

router.post("/", (req, res, next) => {
  if (!req.body.user || typeof req.body.user === "undefined") {
    res
      .status(500)
      .send({ signup_errors: { serverError: "user data undefined" } })
      .end();
    return;
  }

  const { name, rank, available } = req.body.user;

  const validationErrors = [];

  if (
    typeof name === "undefined" ||
    Validator.isEmpty(name) ||
    !Validator.isAlphanumeric(name)
  ) {
    validationErrors.push({
      field: "username",
      error: "username isn`t alpha numeric symbols"
    });
  }

  if (
    typeof rank === "undefined" ||
    Validator.isEmpty(rank) ||
    !Validator.isAlphanumeric(rank)
  ) {
    validationErrors.push({
      field: "rank",
      error: "rank isn`t alpha numeric symbols"
    });
  }

  if (typeof available === "undefined" || !Validator.isBoolean(available)) {
    validationErrors.push({
      field: "available",
      error: "choose available"
    });
  }

  if (validationErrors.length > 0) {
    res
      .status(500)
      .send({ signup_errors: { validationErrors } })
      .end();
    return;
  }

  User.create(req.body.user)
    .then(user => {
      res.send(user);
    })
    .catch(
      err =>
        res
          .status(500)
          .send({ signup_errors: { serverError: "user save failure" } }) //mongo db error; unprocesable
    );
});

router.put("/:id", (req, res, next) => {
  if (!req.params.id || typeof req.params.id === "undefined") {
    res
      .status(500)
      .send({ signup_errors: { serverError: "user update failure" } })
      .end();
    return;
  }

  User.findOneAndReplace({ _id: req.params.id }, req.body.user)
    .then(user => {
      User.findOne({ _id: user._id }).then(user => {
        res.send(user);
      });
    })
    .catch(
      err =>
        res
          .status(500)
          .send({ signup_errors: { serverError: "user update failure" } }) //mongo db error; unprocesable
    );
});

router.delete("/:id", (req, res, next) => {
  if (!req.params.id || typeof req.params.id === "undefined") {
    res
      .status(500)
      .send({ signup_errors: { serverError: "user delete failure" } })
      .end();
    return;
  }

  User.findOneAndDelete({ _id: req.params.id })
    .then(user => {
      res.send(user);
    })
    .catch(
      err =>
        res
          .status(500)
          .send({ signup_errors: { serverError: "user delete failure" } }) //mongo db error; unprocesable
    );
});

export default router;
