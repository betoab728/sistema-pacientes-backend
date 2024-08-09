"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//modelo para la entidad job o trabajo, solo se manejara el id que lo genere mongodb y el nombre del trabajo que se registrara
//importar mongoose
const mongoose_1 = __importDefault(require("mongoose"));
//definir el esquema de trabajo
const JobSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        //tiene que ser unico
        unique: true
    }
}, {
    timestamps: true,
    collection: 'jobs' // Especificar el nombre de la colección
});
//crear el modelo de trabajo
const Job = mongoose_1.default.model('Job', JobSchema);
//exportar el modelo de trabajo
exports.default = Job;
