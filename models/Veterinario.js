import mongoose from "mongoose";

//El esquema condificones de la base de datos
const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String, 
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default:  null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});

//Para registralo en moongose
const Veterinario = mongoose.model('Veterinario', veterinarioSchema);

export default Veterinario;