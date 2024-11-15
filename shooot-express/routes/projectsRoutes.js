const express = require("express");
const { searchProject } = require("../controllers/projectsController");
const router = express.Router();

router.get("/search", searchProject);

module.exports = router;
