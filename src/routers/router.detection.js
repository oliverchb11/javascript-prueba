const express = require("express");
const router = express.Router();
const controller = require('../controller/detection')
router.get("/", controller.listarDatos);
router.post("/detector", controller.dataPost)
module.exports = router;