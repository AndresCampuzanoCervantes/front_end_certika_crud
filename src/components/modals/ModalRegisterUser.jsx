import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'

const ModalRegisterUser = ({ showModal, hendleModal }) => {
    const [name, setName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [phone, setPhone] = React.useState('')

    const cancelar = () => {
        setName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setPhone('')
        hendleModal()
    }

    const createUser = async () => {
        try {
            const params = {
                name,
                lastName,
                email,
                password,
                phone
            }
            const result = await axios.post('http://localhost:3010/api/user/createUser', params).catch(e => {
                console.error(e)
                if (Object.keys(e.response.data).length!==0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: e.response.data.errors[0].msg + ',  ERROR:' + e.response.status
                    })
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error de conexion con el servidor comuniquese con el administrador.'
                    })
                }
            })

            const data = result.data
            if (data.id) {
                Swal.fire(
                    'Creado',
                    'El usuario se ha registrado con exito.',
                    'success'
                )
                cancelar()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error.msg
                })
            }
        } catch (Error) {
            console.error(Error)
        }
    }


    const validateData = () => {
        if (name.trim().length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El nombre es obligatorio'
            })
            return false;
        }
        if (lastName.trim().length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El apellido es obligatorio'
            })
            return false;
        }
        if (email.trim().length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El email es obligatorio'
            })
            return false;
        }
        if (password.trim().length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La Contraseña es obligatorio'
            })
            return false;
        }

        return true;
    }


    const enableButtons = () => {
        const buttonRegistrar = document.querySelector('#btnRegistrar')
        const buttonCancelar = document.querySelector('#btnCancelar')
        buttonRegistrar.disabled = false;
        buttonCancelar.disabled = false;

    }


    const registerUser = async () => {
        const buttonRegistrar = document.querySelector('#btnRegistrar')
        const buttonCancelar = document.querySelector('#btnCancelar')
        buttonRegistrar.disabled = true;
        buttonCancelar.disabled = true;
        if (!validateData()) {
            enableButtons()
            return
        }
        await createUser()
        enableButtons()
    }


    const soloNumeros = (e) => {
        const key = e.charCode;
        if (!(key >= 48 && key <= 57)) {
            e.preventDefault();
        }
    }

    return (
        <Modal show={showModal} onHide={cancelar}>
            <Modal.Header closeButton>
                <h5 className="title">Registro de usuario</h5>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="name" className='col-12 fw-bold'>Nombre:</label>
                <input id="name"
                    className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese el nombre'
                    onChange={(e) => setName(e.target.value)}
                    value={name} />
                <label htmlFor="lastName" className='col-12 fw-bold'>Apellido:</label>
                <input id="lastName"
                    className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese el apellido'
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName} />
                <label htmlFor="phone" className='col-12 fw-bold'>Telefono:</label>
                <input id="phone"
                    className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese el telefono'
                    maxLength="10"
                    onKeyPress={(e) => { soloNumeros(e) }}
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone} />
                <label htmlFor="email" className='col-12 fw-bold'>Email:</label>
                <input id="email"
                    className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese el email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} />
                <label htmlFor="password" className='col-12 fw-bold'>password:</label>
                <input id="password"
                    className='form-control mb-2'
                    type="password"
                    placeholder='Ingrese la contraseña'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={registerUser} id="btnRegistrar">Registrar</Button>
                <Button onClick={cancelar} className="btn-danger" id="btnCancelar">Cancelar</Button>
            </Modal.Footer>
        </Modal>
    )
}

ModalRegisterUser.propTypes = {
    showModal: PropTypes.bool.isRequired,
    hendleModal: PropTypes.func.isRequired
}

ModalRegisterUser.defaultProps = {
    showModal: false
}

export default ModalRegisterUser