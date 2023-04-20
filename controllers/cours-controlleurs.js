const { reponse } = require("express");
const {v4 : uuidv4} = require('uuid');
const HttpErreur = require("../models/http-erreur")
const Cours = require("../models/cours");
const { default:mongoose,mongo } = require("mongoose");

let COURS = [
    {
        id: "1",
        nom:"Web et Base",
        description:"Cours de Web et Base de donnee",
        profNom:"",
        etudiants:[]
    }
];

const getCoursById = async (requete, reponse, next) =>{
    const coursId = requete.params.coursID;
    const cours = COURS.find((cours) => {
         return cours.id === coursId;
     });

    if(!cours){
        return next(new HttpErreur("Aucun cours trouve pour l'id fourni", 404));
    }

    reponse.json({ cours });
}

const creerCours = async (requete, reponse, next) => {
    
    const {nom,description, profNom} = requete.body;

    console.log(nom)
    console.log(requete.body)

    const nouvelleCours = new Cours({
        nom: nom,
        description: description,
        profNom: profNom,
        etudiants:[]
    });
    console.log(nouvelleCours)
    try{
        await nouvelleCours.save();
        console.log(nouvelleCours)
    } catch(err){
        const erreur = new HttpErreur("Ajout du cours echoue", 500)
        return next(erreur);
    }
    reponse.status(201).json({message: "Cours ajoute"})
    //reponse.status(201).json({cours: nouvelleCours.toObject({ getters: true})});
};

const updateCours = (requete, reponse, next) => {
    const {nom, description} = requete.body;
    const coursId = requete.params.coursId;

    const coursModifiee = {...COURS.find(cours.id === coursId)};
    const indiceCours = COURS.findIndex(cours => cours.id === coursId);

    coursModifiee.nom = nom;
    coursModifiee.description = description;

    COURS[indiceCours] = coursModifiee;

    reponse.status(200).json({cours:coursModifiee});
};

const supprimerCours = (requete, reponse ,next) => {

    const coursId = requete.params.coursId;

    COURS = COURS.filter(cours => cours.id !== coursId);
    reponse.status(200).json({message: "Cours supprimee"});
};

exports.getCoursById = getCoursById;
exports.creerCours = creerCours;
exports.updateCours = updateCours;
exports.supprimerCours = supprimerCours;