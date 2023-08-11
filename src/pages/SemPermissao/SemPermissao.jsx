import React from "react";
import MenuSuperior from "../../components/MenuSuperior/MenuSuperior";
import { Container,Row  } from "react-bootstrap";
import Imagem from '../../shared/img/Sem-Permissao.png';

const SemPermissao = () => {
    return(
        <>
            <MenuSuperior/>
            <Container style={{marginTop:'20px'}}>
                <Row className="justify-content-md-center">
                    <img src={Imagem} style={{width:'260px'}}/>
                    <h2 style={{color:'#b40000'}}>Sem Permissão</h2>
                </Row>
            </Container>
        </>
    );
}

export default SemPermissao;