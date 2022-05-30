
import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email,setEmail] =React.useState('')
  const [password,setPassword] =React.useState('')
  const history = useNavigate();
  const startLogin= () => {
    const params = JSON.parse(localStorage.getItem('session')) ?? null;
    console.log(params);
    if (params || params !== null) {
      //history('/login')
      window.location.href = '/home'
    }
  }

  startLogin();
  const consultarUsuario = async () => {

    try {
      const params = {
        email,
        password
      }

      const res= await axios.post('http://localhost:3010/api/user/login',
        params
      ).catch(e => {
        console.error(e)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error de conexion con el servidor comuniquese con el administrador.'
        })
      })
      const data= res.data;
      if (data.status === 'success'){
        localStorage.setItem('session', JSON.stringify(res));
        history('/home')
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.error.msg
        })
      }
      
      
      //return res;
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const button = document.querySelector('#initSession')
    button.disabled = true;
    await consultarUsuario()
    button.disabled = false;
    //  history('/home')
  }

  const handleEmail= async (e) => {
    setEmail(e.target.value)
  }

  const handlePassword= async (e) => {
    setPassword(e.target.value)
  }
  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid" alt="logo"></img>
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <h1>CRUD Monitor</h1>
              <form onSubmit={handleSubmit} >
                <div className="form-outline mb-4 ">
                  <label className="form-label" htmlFor="email">Correo Electronico</label>
                  <input 
                    type="email"
                    id="email" 
                    value={email}
                    onChange={handleEmail}
                    className="form-control" />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="password">Contraseña</label>
                  <input 
                    type="password" 
                    id="password" 
                    className="form-control form-control-lg" 
                    value={password}
                    onChange={handlePassword}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-lg btn-block col-12" id='initSession'>Iniciar sesión</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login