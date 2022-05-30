import React from 'react'
import Swal from 'sweetalert2'
import axios from 'axios';

const ListMonitores = ({ listaMonitro, handleModalEditar, setListmonitor }) => {

    const handleModalEliminar = async (minitor) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success mx-2',
                cancelButton: 'btn btn-danger mx-2'
            },
            buttonsStyling: false
        })

        const result = await swalWithBootstrapButtons.fire({
            title: 'Seguro desea eliminar este monitor?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            reverseButtons: true
        })
        if (result.isConfirmed) {
            try {
                const res = await axios.delete('http://localhost:3010/api/monitor/deleteMonitor/' + minitor.id).catch(e => {
                    console.error(e)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error de conexion con el servidor comuniquese con el administrador.'
                    })
                })
                const data = res.data;
                if (data.affectedRows === 1) {
                    const listMonitor = listaMonitro.filter(item => item.id !== minitor.id)

                    swalWithBootstrapButtons.fire(
                        'Eliminado',
                        'el monitor ha sido eliminado.',
                        'success'
                    )
                    setListmonitor(listMonitor)
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

    return (
        <>
            {
                listaMonitro.map((item, index) => (
                    <tr className={(index + 1) % 2 === 0 ? 'table-active' : ''} key={item.id}>
                        <td className="fw-bold"><img src={item.photo} alt={`${item.name} ${item.lastName}`} width="150" height="150" border="0" /></td>
                        <td className="text-wrap text-center align-middle">{item.identification}</td>
                        <td className="text-wrap text-center align-middle">{item.name}</td>
                        <td className="text-wrap text-center align-middle">{item.lastName}</td>
                        <td className="text-wrap text-center align-middle">{item.program}</td>
                        <td className="text-wrap text-center align-middle">{item.semester}</td>
                        <td className="text-wrap text-center align-middle">{item.phoneNumber}</td>
                        <td className="text-wrap text-center align-middle">{item.email}</td>
                        <td className="text-wrap text-center align-middle">
                            <button className="btn btn-warning btn-sm mx-2  fw-bold" onClick={() => { handleModalEditar(item) }}>Editar</button>
                            <button className="btn btn-danger btn-sm mx-2  fw-bold" onClick={() => { handleModalEliminar(item) }}>Eliminar</button>
                        </td>
                    </tr>
                ))
            }
        </>
    )
}

export default ListMonitores