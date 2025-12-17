import { Router } from "express";
import pool from "../db.js";

const router = Router()

// ---------------------------------------------
// ----------------- RESOURCES -----------------
// ---------------------------------------------

// GET /resources
router.get("/", async function (req, res) {
    try{

    //créer une constante qui va chercher le contenu de pool pour utiliser le sql qu'on lui met
    const { rows } = await pool.query("SELECT * FROM resources");
    //on retourne le résultat
    res.json(rows);

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})


// GET /resource
router.get("/unique", async function (req, res) {

    try{

    const { rows } = await pool.query("SELECT * FROM resources WHERE title = 'Introduction à React'")

    res.json(rows)

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
    
})

// GET /resources/:id
// router.get("/resources/:id", async (req, res) => {
//     try {
//         const id = req.params.id; //récupère l'id de l'URL
//         const { rows } = await pool.query(`SELECT * FROM resources WHERE id = ${id}`);
//         res.json(rows); //renvoie la première ligne trouvée

//     } catch (err){
//         console.error(err);
//         res.status(500).json({ error : err.message});
//     }
// })

//AUTRE METHODE AU NIVEAU DU CONST ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params; //récupère l'id de l'URL
        const { rows } = await pool.query(`SELECT * FROM resources WHERE id = $1`, [id]); // si il y avait d'autre valeur dans le tableau que le id (ex: [id, name, description]) dans le WHERE on mettrait également $2 pour name et $3 pour descritpion
        res.json(rows); //renvoie la première ligne trouvée

    } catch (err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})

//POST pour ajouter des informations (attention : pas modifier)

router.post("/post", async function (req, res) {

    try{
    //on peut continuer à mettre la const { rows } mais actuellement elle n'est pas nécessaire
    //la je lui dit ce qu'il faut faire dans le format que j'aurais mis dans SQL
    await pool.query("INSERT INTO resources (id, title, type, is_ada, theme_id) SELECT 7, 'Test Ajout BDD', 'guide'::resource_type, true, 1")

    //il ne va pas directement m'afficher les { rows } même si je le met dans res.json() , c'est pour ça qu'il n'est pas trop nécéssaire et que j'ai mis un message à la place
    console.log("La base de donnée à une modification")
    res.json("La base de donnée à un ajout")

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
    
})

//RAPPEL DE COMMENT JE LUI PARLE DANS SQL :

// INSERT INTO resources (id, title, url, description, type, is_ada, theme_id)
// SELECT 1, 'Introduction à React', 'https://react.dev', 'Guide officiel React', 'guide'::resource_type, true, 1
// UNION SELECT 2, 'SQL pour débutants', 'https://example.com/sql', 'Cours SQL complet', 'video'::resource_type, false, 3
// UNION SELECT 3, 'Exercices JavaScript', 'https://example.com/js', 'Pratique JS', 'exercise'::resource_type, false, 1
// UNION SELECT 4, 'Créer une API en node', 'https://example.com/node', 'Projet node', 'projet'::resource_type, false, 2;

// AUTRE METHODE SI ON VEUT UTILISER LE BODY DANS THUNDER CLIENT

router.post("/postTitle", async function (req, res) {

    try{

    const title = req.body.title
    //on peut continuer à mettre la const { rows } mais actuellement elle n'est pas nécessaire
    //la je lui dit ce qu'il faut faire dans le format que j'aurais mis dans SQL
    await pool.query("INSERT INTO resources (id, title) VALUES (23, $1)", [title])

    //il ne va pas directement m'afficher les { rows } même si je le met dans res.json() , c'est pour ça qu'il n'est pas trop nécéssaire et que j'ai mis un message à la place
    console.log("La base de donnée à une modification")
    res.json("La base de donnée à un ajout")

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
    
})

// PUT , pour modifier une information
router.put("/put", async function (req, res){

    try{

    await pool.query("UPDATE resources SET description = 'Bonjour, je suis un test' WHERE id = 5")
    res.json("Une description à été modifié")

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})

// DELETE, pour supprimer des informations
router.delete("/delete", async function(req, res){

    try{
    await pool.query("DELETE FROM resources WHERE id = 7")
    res.json("Attention, vous avez supprimé une information")

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})

export default router