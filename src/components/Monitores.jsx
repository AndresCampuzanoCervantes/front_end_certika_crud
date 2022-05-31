import React from 'react'
import MenuBar from './MenuBar'
import ModalMonitores from './modals/ModalMonitores';
import Swal from 'sweetalert2'
import axios from 'axios';
import ListMonitores from './lists/ListMonitores';

const Monitores = () => {
    const [listaMonitor, setListaMonitor] = React.useState([]);
    const [flag, setFlag] = React.useState(0);
    const [showMonitor, setShowMonitor] = React.useState(false);
    const [monitorEdit, setMonitorEdit] = React.useState({});

    const handleModalMonitores = () => {
        setShowMonitor(!showMonitor)
    }

    React.useEffect(() => {
        const conusltarMonitores = async () => {
            const res = await axios.get('http://localhost:3010/api/monitor/findAllMonitores').catch(e => {
                console.error(e);
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
            const data = res.data;
            if (data.length > 0) {
                setListaMonitor(data)
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

    const handleModalEditar = (monitor) => {
        setMonitorEdit(monitor)
        setShowMonitor(!showMonitor)
    }

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
            <ModalMonitores
                showModal={showMonitor}
                handleModal={handleModalMonitores}
                setListmonitor={setListaMonitor}
                listMonitor={listaMonitor}
                setFlag={setFlag}
                monitorEdit={monitorEdit}
                setMonitorEdit={setMonitorEdit}
            />
            <div>
                <MenuBar nameMenu={"Administracion de monitores"} />
            </div>
            <div className="container">
                <h1 className='text-center mt-4 fw-bolder'> Lista de monitores</h1>
                <button className="btn btn-primary float-end fw-bold mx-2 my-2" onClick={handleModalMonitores}>Registrar Monitor</button>
                <div className="row col-12 my-2 py-2">
                    <table className="table">
                        <thead className="table-dark">
                            <tr>
                                <th className="col-2 text-center align-middle">#</th>
                                <th className="col text-center align-middle">Cedula</th>
                                <th className="col text-center align-middle">Nombre</th>
                                <th className="col text-center align-middle">Apellido</th>
                                <th className="col-2 text-center align-middle">Programa Academico</th>
                                <th className="col text-center align-middle">Semestre</th>
                                <th className="col text-center align-middle">Telefono</th>
                                <th className="col-2 text-center align-middle">Email</th>
                                <th className="col-3 text-center align-middle">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ListMonitores
                                listaMonitro={listaMonitor}
                                handleModalEditar={handleModalEditar}
                                setListmonitor={setListaMonitor}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Monitores