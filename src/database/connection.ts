import "./models/Curso";
import "./models/Usuario";
import "./models/Materia";
import "./models/Libro";
import "./models/Descarga";
import "./models/Notificacion";
import mongoose from "mongoose";
import { env } from "../config/env";


export const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);


    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    process.exit(1);
  }
};
