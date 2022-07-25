import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';
import Login from './pages/Login';
import OlvidePassword from './pages/OlvidePassword';
import Registrar from './pages/Registrar';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import NuevoPassword from './pages/NuevoPassword';
import AdministrarPacientes from './pages/AdministrarPacientes';

import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            {/* para definir la pagina principal  pasar un porps index*/}
              <Route path='/' element={<AuthLayout />}>
                  <Route index element={<Login />}/>
                  <Route path='registrar' element={<Registrar />} />
                  <Route path='olvide-password' element={<OlvidePassword />} />
                  <Route path='olvide-password/:token' element={<NuevoPassword />} />
                  <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
              </Route>
              <Route path='/admin' element={<RutaProtegida />}>
                  <Route index element={<AdministrarPacientes />}/>
              </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
