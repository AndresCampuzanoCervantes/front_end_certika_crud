import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalRegisterUser = ({ showModal }) => {
    const [name, setName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const cancelar = () => {

    }
    const registerUser = () => {

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
                    maxLength="3"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone} />
                <label htmlFor="email" className='col-12 fw-bold'>Email:</label>
                <input id="email"
                    className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese el email'
                    maxLength="3"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} />
                <label htmlFor="password" className='col-12 fw-bold'>password:</label>
                <input id="password"
                    className='form-control mb-2'
                    type="password"
                    placeholder='Ingrese la contraseña'
                    maxLength="3"
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

export default ModalRegisterUser