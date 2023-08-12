import React, { useEffect, useState } from 'react';
import MenuSuperior from '../../components/MenuSuperior/MenuSuperior';
import {Container} from 'react-bootstrap';
import  Row  from 'react-bootstrap/Row';
import api from './../../services/API/api';
import CardPremioDisponivel from '../../components/CardPremioDisponivel/CardPremioDisponivel';

const Premios = () => {
    const [premios, setpremios] = useState([]);
    const token = localStorage.getItem('token');

    const authorization = {
        headers : {
            Authorization: 'Bearer '+token,
        }
    }

    useEffect(() => {
        api.get('v1/premio/ListaPremiosDisponiveis', authorization)
        .then(
            response => {setpremios(response.data.message);}
        , token)
    },[]);

    return <>
        <MenuSuperior/>
        <Container style={{ marginTop: '20px' }}>
            <Row>
            {premios.map((premio) => (
                <CardPremioDisponivel key={premio.id} premio={premio} />
            ))};
            </Row>
        </Container>
    </>
}

export default Premios;
