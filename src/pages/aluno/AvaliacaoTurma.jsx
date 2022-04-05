import { Box, Button, Grid, Stack, Step, StepLabel, Stepper } from "@mui/material";
import { useContext, useState } from "react";

import { avaliacaoCurso, avaliacaoModulo } from "../../constants";
import { Title } from "../../App/components/StyledComponents";
import Form from "../../App/components/Form";
import { UserContext } from "../../services/UserContext";

const AvaliacaoTurma = ({ turma }) => {

    const { setOpiniao } = useContext(UserContext);

    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState([]);
    const onChange = ({ target }) => {
        const arr = formData;
        arr[activeStep] = { ...formData[activeStep], [target.name]: target.value }
        setFormData([...arr]);
    }


    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const handleReset = () => setActiveStep(0);
    const handleSave = () => setOpiniao(formData);

    const steps = turma?.modulos.map(({ nome }) => nome);
    return (<Box sx={{ mt: 5 }}>
        <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
        {activeStep === steps.length ? (
            <Stack spacing={2} sx={{ mt: 5 }}>
                <Title sx={{ textAlign: 'center' }}>Tudo Pronto! você já pode tirar o currículo e o certificado! </Title>
                <Button fullWidth variant='contained' onClick={handleSave}>Vamos em Frente</Button>
                <Button fullWidth variant='outlined' onClick={handleReset}>Espera, acho que respondi algo errado...</Button>
            </Stack>
        ) : (<>
            <Title sx={{ mt: 2, mb: 1 }}>{activeStep === 0 ? 'Avaliar Curso' : `Avaliar Módulo ${steps[activeStep]}`}</Title>
            <Grid container spacing={2}>
                {activeStep === 0 ? (
                    avaliacaoCurso.map(q => <Form key={q.name} question={q} value={formData[activeStep]?.[q.name] || ''} onChange={onChange} />)
                ) : (
                    avaliacaoModulo.map(q => <Form key={q.name} question={q} value={formData[activeStep]?.[q.name] || ''} onChange={onChange} />)
                )}
                <Grid item>
                    <Button disabled={activeStep === 0} onClick={handleBack}>Voltar</Button>
                </Grid>
                <Grid item>
                    <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Encerrar' : 'Próximo'}
                    </Button>
                </Grid>
            </Grid>
        </>)}
    </Box>);
}

export default AvaliacaoTurma;