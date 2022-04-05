import { useState } from "react";
import { Box, Step as MuiStep, StepButton, Stepper } from "@mui/material";

import Step from "./Step";

const Steps = ({ treinamento, onUpdate }) => {

    const { etapas } = treinamento;

    const [activeStep, setActiveStep] = useState(0);

    const handleStep = (step) => () => setActiveStep(step);

    const handleUpdate = (body) => {
        const arr = etapas;
        arr[activeStep] = { ...arr[activeStep], ...body };
        onUpdate({ _id: treinamento._id, etapas: arr });
    };

    return (<Box sx={{ width: '100%' }}>
        <Stepper nonLinear activeStep={activeStep} alternativeLabel>
            {etapas.map(({ nome }, index) => (
                <MuiStep key={index}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                        {nome}
                    </StepButton>
                </MuiStep>
            ))}
        </Stepper>
        {<Step etapa={etapas[activeStep]} save={handleUpdate} />}
    </Box >);
}

export default Steps;