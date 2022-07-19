import Veterinario from '../models/Veterinario.js';
import generarJWT from '../helpers/generarJWT.js';
import generarId from '../helpers/generarId.js';

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

const olvidePassword = async (req,res) => {
    const { email } =  req.body;
    
    const existeVeterinario = await Veterinario.findOne({email});
    if(!existeVeterinario){
        const error = new Error('El Usuario No Existe');
        return res.status(400).json({msg : error.message});
    }

    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        res.json({msg: 'Hemos enviado un email con las instrucciones'});
    } catch (error) {
        console.log(error);
    }
}

const comprobarToken = async (req,res) => {
    const {token} = req.params;

    const tokenValido = await Veterinario.findOne({ token });
    if(tokenValido){
        //el token es valido el usuario existe 
        res.json({msg : 'Token Valido'})
    }else {
        const error = new Error('Token no valido');
        return res.status(400).json({ msg: error.message});
    }
}
const nuevoPassword = async  (req,res) => {
    //viene de la URL
    const {token} =  req.params;
    //es lo qel usuario escriba
    const {password} = req.body;

    const veterinario = await Veterinario.findOne({token})

    if(!veterinario){
        const error = new Error('Hubo un error');
        return res.status(400).json({ msg: error.message});
    }

    try {
        veterinario.token = null
        veterinario.password = password;
        await veterinario.save();
        res.json({msg: 'Password modificado Correctamente'});
    } catch (error) {
        console.log(error)
    }
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}