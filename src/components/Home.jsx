import React from 'react'
import MenuBar from './MenuBar'


const Home = () => {
  const verificarToken = () => {

    const params = JSON.parse(localStorage.getItem('session')) ?? null;
    console.log(params);
    if (!params || params === null) {
      //history('/login')
      window.location.href = '/login'
    }
  }
  verificarToken()
  return (
    <>
      <div>
        <MenuBar />
      </div>
      <div>

      </div>


    </>
  )
}

export default Home