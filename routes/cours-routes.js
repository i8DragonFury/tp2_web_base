const express = require("express");
const router = express.Router();
const controleursCours = require("../controllers/cours-controlleurs")

router.get("/:coursID", controleursCours.getCoursById);
router.post("/", controleursCours.creerCours);
router.patch("/:coursID", controleursCours.updateCours);
router.delete("/:coursID", controleursCours.supprimerCours);


module.exports = router;