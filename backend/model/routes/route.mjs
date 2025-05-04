import express from "express";
import { collections } from "../../database.mjs";
import * as mongodb from "mongodb";

export const projectRouter = express.Router();

// Ajouter un projet
projectRouter.post("/", async (req, res) => {
  try {
    const project = req.body;
    const result = await collections.projects.insertOne(project);

    result
      ? res.status(201).send(`Projet créé avec l'id ${result.insertedId}`)
      : res.status(500).send("Erreur lors de la création du projet.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});


// Récupérer tous les projets
projectRouter.get("/", async (_req, res) => {
  try {
    const projects = await collections.projects.find({}).toArray();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Récupérer un projet par ID
projectRouter.get("/:id", async (req, res) => {
  try {
    const id = new mongodb.ObjectId(req.params.id);
    const project = await collections.projects.findOne({ _id: id });

    project
      ? res.status(200).json(project)
      : res.status(404).send(`Projet non trouvé : ${req.params.id}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// Modifier un projet
projectRouter.put("/:id", async (req, res) => {
  try {
    const id = new mongodb.ObjectId(req.params.id);
    const update = req.body;
    const result = await collections.projects.updateOne({ _id: id }, { $set: update });

    result && result.matchedCount
      ? res.status(200).send(`Projet modifié : ${req.params.id}`)
      : res.status(404).send(`Projet non trouvé : ${req.params.id}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Supprimer un projet
projectRouter.delete("/:id", async (req, res) => {
  try {
    const id = new mongodb.ObjectId(req.params.id);
    const result = await collections.projects.deleteOne({ _id: id });

    result && result.deletedCount
      ? res.status(202).send(`Projet supprimé : ${req.params.id}`)
      : res.status(404).send(`Projet non trouvé : ${req.params.id}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Ajouter un formulaire de contact
projectRouter.post("/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
  
      // Vérification des données
      if (!name || !email || !message) {
        return res.status(400).send("Tous les champs (nom, email, message) sont obligatoires.");
      }
  
      const contact = { name, email, message, date: new Date() };
      const result = await collections.contacts.insertOne(contact);
  
      result
        ? res.status(201).send(`Contact ajouté avec l'id ${result.insertedId}`)
        : res.status(500).send("Erreur lors de l'ajout du contact.");
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  });
  
