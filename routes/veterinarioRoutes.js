import  express  from "express";
import {
    perfil,
    registrar
} from '../controllers/veterinarioControllers.js'

const router = express.Router();

router.post('/', registrar);

router.get('/perfil', perfil)

export default router;