import Veterinario from '../models/Veterinario.js';


//endpoints
const registrar = async (req,res) => {
    const {email} =  req.body;

    //Prevenir Usuarios Duplicados
    const existeUsuario = await Veterinario.findOne({email});

    if(existeUsuario){
        const error =  new Error('Usuario ya registrado');
        //Para detener la Ejecucion
        return res.status(400).json({msg: error.message});
    }

    try {
        //Guardar un nuevo veterinario
        //instanciamos
        const veterinario = new Veterinario(req.body);
        //Guardamos en la DB
        const veterinarioGuardado =  await veterinario.save();
        res.json(veterinarioGuardado);
    } catch (error) {
        console.log(error);
    }
    
}

const perfil = (req,res) => {
    res.json({msg: 'Mostrando Perfil'});
}

export {
    registrar,
    perfil
}