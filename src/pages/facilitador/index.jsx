import { Fragment, useContext, useState } from 'react';
import { Button, Grid, Step, StepConnector, stepConnectorClasses, StepLabel, Stepper } from '@mui/material';
import { Box, styled } from '@mui/system';

import { Navigate } from 'react-router';

import { AuthenticationContext } from '../../services/AuthContext';
import { ToolsContext } from '../../services/ToolsContext';
import TermoImagem from '../../constants/Termo';
import { facilitadorPerfilIn } from '../../constants';
import Form from '../../App/components/Form';
import ModalForm from '../../App/components/ModalForm';

const steps = ['Informações Básicas', 'Dados Bancários'];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const FacilitadorProfile = () => {

    const { profile, logout, user, createProfile } = useContext(AuthenticationContext);
    const { addAlert } = useContext(ToolsContext);

    const [activeStep, setActiveStep] = useState(0);

    // useEffect(() => document.addEventListener('scroll', this.trackScrolling), []);

    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        endereco: {
            cep: '',
            estado: '',
            cidade: '',
            bairro: '',
            rua: '',
            numero: '',
            complemento: '',
        },
        inscricao_municipal: '',
        inscricao_estadual: '',
        contribuinte: '',
        dt_nascimento: new Date,
        estado_civil: '',
        nome_contato: '',
        ramo: '',
        camisa: '',
        cpf: '',
        cnpj: '',
        info_bancaria: {
            tipo: '',
            banco: '',
            agencia: '',
            conta: '',
            pix: '',
        },
    });

    const handleNext = () => {
        if (!facilitadorPerfilIn[activeStep].some((v) => formData?.[v.name] === '')) {
            if (activeStep + 1 !== steps.length) setActiveStep((prevActiveStep) => prevActiveStep + 1);
            else if (activeStep + 1 === steps.length) setOpen(true);
        } else addAlert("Complete o perfil!", 'warning');
    };

    const handleBack = () => {
        if (activeStep === 0) return logout();
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onChange = ({ target }) => setFormData({ ...formData, [target.name]: target.value });
    const onChangeBank = ({ target }) => setFormData({ ...formData, info_bancaria: { ...formData.info_bancaria, [target.name]: target.value } });

    if (profile) return <Navigate to="/facilitador/perfil" />
    else return (<>
        <ModalForm
            title='Termos de uso'
            body={TermoImagem(user.name, formData.estado_civil, formData.rg, formData.cpf, formData.endereco?.rua, formData.endereco.numero, formData.endereco.complemento, formData.endereco.cidade, formData.endereco.estado)}
            onConfirm={(nData) => createProfile(formData)}
            open={open} onClose={() => setOpen(false)}
        />
        <Box sx={{ my: 4 }}>
            <Stepper alternativeLabel sx={{ my: 3 }} activeStep={activeStep} connector={<QontoConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Fragment>
                <Grid container spacing={3}>
                    {facilitadorPerfilIn[activeStep].map(q => <Form key={q.name} question={q} value={formData[q.name]} onChange={activeStep === 0 ? onChange : onChangeBank} />)}
                </Grid>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 1 }}>
                    <Button
                        color="inherit"
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        {activeStep === 0 ? 'Sair' : 'Voltar'}
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleNext} >
                        {activeStep === steps.length - 1 ? 'Encerrar' : 'Continuar'}
                    </Button>
                </Box>
            </Fragment>
        </Box >
    </>);
}

export default FacilitadorProfile;