import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown  from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function MenuSuperior() {
    const [email, setEmail] = useState('');
    const navegate = useNavigate();

    useEffect(() => {
      const storedEmail = localStorage.getItem('email');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }, []);

    async function Logout(event){
        event.preventDefault();
        localStorage.setItem('email', '');
        localStorage.setItem('token', '');
        navegate("/login");
    }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Prêmios</Nav.Link>
            <Nav.Link href="#link">Minhas Cartelas</Nav.Link>
            <Nav.Link href="#link">Sorteios</Nav.Link>
            <Nav.Link href="#link" disabled>Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link href="#action2"></Nav.Link>
            <NavDropdown title={`Olá, ${email}`} id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={Logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuSuperior;