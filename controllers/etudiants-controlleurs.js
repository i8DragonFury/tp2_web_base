const { reponse } = require("express");
const {v4 : uuidv4} = require('uuid');
const HttpErreur = require("../models/http-erreur");
const Etuds = require("../models/etudiant");
const ETUDIANTS = [
    {
        id:"1",
        nom:"Minh-Tri Max Luong",
        lesCours: []
    }
]
//GET ID DE L'ETUDIANT
const getEtudiantId = (requete, reponse, next) =>{
    const etudiantId = requete.params.etudiantId;

    const etudiant = ETUDIANTS.find((etudiant) => {
        return etudiant.id === etudiantId;
    });

    if(!etudiant){
        return next(new HttpErreur("Aucun etudiant trouve pour l'id fourni", 404));
    }

    reponse.json({ etudiant });
};

//AJOUTER UN ETUDIANT
const ajoutEtudiant = (requete, reponse, next) => {
    const {id, nom} = requete.body;

    const idExiste = ETUDIANTS.find(e => e.id === id)

    if(idExiste){
        throw new HttpErreur("L'etudiant existe deja",  422);
    }

    const nouvelEtudiant = {
        nom,
        lesCours: []
    }

    ETUDIANTS.push(nouvelEtudiant);

    reponse.status(201).json(nouvelEtudiant);
};

//MODIFIER UN ETUDIANT
const updateEtudiant = (requete, reponse, next) => {
    const {nom} = requete.body;
    const etudiantId = requete.params.etudiantId;

    const etudiantModifie = {...ETUDIANTS.find(etudiant => etudiant.id === etudiantId)};
    const indiceEtudiant = ETUDIANTS.findIndex(etudiant => etudiant.id === etudiantId);

    etudiantModifie.nom = nom;
    ETUDIANTS[indiceEtudiant] = etudiantModifie;
};

//SUPPRIMER UN ETUDIANT
const supprimerEtudiant = (requete, reponse, next) => {
    const etudiantId = requete.params.etudiantId;
    ETUDIANTS = ETUDIANTS.filter(etudiant => etudiant.id !== etudiantId);

    reponse.status(200).json({message:"Etudian supprime"});
};

//INSCRIRE ETUDIANT
const inscrireEtudiant = (requete,reponse, next) => {
    const { id, nom } = requete.body;

    let etudiantExiste;
  
    try {
      etudiantExiste = ETUDIANTS.findOne({ id : id }); //verifier si etudiant existe
    } catch {
      return next(new HttpErreur("Échec vérification etudiant existe", 500));
    }
  
    if (etudiantExiste) { //etudiant existant si on met les donnees
      return next(
        new HttpErreur("Etudiant existe déjà, veuillez vos connecter", 422)
      );
    }
  
    let nouvelEtudiant = new Etuds({
      id,
      nom,
      lesCours: [],
    });
    try {
      nouvelEtudiant.save();
    } catch (err) {
      console.log(err);
      return next(new HttpErreur("Erreur lors de l'ajout de l'etudiant", 422));
    }
    reponse
      .status(201)
      .json({ etudiant : nouvelEtudiant.toObject({ getter: true }) });
};
exports.getEtudiantId = getEtudiantId;
exports.ajoutEtudiant = ajoutEtudiant;
exports.updateEtudiant = updateEtudiant;
exports.supprimerEtudiant = supprimerEtudiant;
exports.inscrireEtudiant = inscrireEtudiant;