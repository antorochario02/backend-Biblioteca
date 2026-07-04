import { Schema, model, Document, Types } from "mongoose";

export interface IUsuario extends Document {
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  rol: "ADMIN" | "PROFESOR" | "ESTUDIANTE";
  estado: boolean;
  curso?: Types.ObjectId;
}

const UsuarioSchema = new Schema<IUsuario>(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    apellido: {
      type: String,
      required: true,
      trim: true,
    },

    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    rol: {
      type: String,
      enum: ["ADMIN", "PROFESOR", "ESTUDIANTE"],
      required: true,
    },

    estado: {
      type: Boolean,
      default: true,
    },

    // Solo los estudiantes tendrán curso
    curso: {
      type: Schema.Types.ObjectId,
      ref: "Curso",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUsuario>("Usuario", UsuarioSchema);