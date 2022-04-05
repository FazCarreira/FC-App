import { useState } from "react";

import axios from 'axios';

import InputMask from "react-input-mask";
import { Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";

// import { ToolsContext } from "../services/ToolsContext";

const Title = styled(Typography)(({ theme }) => ({
    textTransform: 'uppercase',
    fontFamily: 'Righteous',
    fontSize: theme.typography.pxToRem(16),
    marginTop: '32px',
}))

const estadosBrasileiros = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

const AddressForm = ({ onChange, ro, data }) => {

    // const { addAlert } = useContext(ToolsContext);

    const [formData, setFormData] = useState(data || {
        cep: '',
        estado: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: '',
        complemento: '',
    });

    const handleChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value });
        onChange?.({ ...formData, [target.name]: target.value });
    }

    const cepComplement = async () => {
        try {
            const { data } = await axios.get(`https://ws.apicep.com/cep/${formData.cep}.json`);
            setFormData({ ...formData, estado: data.state, cidade: data.city, bairro: data.district, rua: data.address })
        } catch (err) {
            // addAlert('Erro ao Recuperar CEP', '', 2000);
        }
    }

    return (
        <>
            <Grid item xs={12}>
                <Title>Endereço:</Title>
                <Divider />
            </Grid>
            <Grid item xs={12} sm={3}>
                <InputMask
                    defaultValue=' '
                    mask={'99999-999'}
                    maskChar=" "
                    onBlur={cepComplement}
                    required
                    name={'cep'}
                    label={'CEP'}
                    fullWidth
                    value={formData.cep}
                    onChange={handleChange}
                    disabled={ro}
                >
                    {() => <TextField
                        onBlur={cepComplement}
                        required
                        name={'cep'}
                        label={'CEP'}
                        fullWidth
                        value={formData.cep}
                        onChange={handleChange}
                        disabled={ro}
                    />}
                </InputMask>
            </Grid>
            <Grid item xs={12} sm={2}>
                <FormControl fullWidth>
                    <InputLabel id={'estado'}>Estado</InputLabel>
                    <Select
                        defaultValue=''
                        labelId={'estado'}
                        required
                        name='estado'
                        fullWidth
                        value={formData.estado || ''}
                        onChange={handleChange}
                        disabled={ro}
                    >
                        {estadosBrasileiros.map((eb) => <MenuItem key={eb} value={eb}>{eb}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={7}>
                <TextField
                    defaultValue=' '
                    required
                    name='cidade'
                    label='Cidade'
                    fullWidth
                    value={formData.cidade}
                    onChange={handleChange}
                    disabled={ro}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    defaultValue=' '
                    required
                    name='bairro'
                    label='Bairro'
                    fullWidth
                    value={formData.bairro}
                    onChange={handleChange}
                    disabled={ro}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    defaultValue=' '
                    required
                    name='rua'
                    label='Rua'
                    fullWidth
                    value={formData.rua}
                    onChange={handleChange}
                    disabled={ro}
                />
            </Grid>
            <Grid item xs={12} sm={2}>
                <TextField
                    defaultValue=' '
                    required
                    name='numero'
                    label='Numero'
                    fullWidth
                    value={formData.numero}
                    onChange={handleChange}
                    disabled={ro}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    defaultValue=' '
                    required
                    name='complemento'
                    label='Complemento'
                    fullWidth
                    value={formData.complemento}
                    onChange={handleChange}
                    disabled={ro}
                />
            </Grid>
        </>
    );
}

export default AddressForm;