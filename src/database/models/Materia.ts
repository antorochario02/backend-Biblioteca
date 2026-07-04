import { Schema, model, Document, Types } from "mongoose";

export interface IMateria extends Document {

    nombre: string;
    descripcion: string;
    curso: Types.ObjectId;
    profesor: Types.ObjectId;

}

const MateriaSchema = new Schema<IMateria>({

    nombre: {
        type: String,
        required: true
    },

    descripcion: String,

    curso: {
        type: Schema.Types.ObjectId,
        ref: "Curso",
        required: true
    },

    profesor: {
        type: Schema.Types.ObjectId,
        ref: "Profesor",
        required: true
    }

}, {

    timestamps: true

});

export default model<IMateria>("Materia", MateriaSchema);