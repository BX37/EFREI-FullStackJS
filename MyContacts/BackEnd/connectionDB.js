require("dotenv").config();

const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log("Connexion réussie à la BDD");
    } catch (err) {
        console.error(" Erreur de connexion à la BDD : ", err);
    }
}

connectDB();
