import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ request: "GET" });
});

router.post("/", (req, res) => {
  res.send({ request: "POST" });
});

router.put("/:id", (req, res) => {
  res.send({ request: "UPDATE", id: req.params.id });
});

router.delete("/:id", (req, res) => {
  res.send({ request: "DELETE", id: req.params.id });
});

export default router;
