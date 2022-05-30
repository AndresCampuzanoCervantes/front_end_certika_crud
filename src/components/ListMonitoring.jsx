import React from 'react'
import Swal from 'sweetalert2'
import axios from 'axios';

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
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error de conexion con el servidor comuniquese con el administrador.'
                    })
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
                '',
                'error'
            )
        }
    }

    const handleNotificar = (item) => {

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
                    <tr className={(index + 1) % 2 === 0 ? 'table-active' : ''} key={item.id}>
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

export default ListMonitoring