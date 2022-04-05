import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid } from "@mui/material";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Title } from "../StyledComponents";
import useStyles from "./styles";

export const AutoAccordion = ({ array }) => {
    const [expanded, setExpanded] = useState(array?.[0]?.name);
    const handleChange = (panel) => (_, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    if (!array) return "CARREGANDO"
    return array.map(a => (
        <ControlledAccordion
            key={a?.name}
            title={a?.name}
            expanded={expanded === a?.name}
            onChange={handleChange(a?.name)}
        >
            {a?.render}
        </ControlledAccordion>
    ));
}

export const ControlledAccordion = ({ expanded, onChange, title, children, secondary }) => {
    const classes = useStyles();

    return (
        <Accordion
            expanded={expanded}
            onChange={onChange}
        >
            <AccordionSummary
                aria-controls={`${title}-content`}
                id={`${title}-header`}
                expandIcon={<FaAngleDown />}
            >
                <Grid container sx={{ mx: 1 }} justifyContent='space-between' alignItems='center' >
                    <Grid item><Title className={classes.heading}>{title}</Title></Grid>
                    <Grid item><div className={classes.secondary}>{secondary}</div></Grid>
                </Grid>
            </AccordionSummary>
            <Divider className={classes.opDivider} />
            <AccordionDetails className={classes.details}>
                {children}
            </AccordionDetails>
        </Accordion>
    );
}