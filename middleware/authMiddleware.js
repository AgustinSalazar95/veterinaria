import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

//Checkeamos las rutas
const checkAuth = async (req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Sacamos la palabra Bearer
            token = req.headers.authorization.split(' ')[1];
         
            //Lo decodificamos
            const decoded =  jwt.verify(token, process.env.JWT_SECRET);
            
            req.veterinario = await Veterinario.findById(decoded.id).select('-password -token -confirmado');
            return next();
        } catch (error) {
            const e =  new Error('Token no Valido');
            return res.status(404).json({ msg: e.message });
        }
    }
    if(!token){
        //Quiere decir q nunca hubo un token
        const error =  new Error('Token no Valido o Inexistente');
        res.status(403).json({ msg: error.message });
    }
    next();
};

export default checkAuth;