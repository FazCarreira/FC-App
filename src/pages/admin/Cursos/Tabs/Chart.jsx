import styled from "@emotion/styled";
import { Grid, Stack, Typography } from "@mui/material";
import { FaCircle } from "react-icons/fa";
import { PieChart } from 'react-minimal-pie-chart';

const Title = styled(Typography)(({ theme }) => ({
    textTransform: 'uppercase',
    fontFamily: 'Righteous',
    fontSize: theme.typography.pxToRem(18),
    marginRight: theme.spacing(2)
}))

const Label = styled(Typography)(({ theme }) => ({
    textTransform: 'uppercase',
    fontFamily: 'Righteous',
    fontSize: theme.typography.pxToRem(12),
}))

const Chart = ({ title, labels, data }) => {
    return (<>
        {title && <Title >{title}</Title>}
        <Grid container alignItems='center' spacing={2} >
            <Grid item xs={12} md={6}>
                <PieChart
                    style={{
                        fontSize: '8px',
                    }}
                    data={labels.map((g, i) => ({ title: g, color: cores[i], value: data[i] }))}
                    radius={PieChart.defaultProps.radius - 6}
                    lineWidth={60}
                    label={({ dataEntry }) => dataEntry.percentage === 0 ? false : Math.round(dataEntry.percentage) + '%'}
                    labelPosition={70}
                    labelStyle={{
                        opacity: 0.75,
                        pointerEvents: 'none',
                    }}

                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Stack spacing={1} >
                    {labels.map((g, i) => (data[i] === 0 ? false : (
                        <Grid container key={g} alignItems="center">
                            <Grid item xs={2}>
                                <FaCircle color={cores[i]} size={32} />
                            </Grid>
                            <Grid item xs={10}>
                                <Label>{g}</Label>
                            </Grid>
                        </Grid>
                    )))}
                </Stack>
            </Grid>
        </Grid>
    </>);
}


const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const cores = shuffle([
    '#E6331A',
    '#FF6633',
    '#B34D4D',
    '#CCFF1A',
    '#FFFF99',
    '#99FF99',
    '#4D8000',
    '#6680B3',
    '#991AFF',
    '#B3B31A',
    '#1AFF33',
    '#FF3380',
    '#99E6E6',
    '#6666FF'
]);
//['#993399', '#cf9bcc', '#20b1aa', '#ffa500', '#ffd191', '#20b1aa', '#a2d2d4', '#696962', '#acacad']
export default Chart;