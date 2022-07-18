import  express  from "express";
import dotenv from 'dotenv';
import conectarDB from "./config/db.js";

//instanciamos express
const app = express();

//para acceder y leer la variabla de .env
dotenv.config();

conectarDB();

//Asi maneja el routing exprres
app.use('/', (req, res) => {
    res.send('Hola mundo');
})

//conectamos a la base de datos en 4 ya que el 3 va ser para el front end
app.listen(4000, () => {
    console.log('Servidor funcionando en el puerto 4000');
});