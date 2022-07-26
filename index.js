import  express  from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from "./config/db.js";
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

//instanciamos express
const app = express();

//para poder ller los datos de la api
app.use(express.json());

//para acceder y leer la variabla de .env
dotenv.config();

conectarDB();

//Cors habilitar dominios
const dominiosPermitidos =[process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin,callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            //El origen del Reques esta permitidio
            callback(null, true)
        }else{
            callback(new Error('No permitido por CORS'));
        }
    }
}

//Le tenemos q decir a express q usamos CORS
app.use(cors(corsOptions));

//Asi maneja el routing exprres
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000;

//conectamos a la base de datos en 4 ya que el 3 va ser para el front end
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});