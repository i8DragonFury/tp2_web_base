const express = require("express");

const controleursEtudiant = require("../controllers/etudiants-controlleurs")
const router = express.Router();

router.post("/", controleursEtudiant.ajoutEtudiant);
router.get("/:etudiantId", controleursEtudiant.getEtudiantId);
router.patch("/:etudiantId", controleursEtudiant.updateEtudiant);
router.delete("/:etudiantId", controleursEtudiant.supprimerEtudiant);

module.exports = router;