import { Schema, model, Document, Types } from "mongoose";

export interface IDescarga extends Document {

    estudiante: Types.ObjectId;
    libro: Types.ObjectId;
    fechaHora: Date;

}

const DescargaSchema = new Schema<IDescarga>({

    estudiante: {

        type: Schema.Types.ObjectId,

        ref: "Estudiante",

        required: true

    },

    libro: {

        type: Schema.Types.ObjectId,

        ref: "Libro",

        required: true

    },

    fechaHora: {

        type: Date,

        default: Date.now

    }

});

export default model<IDescarga>("Descarga", DescargaSchema);