const { reponse } = require("express");
const {v4 : uuidv4} = require('uuid');
const HttpErreur = require("../models/http-erreur");
const Profs = require("../models/prof");

const PROFS = [
    {
        id:"1",
        nom:"Sylvain Labranche",
        cours: []
    }
]

//get le ID d'un Professeur
const getProfId = (requete, reponse, next) => {
    const ProfID = requete.params.profId;
    const prof = PROFS.find((prof) =>{
        return prof.id === ProfID
    });

    if (!prof){
        return next(new HttpErreur("Aucun professeur trouve pour l'id fourni",404));
    }

    reponse.json({ prof });

};

//ajouter un Professeur
const ajoutProf = (requete, reponse, next) => {
    const {nom} = requete.body;

    const idExiste = PROFS.find(p => p.id === id)

    if(idExiste){
        throw new HttpErreur("Le professeur existe deja", 422);
    }

    const nouvelProf = {
        nom,
        cours:[]
    }

    PROFS.push(nouvelProf);
    console.log(PROFS)

    reponse.status(201).json(nouvelProf);
};

//modifier un Professeur
const updateProf = (requete, reponse, next) => {
    const{nom} = requete.body;
    const profId = requete.params.ProfID;

    const profModifie = {...PROFS.find(prof => prof.id === profId)};
    const indiceProf = PROFS.findIndex(prof => prof.id === profId);

    profModifie.nom = nom;
    
    PROFS[indiceProf] = profModifie;

    reponse.status(200).json({prof:profModifie});
};

//supprimer un prof
const supprimerProf = (requete, reponse, next) => {
    const profId = requete.params.profId;
    PROFS = PROFS.filter(prof => prof.id !== profId);
    reponse.status(200).json({message:"Professeur supprime"});

};

//AJOUTER COURS AU PROF
const ajouterCours = (requete, reponse, next) => {
    const { nom } = requete.body;

    let coursExiste;
  
    try {
      coursExiste = PROFS.findOne({ id: id });
    } catch {
      return next(new HttpErreur("Erreur: cours existe deja", 500));
    }
  
    if (coursExiste) {
      return next(
        new HttpErreur("Erreur: cours existe deja, veuillez vos connecter", 422)
      );
    }
  
      const nouvelleProf = new Profs({
          nom,
          description,
          profNom,
          etudiants
      });
    try{
        nouvelleProf.save();
      } catch(err){
          const erreur = new HttpErreur("Ajout du cours echoue", 500)
          return next(erreur);
      }
      reponse.status(201).json({cours: nouvelleProf});
};

exports.getProfId = getProfId;
exports.ajoutProf = ajoutProf;
exports.updateProf = updateProf;
exports.supprimerProf = supprimerProf;
exports.ajouterCours = ajouterCours;