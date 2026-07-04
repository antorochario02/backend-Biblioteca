import { Schema, model, Document, Types } from "mongoose";

export interface INotificacion extends Document {

    mensaje: string;

    fecha: Date;

    leido: boolean;

    profesor: Types.ObjectId;

    descarga: Types.ObjectId;

}

const NotificacionSchema = new Schema<INotificacion>({

    mensaje: {

        type: String,

        required: true

    },

    fecha: {

        type: Date,

        default: Date.now

    },

    leido: {

        type: Boolean,

        default: false

    },

    profesor: {

        type: Schema.Types.ObjectId,

        ref: "Profesor",

        required: true

    },

    descarga: {

        type: Schema.Types.ObjectId,

        ref: "Descarga",

        required: true

    }

});

export default model<INotificacion>("Notificacion", NotificacionSchema);