import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import photoDefault from '../assets/photo_uploaded/download.png'
import Swal from 'sweetalert2'
import axios from 'axios';

const ModalMonitores = ({ showModal, handleModal, listMonitor, setListmonitor, monitorEdit, setMonitorEdit }) => {
    const [id, setId] = React.useState('')
    const [name, setName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [photo, setPhoto] = React.useState('')
    const [program, setProgram] = React.useState('')
    const [semester, setSemester] = React.useState('')
    const [identification, setIdentification] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phoneNumber, setPhoneNumber] = React.useState('')

    const insetMonitor = async () => {
        try {
            const params = {
                identification,
                name,
                lastName,
                photo,
                program,
                semester,
                email,
                phoneNumber
            }

            const res = await axios.post('http://localhost:3010/api/monitor/createMonitor',
                params
            ).catch(e => {
                console.error(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error de conexion con el servidor comuniquese con el administrador.'
                })
            })
            const data = res.data;
            if (data.id) {
                params.id = data.id
                setListmonitor( [...listMonitor,params])
                //setFlag(1)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error.msg
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    const editMonitor = async () => {
        try {
            const params = {
                identification,
                name,
                lastName,
                photo,
                program,
                semester,
                email,
                phoneNumber
            }

            const res = await axios.put('http://localhost:3010/api/monitor/editMonitor/' + id,
                params
            ).catch(e => {
                console.error(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error de conexion con el servidor comuniquese con el administrador.'
                })
            })
            const data = res.data;
            if (data.affectedRows===1) {
                params.id = id
                const listaMonitor = listMonitor.map(item=>item.id===id?params:item)
                setListmonitor(listaMonitor)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error.msg
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    const cancelar = () => {
        setMonitorEdit({})
        setPhoto('')
        setProgram('')
        setName('')
        setLastName('')
        setSemester('')
        setEmail('')
        setPhoneNumber('')
        setIdentification('')
        setId('')
        handleModal()
    }

    const soloNumeros = (e) => {
        const key = e.charCode;
        if (!(key >= 48 && key <= 57)) {
            e.preventDefault();
        }
    }

    const enableButtons = () => {
        const buttonRegistrar = document.querySelector('#btnRegistrar')
        const buttonCancelar = document.querySelector('#btnCancelar')
        const buttoneditar = document.querySelector('#btnCancelar')

        if (buttonRegistrar !== null) {
            buttonRegistrar.disabled = false;
        }
        if (buttoneditar !== null) {
            buttoneditar.disabled = false;
        }

        buttonCancelar.disabled = false;

    }

    const registrarMonitor = async () => {
        const buttonRegistrar = document.querySelector('#btnRegistrar')
        const buttonCancelar = document.querySelector('#btnCancelar')
        buttonRegistrar.disabled = true;
        buttonCancelar.disabled = true;

        if (photo.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La foto de perfil es obligatoria'
            })
            enableButtons()
            return;
        }

        if (identification.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El numero de identificacion es obligatorio'
            })
            enableButtons()
            return;
        }

        if (name.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El nombre es obligatorio'
            })
            enableButtons()
            return;
        }

        if (lastName.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El apellido es obligatorio'
            })
            enableButtons()
            return;
        }

        if (program.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El programa academico es obligatorio'
            })
            enableButtons()
            return;
        }

        if (semester.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El semestre es obligatorio'
            })
            enableButtons()
            return;
        }

        if (email.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El email es obligatorio'
            })
            enableButtons()
            return;
        }

        await insetMonitor()


        enableButtons()
        cancelar()
    }

    const editarMonitor = async () => {
        const buttonCancelar = document.querySelector('#btnCancelar')
        const buttoneditar = document.querySelector('#btnCancelar')

        buttonCancelar.disabled = true;
        buttoneditar.disabled = true;

        if (photo.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La foto de perfil es obligatoria'
            })
            enableButtons()
            return;
        }

        if (identification.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El numero de identificacion es obligatorio'
            })
            enableButtons()
            return;
        }

        if (name.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El nombre es obligatorio'
            })
            enableButtons()
            return;
        }

        if (lastName.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El apellido es obligatorio'
            })
            enableButtons()
            return;
        }

        if (program.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El programa academico es obligatorio'
            })
            enableButtons()
            return;
        }

        if (semester.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El semestre es obligatorio'
            })
            enableButtons()
            return;
        }

        if (email.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El email es obligatorio'
            })
            enableButtons()
            return;
        }

        await editMonitor()

        enableButtons()
        cancelar()
    }

    const handleUpfiles = async (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.addEventListener("load", function () {
            // convierte la imagen a una cadena en base64
            setPhoto(reader.result)

        }, false);

    }

    React.useEffect(() => {
        const setDataEdit = () => {
            if (Object.keys(monitorEdit).length !== 0) {
                const { id, photo, program, name, lastName, semester, email, phoneNumber, identification } = monitorEdit
                setId(id)
                setPhoto(photo)
                setProgram(program)
                setName(name)
                setLastName(lastName)
                setSemester(semester)
                setEmail(email)
                setPhoneNumber(phoneNumber)
                setIdentification(identification)
            }
        }
        setDataEdit()
    }, [monitorEdit])



    return (
        <Modal show={showModal} onHide={cancelar}>
            <Modal.Header closeButton>
                <h5 className="title">Registro de Monitor</h5>
            </Modal.Header>
            <Modal.Body>
                {/* <label htmlFor="imagen" className='col-12 fw-bold'>Imagen:</label>
                <img id="imagen" src={imageRandom} alt="Imagen Random" className="mx-auto d-block" /> */}
                <label className="col-12 fw-bold" htmlFor="photo">Foto de Perfil</label>
                <div className="col-auto py-3 text-center">
                    <label htmlFor="photo">
                        <img src={photo.length === 0 ? photoDefault : photo} alt="Foto de perfil" width="150" height="150" border="0" />
                        <input id="photo" type="file" hidden={true} values={photo} onChange={handleUpfiles} />
                    </label>

                </div>
                <br />
                <label htmlFor="phone" className='col-12 fw-bold'>Identification:</label>
                <input id="phone"
                    className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese la Identification'
                    onChange={(e) => setIdentification(e.target.value)}
                    onKeyPress={(e) => { soloNumeros(e) }}
                    value={identification} />

                <label htmlFor="name" className='col-12 fw-bold'>Nombre:</label>
                <input id="name"
                    className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese el nombre'
                    onChange={(e) => setName(e.target.value)}
                    value={name} />

                <label htmlFor="location" className='col-12 fw-bold'>Apellido:</label>
                <input id="location"
                    className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese el Apellido'
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName} />

                <label htmlFor="name" className='col-12 fw-bold'>Programa Academico:</label>
                <input id="name"
                    className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese el programa Academico'
                    onChange={(e) => setProgram(e.target.value)}
                    value={program} />

                <label htmlFor="author" className='col-12 fw-bold'>Semestre:</label>
                <input id="author"
                    className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese el Semestre'
                    onChange={(e) => setSemester(e.target.value)}
                    onKeyPress={(e) => { soloNumeros(e) }}
                    maxLength="2"
                    value={semester} />

                <label htmlFor="price" className='col-12 fw-bold'>Telefono:</label>
                <input id="price"
                    className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese el Telefono'
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onKeyPress={(e) => { soloNumeros(e) }}
                    maxLength="10"
                    value={phoneNumber} />

                <label htmlFor="price" className='col-12 fw-bold'>Email:</label>
                <input id="price"
                    className='form-control mb-2'
                    type="email"
                    placeholder='Ingrese el Email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} />

                <br />
            </Modal.Body>
            <Modal.Footer>
                {
                    Object.keys(monitorEdit).length !== 0 ?
                        <Button className="btn btn-warning" onClick={editarMonitor} id="btnEditar">Editar</Button> :
                        <Button onClick={registrarMonitor} id="btnRegistrar">Registrar</Button>
                }
                <Button onClick={cancelar} className="btn-danger" id="btnCancelar">Cancelar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalMonitores