
import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import '../assets/styles/login.css'
import 'animate.css'
import ModalRegisterUser from './modals/ModalRegisterUser'
import PropTypes from 'prop-types'

const Login = ({ signOff = false }) => {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)
  const history = useNavigate();

  const signOffActive = () => {
    if (signOff) {
      localStorage.clear();
      window.location.href = '/login'
    }
  }

  signOffActive()

  const startLogin = () => {
    const params = JSON.parse(localStorage.getItem('session')) ?? null;
    if (params || params !== null) {
      //history('/login')
      window.location.href = '/home'
    }
  }

  startLogin();

  const consultarUsuario = async () => {
    try {

      if (email.trim().length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El correo electronico es obligatorio'
        })
        return
      }

      if (password.trim().length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La contraseña es obligatoria'
        })
        return
      }

      const params = {
        email,
        password
      }

      const res = await axios.post('http://localhost:3010/api/user/login',
        params
      ).catch(e => {
        console.error(e)
        if (Object.keys(e.response.data).length !== 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: e.response.data.errors[0].msg + ',  ERROR:' + e.response.status
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error de conexion con el servidor comuniquese con el administrador.'
          })
        }
      })
      if (res) {
        const data = res.data;
        if (data.status === 'success') {
          localStorage.setItem('session', JSON.stringify(res));
          history('/home')
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.error.msg
          })
        }
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

  const handleEmail = async (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = async (e) => {
    setPassword(e.target.value)
  }

  const hendleRegisterUser = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      <ModalRegisterUser
        showModal={showModal}
        hendleModal={hendleRegisterUser} />
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6 animate__animated animate__fadeIn animate__faster animate__delay-1s">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid" alt="logo"></img>
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 animate__animated animate__fadeInDown animate__faster animate__delay-1s from-div rounded-3">
              <h1 className="my-3">CRUD Monitor</h1>
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

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>

                <div className="d-flex justify-content-around align-items-center mb-4">
                  <a href="#/" className="text-decoration-none" onClick={hendleRegisterUser}>Crear un nuevo usuario</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

Login.propTypes = {
  signOff: PropTypes.bool.isRequired
}

Login.defaultProps = {
  signOff: false
}


export default Login