import React from 'react'
import Swal from 'sweetalert2'
import axios from 'axios';
import PropTypes from 'prop-types'

const ListMonitoring = ({ listMonitoring, handleModalEditar, setListMonitoring }) => {

    const handleModalEliminar = async (monitoring) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success mx-2',
                cancelButton: 'btn btn-danger mx-2'
            },
            buttonsStyling: false
        })

        const result = await swalWithBootstrapButtons.fire({
            title: 'Seguro desea eliminar esta monitoria?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            reverseButtons: true
        })

        if (result.isConfirmed) {
            try {
                const res = await axios.delete('http://localhost:3010/api/monitoring/deleteMonitoring/' + monitoring.id).catch(e => {
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
                const data = res.data;
                if (data.affectedRows === 1) {
                    const listMonitor = listMonitoring.filter(item => item.id !== monitoring.id)

                    swalWithBootstrapButtons.fire(
                        'Eliminado',
                        'La monitoria ha sido eliminado.',
                        'success'
                    )
                    setListMonitoring(listMonitor)
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
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'Oops...',
                'error'
            )
        }
    }

    const sendEmail= async(monitoring,result)=>{
        try {
            const {course,idMonitor,date,classroom} =monitoring;
            const params={
                course,
                idMonitor,
                date:formatDate(date),
                classroom,
                message:result.value
            }
            const res = await axios.post('http://localhost:3010/api/monitoring/notifyMonitor/',params).catch(e => {
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
            const data =  await res.data.messageId;
            if (data) {
                Swal.fire(
                    'Enviado',
                    'La notificacion ha sido enviado con exito.',
                    'success'
                )
            } else {
                console.log(res.data)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al tratar de enviar la notificacion al monitor'
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleNotificar = (monitoring) => {
        Swal.fire({
            title: 'Ingrese el mensaje para recordatorio',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Enviar'
        }).then((result) => {
            if (result.isConfirmed) {
                sendEmail(monitoring,result)
            }
        })
    }

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

    return (
        <>
            {
                listMonitoring.map((item, index) => (
                    <tr className={(index ) % 2 === 0 ? 'table-active animate__animated animate__fadeIn animate__faster animate__delay-1s' : 'animate__animated animate__fadeIn animate__faster animate__delay-1s'} 
                        key={item.id}>
                        <td className="fw-bold"><img src={item.idMonitor.photo} alt={`${item.idMonitor.name} ${item.idMonitor.lastName}`} width="150" height="150" border="0" /></td>
                        <td className="text-wrap text-center align-middle">{item.course}</td>
                        <td className="text-wrap text-center align-middle">{formatDate(item.date)}</td>
                        <td className="text-wrap text-center align-middle">{item.classroom}</td>
                        <td className="text-wrap text-center align-middle">{`${item.idMonitor.name} ${item.idMonitor.lastName}`}</td>
                        <td className="text-wrap text-center align-middle">{item.idMonitor.program}</td>
                        <td className="text-wrap text-center align-middle">{item.idMonitor.semester}</td>
                        <td className="text-wrap text-center align-middle">{item.idMonitor.email}</td>
                        <td className="text-wrap text-center align-middle">
                            <button className="btn btn-success btn-sm mx-2  fw-bold" onClick={() => { handleNotificar(item) }}>Notificar</button>
                            <button className="btn btn-warning btn-sm mx-2  fw-bold" onClick={() => { handleModalEditar(item) }}>Editar</button>
                            <button className="btn btn-danger btn-sm mx-2  fw-bold" onClick={() => { handleModalEliminar(item) }}>Eliminar</button>

                        </td>
                    </tr>
                ))
            }
        </>
    )
}

ListMonitoring.propTypes = {
    handleModalEditar: PropTypes.func.isRequired,
    setListMonitoring: PropTypes.func.isRequired,
    listMonitoring: PropTypes.array.isRequired
}

ListMonitoring.defaultProps = {
    listMonitoring: []
}

export default ListMonitoring