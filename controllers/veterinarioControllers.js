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

const confirmar = async (req,res) => {
    const {token } = req.params;
    const usuarioConfirmar =  await Veterinario.findOne({token});

    if(!usuarioConfirmar){
        const error =  new Error('Token no Valido');
        return res.status(404).json({msg: error.message});
    }
    try {
        //Para eliminar el token ya que queda en LA url
        usuarioConfirmar.token =  null;
        usuarioConfirmar.confirmado = true;
        await  usuarioConfirmar.save();
        res.json({msg: 'Usuario Confirmado Correctamente'});
    } catch (error) {
        console.log(error);
    }

    
}

export {
    registrar,
    perfil,
    confirmar
}