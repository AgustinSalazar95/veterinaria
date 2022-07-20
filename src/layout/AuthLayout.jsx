import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
        {/* para mostrar el contenido de Login, md(media queries) */}
        <main className='container mx-auto md:grid md:grid-cols-2 mt-12 ml-12 gap-12 p-5 items-center'>
            <Outlet />
        </main>
    </>
  )
}

export default AuthLayout