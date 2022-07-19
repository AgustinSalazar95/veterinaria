import  express  from "express";
import dotenv from 'dotenv';
import conectarDB from "./config/db.js";
import veterinarioRoutes from './routes/veterinarioRoutes.js';

//instanciamos express
const app = express();

//para poder ller los datos de la api
app.use(express.json());

//para acceder y leer la variabla de .env
dotenv.config();

conectarDB();

//Asi maneja el routing exprres
app.use('/api/veterinarios', veterinarioRoutes);

const PORT = process.env.PORT || 4000;

//conectamos a la base de datos en 4 ya que el 3 va ser para el front end
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});