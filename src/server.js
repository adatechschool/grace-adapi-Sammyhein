import express from "express";
import pool from "./db.js";
import cors from "cors";
import resourcesRouter from "./routes/resources.js";
import themesRouter from "./routes/themes.js";
import skillsRouter from "./routes/skills.js";
import resourcesSkillsRouter from "./routes/resources_skills.js";


const app = express();


//middleware
app.use(cors());
app.use(express.json());
app.use("/resources", resourcesRouter)
app.use("/themes", themesRouter)
app.use("/skills", skillsRouter)
app.use("/resources_skills", resourcesSkillsRouter)


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


app.listen(3000, () => {
console.log("🚀 Serveur lancé : http://localhost:3000");
});