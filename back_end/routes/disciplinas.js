var express = require("express");
var router = express.Router();
var disciplinaController = require("../controllers/disciplinas.js");

router.get("/", disciplinaController.getDisciplinas);
router.post("/", disciplinaController.createDisciplina);
router.get("/:id", disciplinaController.getOneDisciplina);
router.put("/:id", disciplinaController.updateDisciplina);
router.delete("/:id", disciplinaController.deleteDisciplina);

module.exports = router;
