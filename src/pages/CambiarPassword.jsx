import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {

  const { guardarPassword} = useAuth();
  const [alerta,setAlerta] = useState({});
  const [password, setPassword] = useState({
      pwd_actual: '',
      pwd_nuevo: '',
      pwd_repetido: ''
  });

  const handleSubmit = async e =>{
    e.preventDefault();

    if(Object.values(password).some(campo => campo === '')){
      setAlerta({
        msg: 'Todos los Campos son Obligatorios',
        error: true
      })
      return;
    }
    if(password.pwd_nuevo.length < 6){
      setAlerta({
        msg: 'El password debe tener al menos 6 caracteres',
        error: true
      })
      return;
    }
    if(password.pwd_nuevo !== password.pwd_repetido){
        setAlerta({
          msg: 'Los passwords deben ser iguales',
          error: true
        })
        return;
    }
    const respuesta = await guardarPassword(password);

    setAlerta(respuesta);
    
  }
  const {msg} = alerta;
  return (
    <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Camibar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-indigo-600 font-bold">Password Aquí</span></p>

        <div className="flex justify-center">
              <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                  {msg && <Alerta alerta={alerta} />}
                  <form onSubmit={handleSubmit}>
                      <div className="my-3">
                          <label className="uppercase font-bold text-gray-600">Password Actual</label>
                          <input
                              type='password'
                              className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                              name='pwd_actual'
                              placeholder="Escribe tu Password Actual"
                              onChange={e => setPassword({
                                  ...password,
                                  [e.target.name]: e.target.value
                              })}
                          ></input>
                      </div>
                      <div className="my-3">
                          <label className="uppercase font-bold text-gray-600">Password Nuevo</label>
                          <input
                              type='password'
                              className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                              name='pwd_nuevo'
                              placeholder="Escribe tu Nuevo Password"
                              onChange={e => setPassword({
                                ...password,
                                [e.target.name]: e.target.value
                            })}
                          ></input>
                      </div>
                      <div className="my-3">
                          <label className="uppercase font-bold text-gray-600">Repeti tu nuevo Password</label>
                          <input
                              type='password'
                              className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                              name='pwd_repetido'
                              placeholder="Escribe tu Nuevo Password"
                              onChange={e => setPassword({
                                ...password,
                                [e.target.name]: e.target.value
                            })}
                          ></input>
                      </div>
                      <input
                          type='submit'
                          value='Actualizar Password'
                          className='bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5'
                      />
                  </form>
              </div>
        </div>
    </>
  )
}

export default CambiarPassword