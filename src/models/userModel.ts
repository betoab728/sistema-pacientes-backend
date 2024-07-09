import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

 export interface IUser extends Document {
    nombre: string;
    correo: string;
    clave: string;
    fechaRegistro: Date;
    activo: boolean;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    clave: {
        type: String,
        required: true
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    collection: 'usuarios' // Especificar el nombre de la colección
});


UserSchema.methods.matchPassword = async function(enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.clave);
};

const User = model<IUser>('User', UserSchema);
export default User;
