import React from 'react'
import Swal from 'sweetalert2';
import MenuBar from './MenuBar'
import '../assets/styles/home.css'
import arrow_home from '../assets/photo_uploaded/arrow_home.png'

const Home = () => {

  const verificarToken = () => {
    const params = JSON.parse(localStorage.getItem('session')) ?? null;
    if (!params || params === null) {
      Swal.fire('Sesión expirada, por favor vuelva a iniciar sesión.')
      window.location.href = '/login'
    }
  }
  
  React.useEffect(() => {
    verificarToken()
  })

  return (
    <>
      <div>
        <MenuBar />
      </div>
      <img id="arrow_home" src={arrow_home} alt="" />
        <div className="div1">
          <div className="div2">Bienvenidos al Inicio</div>
          <div className="div3">
            <img src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e" alt="" width={150} />
          </div>
          <div className="div4">Para empezar toque el icono ubicado en la esquina superior-izquierda, luego elija una de las opciones</div>
        </div>
    </>
  )
}

export default Home