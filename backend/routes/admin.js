const express = require("express");
const progressController = require("../controllers/progress.controller");
const jwt = require("jsonwebtoken");
const models = require("../models");
const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.get("/average", adminController.average);
router.get("/count", adminController.count);
router.get("/leaderboard", adminController.leaderboard);


module.exports=router;