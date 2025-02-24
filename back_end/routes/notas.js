var express = require("express");
var router = express.Router();
var notaController = require("../controllers/notas.js");

router.get("/", notaController.getNotas);
router.post("/", notaController.createNota);
router.get("/:id", notaController.getOneNota);
router.put("/:id", notaController.updateNota);
router.delete("/:id", notaController.deleteNota);

module.exports = router;
