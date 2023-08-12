import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CardPremioDisponivel = ({premio}) => {
    async function VerCartelas(idPremio){

    }

    function FormatarData(data){
        const date = new Date(data);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês é base 0
        const year = date.getFullYear();

        return`${day}/${month}/${year}`;
    }

    return(
        <Card style={{ width: '18rem', margin:'5px' }}>
            <Card.Body>
                <Card.Title>{premio.codigo}</Card.Title>
                <Card.Text>
                    Prêmio com valor de <strong>R$ {premio.valorPremio}</strong>.
                    <br/>
                    Previsto para <strong>{FormatarData(premio.dataEnvento)}</strong>
                </Card.Text>
                <Button variant="primary">Ver Cartelas</Button>
            </Card.Body>
        </Card>
    );
}

export default CardPremioDisponivel;