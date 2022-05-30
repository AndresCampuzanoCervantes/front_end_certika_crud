import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios';

const ModalMonitoring = ({ showModal, handleModal, monitoringEdit, listMonitoring, setFlag, setListMonitoring }) => {

    const formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const [id, setId] = React.useState('')
    const [course, setCourse] = React.useState('')
    const [monitor, setMonitor] = React.useState('')
    const [listMonitor, setListmonitor] = React.useState([])
    const [date, setDate] = React.useState(formatDate(Date.now()))
    const [classroom, setClassroom] = React.useState('')

    const cancelar = () => {
        setId('')
        setCourse('')
        setMonitor('')
        setDate(formatDate(new Date()))
        setClassroom('')
        handleModal()

    }

    const validateData = () => {
        if (course.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El curso es obligatoria'
            })
            enableButtons()
            return false;
        }

        if (monitor.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El monitor es obligatoria'
            })
            enableButtons()
            return false;
        }

        if (date.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La fecha es obligatoria'
            })
            enableButtons()
            return false;
        }

        if (classroom.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El salon de clase es obligatoria'
            })
            enableButtons()
            return false;
        }
        return true;
    }

    const editarMonitoring = () => {
        const buttonEditar = document.querySelector('#btnEditar')
        const buttonCancelar = document.querySelector('#btnCancelar')

        buttonEditar.disabled = true;
        buttonCancelar.disabled = true;


        if (validateData()) {
            if (id.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No se encuentra el registro selecionado.'
                })
                enableButtons()
                return
            }
        }

        const updateMonitoring = async () => {
            const params = {
                course,
                idMonitor: monitor,
                date,
                classroom
            }
            const res = await axios.put('http://localhost:3010/api/monitoring/editMonitoring/' + id,
                params
            ).catch(e => {
                console.error(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error de conexion con el servidor comuniquese con el administrador.'
                })
            })
            const data = res.data.affectedRows;
            if (data) {
                params.id = id
                const listaMonitoring=listMonitoring.map(item => item.id===params.id?params:item)
                setListMonitoring(listaMonitoring)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error.msg
                })
            }
        }

        updateMonitoring()
        enableButtons()
        setFlag(1)
        cancelar()
    }

    const registrarMonitoring = () => {
        const buttonRegistrar = document.querySelector('#btnRegistrar')
        const buttonCancelar = document.querySelector('#btnCancelar')

        buttonRegistrar.disabled = true;
        buttonCancelar.disabled = true;

        if(!validateData()){
            return;
        }
        const createMonitoring = async () => {
            const params = {
                course,
                idMonitor: parseInt(monitor),
                date,
                classroom
            }
            const res = await axios.post('http://localhost:3010/api/monitoring/createMonitoring',
                params
            ).catch(e => {
                console.error(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error de conexion con el servidor comuniquese con el administrador.'
                })
            })
            const data = res.data.id;
            if (data) {
                params.id = data
                setListMonitoring([...listMonitoring, params])
                setFlag(1)
                handleModal()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error.msg
                })
            }
        }

        createMonitoring()
        enableButtons()
        cancelar()
    }

    React.useEffect(() => {
        const setDataEdit = () => {
            if (Object.keys(monitoringEdit).length !== 0) {
                const { id, course, monitor, date, classroom } = monitoringEdit
                setId(id)
                setCourse(course)
                setMonitor(monitor)
                setDate(formatDate(date))
                setClassroom(classroom)
            }
        }
        setDataEdit()
    }, [monitoringEdit])

    React.useEffect(() => {
        const conusltarMonitores = async () => {
            const res = await axios.get('http://localhost:3010/api/monitor/findAllMonitores').catch(e => {
                console.error(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error de conexion con el servidor comuniquese con el administrador.'
                })
            })
            const data = res.data;
            if (data.length > 0) {
                setListmonitor(data)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error.msg
                })
            }
        }
        conusltarMonitores()
    }, [])

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

    return (
        <Modal show={showModal} onHide={cancelar}>
            <Modal.Header closeButton>
                <h5 className="title">Registro de Monitor</h5>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="course" className='col-12 fw-bold'>Curso:</label>
                <input id="course"
                    className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese el curso'
                    onChange={(e) => setCourse(e.target.value)}

                    value={course} />

                <label htmlFor="monitor" className='col-12 fw-bold'>Monitor:</label>
                <select
                    id="monitor"
                    className="form-select"
                    aria-label=".form-select-lg example"
                    onChange={(e) => setMonitor(e.target.value)}
                    value={monitor}
                    placeholder='Ingrese el monitor'>
                    <option value='0' defaultValue></option>
                    {
                        listMonitor.map(item => (
                            <option key={item.id} value={item.id}>{`${item.name} ${item.lastName} - ${item.identification} - ${item.program}`}</option>
                        ))
                    }
                </select>

                <label htmlFor="date" className='col-12 fw-bold'>Fecha:</label>
                <input id="date"
                    className='form-control mb-2'
                    type="date"
                    placeholder='Ingrese la fecha'
                    onChange={(e) => setDate(e.target.value)}
                    value={date} />

                <label htmlFor="classroom" className='col-12 fw-bold'>Salon de Clase:</label>
                <input id="classroom"
                    className='form-control mb-2'
                    type="text"
                    placeholder='Ingrese el salon de clase'
                    maxLength="3"
                    onChange={(e) => setClassroom(e.target.value)}
                    value={classroom} />
            </Modal.Body>
            <Modal.Footer>
                {
                    Object.keys(monitoringEdit).length !== 0 ?
                        <Button className="btn btn-warning" onClick={editarMonitoring} id="btnEditar">Editar</Button> :
                        <Button onClick={registrarMonitoring} id="btnRegistrar">Registrar</Button>
                }
                <Button onClick={cancelar} className="btn-danger" id="btnCancelar">Cancelar</Button>
            </Modal.Footer>
        </Modal>
    )

}

export default ModalMonitoring