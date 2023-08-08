import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ErrorMessageForm from "../../components/ErrorMessageForm/ErrorMessageForm";
import Logo from '../../shared/img/logo-gaucho.png';
import '../../shared/css/Logo.css';
import api from '../../services/API/api';

const Registrar = () => {

    const [nome, setNome] = useState();
    const [validated, setValidated] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");
    const [possuiErro, setPossuiErro] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const navegate = useNavigate();

    async function RealizarCadastro (event) {
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

        const data = {
            nome,
            email,
            password,
            confirmPassword
        }

        try{
            const response = await api.post('v1/Autenticacao/Registrar', data);
            localStorage.setItem('email', email);
            localStorage.setItem('token', response.data.message.accessToken);
  
            navegate("/");
        }
        catch(error){
          if(error.response === undefined){
            toogleMensagemErro("Ocorreu uma exception, contate o suporte!");
          }else if(error.response.status === 400){
            toogleMensagemErro(error.response.data.message);
          }
        }
        setLoading(false);
    }

    const toogleMensagemErro = (erro) =>{
        setMensagemErro(erro);
        setPossuiErro(true);
    }

    return(
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md='4'>
                        <img src={Logo} className='logo' />
                        <ErrorMessageForm possuiErro={possuiErro} tituloErro={'Falha!'} mensagemErro={mensagemErro} />
                    </Col>
                </Row>
                <Form
                    noValidate 
                    validated={validated} 
                    onSubmit={!isLoading ? RealizarCadastro : null}>
                    <Row className="justify-content-md-center">
                        <Col md='4'>
                            <Form.Group className="mb-3" controlId="Nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control 
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                placeholder="Nome" 
                                required  />
                                <Form.Control.Feedback type="invalid">
                                    Informe o nome.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md='4'>
                            <Form.Group className="mb-3" controlId="Email">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control 
                                type="email" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="E-mail" 
                                required  />
                                <Form.Control.Feedback type="invalid">
                                    Informe o e-mail.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md='4'>
                            <Form.Group className="mb-3" controlId="Senha">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control 
                                type="password" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Senha" 
                                required  />
                                <Form.Control.Feedback type="invalid">
                                    Informe a senha.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" 
                                type="submit"
                                disabled={isLoading}>
                                {isLoading ? 'Loading…' : 'Cadastrar'}
                            </Button>
                        </Col>
                        <Col md='4'>
                            <Form.Group className="mb-3" controlId="ConfirmarSenha">
                                <Form.Label>Confirmar Senha</Form.Label>
                                <Form.Control 
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder="ConfirmarSenha" 
                                required  />
                                <Form.Control.Feedback type="invalid">
                                    Informe a confirmação da senha.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Link to="/login">
                                <Button style={{ float: 'right' }} 
                                    variant="outline-light">
                                    Voltar
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    );
}

export default Registrar;