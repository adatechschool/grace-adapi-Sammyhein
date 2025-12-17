import express from "express";
import pool from "./db.js";

const app = express();


// app.get("/", function (req, res) {
// res.send("Hello Ada!\n");
// });

// app.get 
// pour dire qu'on va faire une route qui récupère des éléments
// function (req, res) 
// déclare une fonction qui aura comme paramètre req (request pour récupérer de potentielle information que l'on veut rajouter) / res (response retourne le résultat) 


// eviter les promise => async/await
app.get("/hello", function (req, res) {
res.send("Hello Ada heeeey!\n");
});

app.get("/bye", function (req, res) {
res.send("Bye Ada!\n");
});

// ---------------------------------------------
// ----------------- RESOURCES -----------------
// ---------------------------------------------

// GET /resources
app.get("/resources", async function (req, res) {
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
app.get("/resource", async function (req, res) {

    try{

    const { rows } = await pool.query("SELECT * FROM resources WHERE title = 'Introduction à React'")

    res.json(rows)

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
    
})

// GET /resources/:id
app.get("/resources/:id", async (req, res) => {
    try {
        const id = req.params.id; //récupère l'id de l'URL
        const { rows } = await pool.query(`SELECT * FROM resources WHERE id = ${id}`);
        res.json(rows); //renvoie la première ligne trouvée

    } catch (err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})

//AUTRE METHODE AU NIVEAU DU CONST ID
// app.get("/resources/:id", async (req, res) => {
//     try {
//         const { id } = req.params; //récupère l'id de l'URL
//         const { rows } = await pool.query(`SELECT * FROM resources WHERE id = ${id}`);
//         res.json(rows); //renvoie la première ligne trouvée

//     } catch (err){
//         console.error(err);
//         res.status(500).json({ error : err.message});
//     }
// })

//POST pour ajouter des informations (attention : pas modifier)

app.post("/post", async function (req, res) {

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

// PUT , pour modifier une information
app.put("/put", async function (req, res){

    try{

    await pool.query("UPDATE resources SET description = 'Bonjour, je suis un test' WHERE id = 5")
    res.json("Une description à été modifié")

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})

// DELETE, pour supprimer des informations
app.delete("/delete", async function(req, res){

    try{
    await pool.query("DELETE FROM resources WHERE id = 7")
    res.json("Attention, vous avez supprimé une information")

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})

// ---------------------------------------------
// ----------------- THEMES --------------------
// ---------------------------------------------

// GET /themes
app.get("/themes", async function (req, res) {

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
app.get("/themes/:id", async (req, res) => {
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
app.post("/themes/post", async function (req, res) {

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
app.put("/themes/put", async function (req, res){

    try{

    await pool.query("UPDATE themes SET description = 'Bonjour, je suis un test du PUT' WHERE id = 5")
    res.json("Une description dans la table 'themes' à été modifié")

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})

//DELETE /themes/delete
app.delete("/themes/delete", async function(req, res){

    try{
    await pool.query("DELETE FROM themes WHERE id = 5")
    res.json("Attention, vous avez supprimé une information")

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})


// ---------------------------------------------
// ----------------- SKILLS --------------------
// ---------------------------------------------

// GET /skills
app.get("/skills", async function (req, res) {

    try{
    //créer une constante qui va chercher le contenu de pool pour utiliser le sql qu'on lui met
    const { rows } = await pool.query("SELECT * FROM skills");
    //on retourne le résultat
    res.json(rows);

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})

// GET /skills/:id
app.get("/skills/:id", async (req, res) => {
    try {
        const id = req.params.id; //récupère l'id de l'URL
        const { rows } = await pool.query(`SELECT * FROM skills WHERE id = ${id}`);
        res.json(rows); //renvoie la première ligne trouvée

    } catch (err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})

//POST /skills/post
app.post("/skills/post", async function (req, res) {

    try{
    //on peut continuer à mettre la const { rows } mais actuellement elle n'est pas nécessaire
    //la je lui dit ce qu'il faut faire dans le format que j'aurais mis dans SQL
    await pool.query("INSERT INTO skills (id, name) SELECT 7, 'Adapi'")

    //il ne va pas directement m'afficher les { rows } même si je le met dans res.json() , c'est pour ça qu'il n'est pas trop nécéssaire et que j'ai mis un message à la place
    console.log("La base de donnée dans la table 'skills' à un ajout")
    res.json("La base de donnée dans la table 'skills' à un ajout")

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
    
})

// PUT /skills/put
app.put("/skills/put", async function (req, res){

    try{

    await pool.query("UPDATE skills SET name = 'AdapiPUT' WHERE id = 7")
    res.json("Une description dans la table 'skills' à été modifié")

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})

//DELETE /skills/delete
app.delete("/skills/delete", async function(req, res){

    try{
    await pool.query("DELETE FROM skills WHERE id = 7")
    res.json("Attention, vous avez supprimé une information")

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})

// ---------------------------------------------
// ----------------- RESOURCES_SKILLS ----------
// ---------------------------------------------

// GET /resources_skills
app.get("/resources_skills", async function (req, res) {

    try{

    //créer une constante qui va chercher le contenu de pool pour utiliser le sql qu'on lui met
    const { rows } = await pool.query("SELECT * FROM resources_skills");
    //on retourne le résultat
    res.json(rows);

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})

// GET /resources_skills/:id
app.get("/resources_skills/:id", async (req, res) => {
    try {
        const id = req.params.id; //récupère l'id de l'URL
        const { rows } = await pool.query(`SELECT * FROM resources_skills WHERE skill_id = ${id}`);
        res.json(rows); //renvoie la première ligne trouvée

    } catch (err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})

//POST /resources_skills/post
app.post("/resources_skills/post", async function (req, res) {

    try{
    //on peut continuer à mettre la const { rows } mais actuellement elle n'est pas nécessaire
    //la je lui dit ce qu'il faut faire dans le format que j'aurais mis dans SQL
    await pool.query("INSERT INTO resources_skills (resource_id, skill_id) SELECT 2, 2")

    //il ne va pas directement m'afficher les { rows } même si je le met dans res.json() , c'est pour ça qu'il n'est pas trop nécéssaire et que j'ai mis un message à la place
    console.log("La base de donnée dans la table 'resources_skills' à un ajout")
    res.json("La base de donnée dans la table 'resources_skills' à un ajout")

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
    
})

// PUT /resources_skills/put
app.put("/resources_skills/put", async function (req, res){

    try{

    await pool.query("UPDATE resources_skills SET resource_id = 3 WHERE skill_id = 2")
    res.json("Une description dans la table 'resources_skills' à été modifié")

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})

//DELETE /skills/delete
app.delete("/resources_skills/delete", async function(req, res){

    try{
    await pool.query("DELETE FROM resources_skills WHERE skill_id = 2")
    res.json("Attention, vous avez supprimé une information")

    }catch(err){
        console.error(err);
        res.status(500).json({ error : err.message});
    }
})



app.listen(3000, () => {
console.log("🚀 Serveur lancé : http://localhost:3000");
});