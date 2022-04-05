import { Fragment, useContext } from "react";
import { Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { MobileDatePicker } from "@mui/lab";

import AddressForm from "./AddressForm";
import InputMask from "react-input-mask";
import { ToolsContext } from "../../services/ToolsContext";

const Form = ({ question, onChange, value }) => {

    const { addAlert } = useContext(ToolsContext);

    const handleAddressNDate = (value) => onChange({ target: { name: [question?.name], value } });;
    const handleChange = ({ target }) => {
        const { name, value } = target;
        if (question?.limit && value.length > question?.limit) {
            addAlert(question?.warn, 'warning');
        }
        else onChange({ target: { name: [name], value: typeof value === 'string' ? value.split(',') : value } })
    };

    switch (question?.type) {
        case 'bool':
            return (
                <Fragment>
                    <Grid item xs={12} sm={question?.full ? 12 : question?.half ? 3 : 6}>
                        <FormControl fullWidth>
                            <InputLabel id={question?.question}>{question?.question}</InputLabel>
                            <Select
                                labelId={question?.question}
                                required
                                name={question?.name}
                                onChange={onChange}
                                input={<OutlinedInput label={question?.question} />}
                                MenuProps={MenuProps}
                                value={value}
                            >
                                <MenuItem value={true}>Sim</MenuItem>
                                <MenuItem value={false}>Não</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {(question?.yes && value) && <Form question={question?.yes} />}
                </Fragment>
            )
        case 'select':
            return (
                <Fragment>
                    <Grid item xs={12} sm={question?.full ? 12 : question?.half ? 3 : 6}>
                        <FormControl fullWidth>
                            <InputLabel id={question?.question}>{question?.question}</InputLabel>
                            <Select
                                labelId={question?.question}
                                required
                                name={question?.name}
                                multiple={question?.multi}
                                onChange={question?.multi ? handleChange : onChange}
                                input={<OutlinedInput label={question?.question} />}
                                renderValue={(selected) => typeof selected === 'string' ? selected : selected.join(', ')}
                                MenuProps={MenuProps}
                                value={value}
                            >
                                {question?.options.map((opt) => (
                                    question?.multi ? (
                                        <MenuItem key={opt} value={opt}>
                                            <Checkbox checked={value?.indexOf(opt) > -1} />
                                            <ListItemText primary={opt} />
                                        </MenuItem>
                                    ) : (
                                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                    )
                                ))}
                                {question?.other && <MenuItem value='Outro'>Outro</MenuItem>}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* {(question?.other && value === 'Outro') && stepQuestions(question?.other)} */}
                </Fragment>
            )
        case 'address':
            return <AddressForm data={value} onChange={handleAddressNDate} />
        case 'date':
            return (
                <Grid item xs={12} sm={question?.full ? 12 : question?.half ? 3 : 6}>
                    <MobileDatePicker
                        label={question?.question}
                        value={value}
                        openTo="year"
                        name={question?.name}
                        onChange={handleAddressNDate}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                    />
                </Grid>
            )
        case 'number':
            return (
                <Grid item xs={12} sm={question?.full ? 12 : question?.half ? 3 : 6}>
                    <FormControl fullWidth>
                        <FormLabel sx={{ mx: 'auto' }}>{question?.question}</FormLabel>
                        <RadioGroup sx={{ mx: 'auto' }} row name={question?.name} value={value} onChange={onChange}>
                            {[...Array(question?.options)].map((_, i) => <FormControlLabel key={i} value={i + 1} control={<Radio />} label={i + 1} />)}
                        </RadioGroup>
                    </FormControl>
                </Grid>
            )
        case 'radio':
            return (
                <Grid item xs={12} sm={question?.full ? 12 : question?.half ? 3 : 6}>
                    <FormControl fullWidth>
                        <FormLabel>{question?.question}</FormLabel>
                        <RadioGroup name={question?.name} value={value} onChange={onChange}>
                            {question?.options.map(q => <FormControlLabel key={q} value={q} control={<Radio />} label={q} />)}
                        </RadioGroup>
                    </FormControl>
                </Grid>
            )
        case 'radio-bool':
            return (
                <Grid item xs={12} sm={question?.full ? 12 : question?.half ? 3 : 6}>
                    <FormControl fullWidth>
                        <FormLabel>{question?.question}</FormLabel>
                        <RadioGroup name={question?.name} value={value} onChange={onChange}>
                            <FormControlLabel value={true} control={<Radio />} label='Sim' />
                            <FormControlLabel value={false} control={<Radio />} label='Não' />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            )
        default:
            return (
                <Grid item xs={12} sm={question?.full ? 12 : question?.half ? 3 : 6}>
                    {question?.mask ? (
                        <InputMask
                            mask={question?.mask}
                            value={value}
                            maskChar=" "
                            onChange={onChange}
                        >
                            {() => <TextField
                                required={question?.required}
                                name={question?.name}
                                label={question?.question}
                                fullWidth
                                multiline={question?.multi}
                                minRows={question?.multi ? 3 : 1}
                                value={value}
                                onChange={onChange} />}
                        </InputMask>
                    ) : (
                        <TextField
                            required={question?.required}
                            name={question?.name}
                            label={question?.question}
                            fullWidth
                            multiline={question?.multi}
                            minRows={question?.multi ? 3 : 1}
                            value={value}
                            type={question?.type}
                            onChange={onChange} />
                    )}
                </Grid>
            );
    }
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default Form;