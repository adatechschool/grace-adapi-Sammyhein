import { Router } from "express";
import pool from "../db.js";

const router = Router()
// ---------------------------------------------
// ----------------- THEMES --------------------
// ---------------------------------------------

// GET /themes
router.get("/", async function (req, res) {

    try{
    //créer une constante qui va chercher le contenu de pool pour utiliser le sql qu'on lui met
    const { rows } = await pool.query("SELECT * FROM themes");
    //on retourne le résultat
    res.json(rows);

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})

// GET /themes/:id
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id; //récupère l'id de l'URL
        const { rows } = await pool.query(`SELECT * FROM themes WHERE id = ${id}`);
        res.json(rows); //renvoie la première ligne trouvée

    } catch (err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})

//POST /themes/post
router.post("/post", async function (req, res) {

    try{
    //on peut continuer à mettre la const { rows } mais actuellement elle n'est pas nécessaire
    //la je lui dit ce qu'il faut faire dans le format que j'aurais mis dans SQL
    await pool.query("INSERT INTO themes (id, name, description) SELECT 5, 'Adapi','test Adapi' ")

    //il ne va pas directement m'afficher les { rows } même si je le met dans res.json() , c'est pour ça qu'il n'est pas trop nécéssaire et que j'ai mis un message à la place
    console.log("La base de donnée dans la table 'themes' à un ajout")
    res.json("La base de donnée dans la table 'themes' à un ajout")

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
    
})


// PUT /themes/put
router.put("/put", async function (req, res){

    try{

    await pool.query("UPDATE themes SET description = 'Bonjour, je suis un test du PUT' WHERE id = 5")
    res.json("Une description dans la table 'themes' à été modifié")

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})

//DELETE /themes/delete
router.delete("/delete", async function(req, res){

    try{
    await pool.query("DELETE FROM themes WHERE id = 5")
    res.json("Attention, vous avez supprimé une information")

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})

export default router
