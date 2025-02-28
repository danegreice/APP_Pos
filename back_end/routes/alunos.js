var express = require("express");
var router = express.Router();
var alunoController = require("../controllers/alunos.js");

router.get("/", alunoController.getAlunos);
router.post("/", alunoController.createAluno);
router.get("/:id", alunoController.getOneAluno);
router.put("/:id", alunoController.updateAluno);
router.put("/:id/foto", alunoController.updatePhotoAluno);
router.delete("/:id", alunoController.deleteAluno);

module.exports = router;
