const router = require("express").Router();
const todoSchema = require("../models/index");

router
  .get("/", async (_req, res) => {
    const getting = await todoSchema.find();
    res.render("../view/index.ejs", { todo: getting });
  })


module.exports = router;
