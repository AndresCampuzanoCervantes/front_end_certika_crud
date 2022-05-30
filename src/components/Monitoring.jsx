import React from 'react'
import MenuBar from './MenuBar'
import Swal from 'sweetalert2'
import axios from 'axios';
import ListMonitoring from './ListMonitoring';
import ModalMonitoring from './ModalMonitoring';

const Monitoring = () => {
    const [listMonitoring, setListMonitoring] = React.useState([])
    const [flag, setFlag] = React.useState(0);
    const [showMonitoring, setShowMonitoring] = React.useState(false);
    const [monitoringEdit, setMonitoringEdit] = React.useState({});

    React.useEffect(() => {
        const conusltarMonitores = async () => {
            const res = await axios.get('http://localhost:3010/api/monitoring/findAllMonitoring').catch(e => {
                console.error(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error de conexion con el servidor comuniquese con el administrador.'
                })
            })
            const data = res.data;
            if (data.length > 0) {
                setListMonitoring(data)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error.msg
                })
            }
        }
        conusltarMonitores()
    }, [flag])

    const handleModalMonitoring = () => {
        setShowMonitoring(!showMonitoring)
        if (Object.keys(monitoringEdit).length !== 0) {
            setMonitoringEdit({})
        }
    }

    const verificarToken = () => {
        const params = JSON.parse(localStorage.getItem('session')) ?? null;
        if (!params || params === null) {
            //history('/login')
            window.location.href = '/login'
        }
    }

    const handleModalEditar = (monitoring) => {
        const {id,course,idMonitor,date,classroom}= monitoring
        const monitoringEdit={
            id,
            monitor:idMonitor.id,
            course,
            date,
            classroom
        }
        setMonitoringEdit(monitoringEdit)
        handleModalMonitoring()
    }

    verificarToken()

    return (
        <>
            <ModalMonitoring
                showModal={showMonitoring}
                handleModal={handleModalMonitoring}
                monitoringEdit={monitoringEdit}
                listMonitoring={listMonitoring}
                setListMonitoring={setListMonitoring}
                setFlag={setFlag} />
            <div>
                <MenuBar nameMenu={"Administracion de Monitorias"} />
            </div>
            <div className="container">
                <h1 className='text-center mt-4 fw-bolder'> Lista de Monitorias</h1>
                <button className="btn btn-primary float-end fw-bold mx-2 my-2" onClick={handleModalMonitoring}>Registrar Monitor</button>
                <div className="row col-12 my-2 py-2">
                    <table className="table">
                        <thead className="table-dark">
                            <tr>
                                <th className="col-2 text-center align-middle">#</th>
                                <th className="col text-center align-middle">Curso</th>
                                <th className="col-2 text-center align-middle">Fecha</th>
                                <th className="col-2 text-center align-middle">Salon de Clase</th>
                                <th className="col text-center align-middle">Monitor</th>
                                <th className="col text-center align-middle">Programa</th>
                                <th className="col text-center align-middle">Semestre</th>
                                <th className="col text-center align-middle">Email</th>
                                <th className="col-4 text-center align-middle">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ListMonitoring
                                listMonitoring={listMonitoring}
                                handleModalEditar={handleModalEditar}
                                setListMonitoring={setListMonitoring}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}

export default Monitoring