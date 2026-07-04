import { Schema, model, Document } from "mongoose";

export interface ICurso extends Document {
  nombre: string;
  nivel: string;
}

const CursoSchema = new Schema<ICurso>({
  nombre: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  nivel: {
    type: String,
    required: true
  }
}, {
    timestamps: true
});

export default model<ICurso>("Curso", CursoSchema);