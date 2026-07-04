import { Schema, model, Document, Types } from "mongoose";

export interface ILibro extends Document {

    titulo: string;
    autor: string;
    editorial: string;
    anio: number;
    descripcion: string;
    archivo: string;
    portada: string;
    materia: Types.ObjectId;

}

const LibroSchema = new Schema<ILibro>({

    titulo: {
        type: String,
        required: true
    },

    autor: String,

    editorial: String,

    anio: Number,

    descripcion: String,

    archivo: String,

    portada: String,

    materia: {
        type: Schema.Types.ObjectId,
        ref: "Materia",
        required: true
    }

}, {

    timestamps: true

});

export default model<ILibro>("Libro", LibroSchema);