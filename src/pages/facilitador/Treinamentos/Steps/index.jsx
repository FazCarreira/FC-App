import { useState } from "react";
import { Box, Step as MuiStep, StepButton, Stepper } from "@mui/material";

import Step from "./Step";

const Steps = ({ treinamento, participarTreinamentos, completed, allCompleted, pdf }) => {
    const { etapas } = treinamento;

    const [activeStep, setActiveStep] = useState(0);

    const handleStep = (step) => () => setActiveStep(step);
    const handleComplete = async () => {
        // const newCompleted = completed;
        // newCompleted[activeStep] = !newCompleted[activeStep];
        // setCompleted(newCompleted);
        participarTreinamentos(treinamento._id, etapas[activeStep]._id);
        const newActive = activeStep + 1;
        if (newActive < etapas.length) setActiveStep(newActive);
    };

    return (<Box sx={{ width: '100%' }}>
        <Stepper nonLinear activeStep={activeStep} alternativeLabel>
            {etapas.map(({ nome }, index) => (
                <MuiStep key={index} completed={completed[index]}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                        {nome}
                    </StepButton>
                </MuiStep>
            ))}
        </Stepper>
        <Step pdf={pdf} etapa={etapas[activeStep]} complete={handleComplete} completed={completed[activeStep]} last={activeStep + 1 === etapas.length} allCompleted={allCompleted} />
    </Box >);
}

export default Steps;