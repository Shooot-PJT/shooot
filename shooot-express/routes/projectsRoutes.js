const express = require("express");
const { searchProject, searchApisUrls, searchTestCase } = require("../controllers/projectsController");
const router = express.Router();

router.get("/search", searchProject);
router.get("/domains/apis", searchApisUrls);
router.get("/domains/apis/testcases", searchTestCase);

module.exports = router;
