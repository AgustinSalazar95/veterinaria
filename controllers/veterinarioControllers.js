import Veterinario from '../models/Veterinario.js';
import generarJWT from '../helpers/generarJWT.js';

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

const perfil =  (req,res) => {
    const {veterinario}  =  req;
    res.json({perfil: veterinario });
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

const autenticar = async (req, res) => {
    const { email, password } =  req.body;
    //Comprobar si el usuario existe
    const usuario =  await Veterinario.findOne({email});
    if(!usuario){
        const error =  new Error('El Usuario no Existe');
        return res.status(404).json({msg: error.message});
    }

    //Comprobar si el Usuario esta Confirmado
    if(!usuario.confirmado){
        const error =  new Error('Tu Cuenta no ha sido Confirmada');
        return res.status(403).json({msg: error.message});
    }

    //Revisar el password
    if(await usuario.comprobarPassword(password)){
        //Autenticar
        res.json({token:  generarJWT(usuario.id)}) 
    } else {
        const error =  new Error('Password Incorrecto');
        return res.status(403).json({msg: error.message});
    }
}

const olvidePassword = (req,res) => {
    console.log('desde ovlide pass')
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword
}