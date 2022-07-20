import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
        <h1>Desde Auth Layout</h1>
        {/* para mostrar el contenido de Login */}
        <Outlet />
        
    </>
  )
}

export default AuthLayout