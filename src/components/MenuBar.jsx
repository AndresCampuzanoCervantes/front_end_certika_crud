import React from 'react'
import { Nav, Offcanvas, Navbar, Container } from 'react-bootstrap'
import PropTypes from 'prop-types'
const MenuBar = ({ nameMenu }) => {
    const [showMenu, setShowMenu] = React.useState(false)

    const listMenu = [
        {
            nameMenu: "Inicio",
            url: 'home'
        },
        {
            nameMenu: "Administracion de Monitores",
            url: 'monitores'
        },
        {
            nameMenu: "Administracion de Monitorias",
            url: 'monitoring'
        },
        {
            nameMenu: "Salir",
            url: 'home',
        }
    ]

    //object css 
    const styleNav = {
        padding: "10px",
        width: "300px"

    }

    return (
        <>
            <Navbar bg="primary" expand={false} className="mb-3">
                <Container fluid>
                    <Navbar.Offcanvas
                        placement="start"
                        style={styleNav}
                        show={showMenu}
                        onHide={() => setShowMenu(false)}
                    >
                        <Offcanvas></Offcanvas>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title className="fw-bolder" >
                                Menú Principal
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                {
                                    listMenu.map((item, index) => (
                                        <Nav.Link
                                            key={index} href={`/${item.url}`} onClick={() => { setShowMenu(false) }}>{item.nameMenu}</Nav.Link>
                                    ))
                                }

                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    <Navbar.Toggle className="p-0" onClick={() => setShowMenu(true)} />
                    <Navbar.Brand className="navBar text-light" href="#">{nameMenu}</Navbar.Brand>
                </Container>

            </Navbar>
        </>
    )
}

MenuBar.propTypes = {
    nameMenu: PropTypes.string.isRequired
}

MenuBar.defaultProps = {
    nameMenu: "Crud Monitores"
}

export default MenuBar