const express = require("express");
const { mockData } = require("../controllers/mockController");
const router = express.Router();

router.post("/data", mockData);

module.exports = router;
