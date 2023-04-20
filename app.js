const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3001;
const mongoose = require("mongoose");
const coursRoute = require("./routes/cours-routes");
const profRoute = require("./routes/prof-routes");
const etudiantsRoute = require("./routes/etudiants-routes");
const HttpErreur = require("./models/http-erreur");

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());

app.use("/api/profs", profRoute)
app.use("/api/cours", coursRoute)
app.use("/api/etudiant", etudiantsRoute)

app.use ((requete, reponse, next) => {
    return next(new HttpErreur("Route non trouvée", 404));
});

app.use((error, requete, reponse, next) => {
    if (reponse.headerSent) {
      return next(error);
    }
    reponse.status(error.code || 500);
    reponse.json({
      message: error.message || "Une erreur inconnue est survenue",
    });
});
mongoose.set('strictQuery', true);
 mongoose
 .connect("mongodb://127.0.0.1:27017")
 .then(() => {
     app.listen(5000)
     console.log("Connexion à la base de données réussie");
 })
 .catch(erreur => {
     console.log(erreur);
 });

//app.listen(5000);