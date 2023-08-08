import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import api from '../../services/API/api';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../../shared/img/logo-gaucho.png';
import '../../shared/css/Logo.css';
import ErrorMessageForm from './../../components/ErrorMessageForm/ErrorMessageForm';

const Login = () => {
    const [validated, setValidated] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");
    const [possuiErro, setPossuiErro] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const navegate = useNavigate();

    async function Login(event){
        event.preventDefault();
        setPossuiErro(false);
        setLoading(true);
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setLoading(false);
            setValidated(true);
            return;
        }

        setValidated(true);

        const data = {
            email,
            password
        }
  
        try{
            const response = await api.post('v1/Autenticacao/Login', data);
            localStorage.setItem('email', email);
            localStorage.setItem('token', response.data.message.accessToken);
  
            navegate("/");
        }
        catch(error){
          if(error.response === undefined){
            toogleMensagemErro("Ocorreu uma exception, contate o suporte!");
          }else if(error.response.status === 400){
            if(error.response.data.errors === undefined){
              toogleMensagemErro(error.response.data.message);
            }else{
              if(error.response.data.errors.Email !== undefined){
                error.response.data.errors.Email.map((item) => 
                toogleMensagemErro(item))
              }
              if(error.response.data.errors.Password !== undefined){
                error.response.data.errors.Password.map((item) => 
                toogleMensagemErro(item))
              }
            }
          }
        }
        setLoading(false);
    };

    const toogleMensagemErro =(erro) =>{
        setMensagemErro(erro);
        setPossuiErro(true);
    }

    return <>
        <Container >
            <Row className="justify-content-md-center">
                <Col md='4'>
                    <img src={Logo} className='logo' />
                    <ErrorMessageForm possuiErro={possuiErro} tituloErro={'Falha!'} mensagemErro={mensagemErro} />
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md='4'>
                    <Form noValidate 
                        validated={validated} 
                        onSubmit={!isLoading ? Login : null}>
                        <Form.Group className="mb-3" controlId="Email">
                            <Form.Label>Login</Form.Label>
                            <Form.Control type="email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter email" 
                            required  />
                            <Form.Control.Feedback type="invalid">
                                Informe o e-mail.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Senha">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password" 
                            required  />
                            <Form.Control.Feedback type="invalid">
                                Informe a senha.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" 
                            type="submit"
                            disabled={isLoading}>
                            {isLoading ? 'Loading…' : 'Login'}
                        </Button>
                        <Link to="/registrar">
                            <Button style={{ float: 'right' }} 
                                variant="outline-light">
                                Registrar
                            </Button>
                        </Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>
}

export default Login;