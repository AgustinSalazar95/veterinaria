import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import generarId from "../helpers/generarId.js";

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
        default: generarId()
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});


//Antes de almacenar el registro HASHEAMOS el pass
veterinarioSchema.pre('save', async function(next) {
    //Para cuando lo modifique aasi no vuelve  apasar hassehado
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

//Para registralo en moongose
const Veterinario = mongoose.model('Veterinario', veterinarioSchema);

export default Veterinario;