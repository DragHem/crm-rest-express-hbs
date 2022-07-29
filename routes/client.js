const express = require("express");
const { db } = require("../utils/db");
const { NotFoundError } = require("../utils/error");

const clientRouter = express.Router();

clientRouter

  .get("/", (req, res) => {
    res.render("client/list-all", {
      clients: db.getAll(),
    });
  })

  .get("/:id", (req, res) => {
    const { id } = req.params;

    const client = db.getOne(id);

    if (!client) {
      throw new NotFoundError();
    }

    res.render("client/one", {
      client,
    });
  })

  .post("/", (req, res) => {
    const { name } = req.body;
    const userId = db.create(req.body);

    res.status(201).render("client/added", {
      name,
      id: userId,
    });
  })

  .put("/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    db.update(id, req.body);
    res.render("client/modified", {
      name,
      id,
    });
  })

  .delete("/:id", (req, res) => {
    const { id } = req.params;

    db.delete(id);
    res.render("client/deleted");
  })

  .get("/form/add", (req, res) => {
    res.render("client/forms/add");
  })

  .get("/form/edit/:id", (req, res) => {
    const { id } = req.params;
    const client = db.getOne(id);

    if (!client) {
      throw new NotFoundError();
    }

    res.render("client/forms/edit", {
      client,
    });
  });

module.exports = {
  clientRouter,
};
