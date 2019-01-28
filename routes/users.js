import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ request: "GET" });
});

router.post("/", (req, res) => {
  req.body.user ? res.send(req.body.user) : res.send({});
});

router.put("/:id", (req, res) => {
  res.send({ request: "UPDATE", id: req.params.id });
});

router.delete("/:id", (req, res) => {
  res.send({ request: "DELETE", id: req.params.id });
});

export default router;
