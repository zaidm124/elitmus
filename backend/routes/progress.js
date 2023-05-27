const express = require("express");
const progressController = require("../controllers/progress.controller");
const jwt = require("jsonwebtoken");
const models = require("../models");

const router = express.Router();

router.post("/startround", progressController.startRound);
router.post("/endround", progressController.endRound);


module.exports=router;