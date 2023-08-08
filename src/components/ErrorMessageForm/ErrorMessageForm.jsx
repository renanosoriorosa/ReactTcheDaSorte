import Alert from 'react-bootstrap/Alert';
const ErrorMessageForm = ({possuiErro, tituloErro, mensagemErro}) => {
    return (
        <>
            {possuiErro === true ? (
                <Alert variant="danger">
                    <Alert.Heading>{tituloErro}</Alert.Heading>
                    <p>{mensagemErro}</p>
                </Alert>
            ):
            (<></>)}
        </>
    );
}

export default ErrorMessageForm;