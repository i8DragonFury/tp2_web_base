const express = require("express");

const controleursProf = require("../controllers/prof-controlleurs")
const router = express.Router();

router.post("/", controleursProf.ajoutProf);
router.get("/:profId", controleursProf.getProfId);
router.patch("/:profId", controleursProf.updateProf);
router.delete("/:profId", controleursProf.supprimerProf);

module.exports = router;