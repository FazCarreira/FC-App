import { useContext, useMemo } from "react";
import styled from "@emotion/styled";
import { Button, Chip, Grid, Stack, TextField, Typography } from "@mui/material";
import moment from "moment";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Chart from "../../pages/admin/Cursos/Tabs/Chart";
import { ToolsContext } from "../../services/ToolsContext";

import '../../constants/fonts/Righteous-Regular-normal'

const Title = styled(Typography)(({ theme }) => ({
    textTransform: 'uppercase',
    fontFamily: 'Righteous',
    fontSize: theme.typography.pxToRem(18),
    marginRight: theme.spacing(2)
}))

const RelatorioTurma = ({ turma, alunos, nomeCurso }) => {
    const { setLoading } = useContext(ToolsContext)

    const idadesData = useMemo(_ => {
        const data = [];
        const values = alunos?.map(aluno => (
            moment().diff(moment(aluno?.profile?.dt_nascimento, 'DD/MM/YYYY'), 'years')
        )).sort();
        data.push(values.filter(v => v < 16).length);
        data.push(values.filter(v => v > 16 && v < 20).length);
        data.push(values.filter(v => v > 20 && v < 25).length);
        data.push(values.filter(v => v > 25).length);
        return data;
    }, [alunos])

    const generoData = useMemo(_ => {
        const data = [];
        const values = alunos?.map(aluno => (
            aluno?.profile?.genero
        )).sort();
        generos.every(g => data.push(values.filter(v => v === g).length))
        return data;
    }, [alunos])

    const estadoCivilData = useMemo(_ => {
        const data = [];
        const values = alunos?.map(aluno => (
            aluno?.profile?.estado_civil
        )).sort();
        estado_civil.every(g => data.push(values.filter(v => v === g).length))
        return data;
    }, [alunos])

    const etniaData = useMemo(_ => {
        const data = [];
        const values = alunos?.map(aluno => (
            aluno?.profile?.identificacao_racial
        )).sort();
        etnia.every(g => data.push(values.filter(v => v === g).length))
        return data;
    }, [alunos])

    const baixaRendaData = useMemo(_ => {
        const data = [];
        const values = alunos?.map(aluno => (
            aluno?.profile?.baixa_renda
        )).sort();
        data.push(values.filter(v => !!v).length);
        data.push(values.filter(v => !v).length);
        return data;
    }, [alunos])

    const escolaPublicaData = useMemo(_ => {
        const data = [];
        const values = alunos?.map(aluno => (
            aluno?.profile?.escola_publica
        )).sort();
        data.push(values.filter(v => !!v).length);
        data.push(values.filter(v => !v).length);
        return data;
    }, [alunos])

    const escolaridadeData = useMemo(_ => {
        const data = [];
        const values = alunos?.map(aluno => (
            aluno?.profile?.escolaridade
        )).sort();
        escolaridade.every(g => data.push(values.filter(v => v === g).length))
        return data;
    }, [alunos])

    const quemMoraData = useMemo(_ => {
        const data = [];
        const values = alunos?.map(aluno => (
            aluno?.profile?.quem_mora
        )).sort();
        quem_mora.every(g => data.push(values.filter(v => v === g).length))
        return data;
    }, [alunos])

    const qtdMoraData = useMemo(_ => {
        const data = [];
        const values = alunos?.map(aluno => (
            aluno?.profile?.qtd_mora
        )).sort();
        qtd_mora.every(g => data.push(values.filter(v => v === g).length))
        return data;
    }, [alunos])

    const filhosData = useMemo(_ => {
        const data = [];
        const values = alunos?.map(aluno => (
            aluno?.profile?.qtd_filhos
        ));
        filhos.every(g => data.push(values.filter(v => v === g).length))
        data[0] = alunos.length - data.reduce((a, b) => a + b);
        return data;
    }, [alunos])

    const rendaData = useMemo(_ => {
        const data = [];
        const values = alunos?.map(aluno => (
            aluno?.profile?.renda_familiar
        )).sort();
        renda.every(g => data.push(values.filter(v => v === g).length))
        return data;
    }, [alunos])

    const internetData = useMemo(_ => {
        const data = [];
        const values = alunos?.map(aluno => (
            aluno?.profile?.acesso_internet
        )).sort();
        data.push(values.filter(v => v !== 'false').length);
        data.push(values.filter(v => v === 'false').length);
        return data;
    }, [alunos])

    const computadorData = useMemo(_ => {
        const data = [];
        const values = alunos?.map(aluno => (
            aluno?.profile?.possui_computador
        )).sort();
        data.push(values.filter(v => v === false).length);
        data.push(values.filter(v => v === true).length);
        return data;
    }, [alunos])

    const importanteData = useMemo(_ => {
        const data = [];
        const values = alunos?.map(aluno => (
            aluno?.profile?.importante
        )).sort();
        importante.every(g => data.push(values.filter(v => v === g).length))
        return data;
    }, [alunos])

    const futuroData = useMemo(_ => {
        const data = [];
        const values = alunos?.map(aluno => (
            aluno?.profile?.futuro
        )).sort();
        futuro.every(g => data.push(values.filter(v => v === g).length))
        return data;
    }, [alunos])

    const profissaoData = useMemo(_ => {
        const data = [];
        const values = alunos?.map(aluno => (
            aluno?.profile?.profissao
        )).sort();
        profissao.every(g => data.push(values.filter(v => v === g).length))
        return data;
    }, [alunos])

    const escolhaData = useMemo(_ => {
        const data = [];
        const values = alunos?.map(aluno => (
            aluno?.profile?.decisao
        )).sort();
        escolha.every(g => data.push(values.filter(v => v === g).length))
        return data;
    }, [alunos])

    const preparadoData = useMemo(_ => {
        const data = [];
        const values = alunos?.map(aluno => (
            aluno?.profile?.preparado
        )).sort();
        data.push(values.filter(v => v === 'N??O SEI').length);
        data.push(values.filter(v => v === 'false').length);
        data.push(values.filter(v => v === 'true').length);
        return data;
    }, [alunos])

    const appData = useMemo(_ => {
        const data = [];
        const values = alunos?.map(aluno => (
            aluno?.profile?.apps
        ));
        apps.every(g => data.push(values.filter(v => v?.includes(g)).length))
        return data;
    }, [alunos])

    const pdf = async (FileName, Imgs) => {
        setLoading(true);
        const input = Imgs?.map(id => document.getElementById(id));
        const canvas = [];
        const marginL = 40;  // margin
        const pdfInPx = 595;  // width of A4 in px
        if (input)
            for (let i = 0; i < input.length; i++) {
                const inp = input[i];
                canvas.push(await html2canvas(inp));
            }

        const doc = new jsPDF('p', 'px', [595, 842]);
        const tibrado = new Image();
        tibrado.src = '/img/Timbrado Vertical.png'

        const header = () => {
            doc.addImage(tibrado, 'PNG', 0, 0, 595, 842);
            doc.setFont("helvetica", "normal", 400);
            doc.setFontSize(24);
            doc.text(`${nomeCurso} - T${turma?.numero}`, 24, 110);
            doc.setFontSize(18);
            doc.text(`${alunos.length} alunos matriculados`, 24, 125);
        }

        doc.addImage(tibrado, 'PNG', 0, 0, 595, 842);
        doc.setFont('Righteous-Regular');
        doc.setFontSize(24);
        doc.text(`Relat??rio de Perfil`, 24, 110);
        doc.setFontSize(12);
        doc.text(`CURSO:`, 24, 130);
        doc.rect(24, 140, 150, 30);
        doc.text(`PER??ODO DE MATRICULA:`, 24, 210);
        doc.rect(24, 220, 150, 30);
        doc.text(`TURMA:`, 194, 130);
        doc.rect(194, 140, 50, 30);
        doc.text(`N?? DE:`, 194, 208);
        doc.text(`INSCRITOS:`, 194, 218);
        doc.rect(194, 220, 50, 30);
        doc.text(`EMPRESA PARCEIRA:`, 264, 130);
        doc.rect(264, 140, 150, 30);
        doc.text(`PER??ODO DO CURSO:`, 264, 210);
        doc.rect(264, 220, 150, 30);
        doc.text(`Institui????o parceira:`, 438, 130);
        doc.rect(438, 140, 150, 110);

        const aulaInicial = turma?.modulos?.reduce((curr, modulo) => moment.min(modulo.aulas.reduce((c, aula) => moment.min(moment(aula.dia), c), moment()), curr), moment());
        const aulaFinal = turma?.modulos?.reduce((curr, modulo) => moment.max(modulo.aulas.reduce((c, aula) => moment.max(moment(aula.dia), c), moment()), curr), moment());

        const periodoMatricula = {
            dia: [moment(turma?.matriculas?.inicio).format('DD'), moment(turma?.matriculas?.fim).format('DD')],
            mes: [moment(turma?.matriculas?.inicio).format('MMM'), moment(turma?.matriculas?.fim).format('MMM')],
            ano: [moment(turma?.matriculas?.inicio).format('YYYY'), moment(turma?.matriculas?.fim).format('YYYY')]
        }

        const periodoCurso = {
            dia: [aulaInicial?.format('DD'), aulaFinal?.format('DD')],
            mes: [aulaInicial?.format('MMM'), aulaFinal?.format('MMM')],
            ano: [aulaInicial?.format('YYYY'), aulaFinal?.format('YYYY')]
        }

        const periodo = (period) => {
            const { dia, mes, ano } = period;
            if (ano[0] === ano[1]) {
                if (mes[0] === mes[1]) {
                    if (dia[0] === dia[1]) {
                        return `${dia[0]} de ${mes[0]} de ${ano[0]}`
                    } else return `De ${dia[0]} ?? ${dia[1]} de ${mes[0]} de ${ano[0]}`
                } else return `${dia[0]} de ${mes[0]} ?? ${dia[1]} de ${mes[1]} de ${ano[0]}`
            } else return `De ${dia[0]} de ${mes[0]} de ${ano[0]} ?? ${dia[1]} de ${mes[1]} de ${ano[1]}`
        }

        console.log(periodo(periodoMatricula));

        doc.setFont("helvetica");
        doc.setFontSize(14);
        doc.text(`${nomeCurso}`, 28, 158);
        doc.text(`${periodo(periodoMatricula)}`,28,238);
        doc.text(`${turma?.numero}`, 209, 158);
        doc.text(`${alunos?.length}`, 209, 238);
        doc.text(`${turma?.apoiadores?.join(',')}`, 274, 158);
        doc.text(`${periodo(periodoCurso)}`, 270, 238);
        turma?.instituicao.forEach((l, i) => doc.text(`${l}`, 448, 155 + i * 14));


        doc.addPage([595, 842], 'p');

        header();
        let count = 0;
        canvas.forEach((c, i, t) => {
            const imgData = c.toDataURL('image/png');
            if (i !== t.length - 1) doc.addImage(imgData, 'JPEG', 24, 140 + count * 180, 618, 174);
            else doc.addImage(imgData, 'JPEG', 24, 130, 618, 51);
            count++;
            if (count === 3) {
                doc.addPage([595, 842], 'p');
                header();
                count = 0
            }
        });

        doc.setFont("helvetica", "normal", 400);
        doc.setFontSize(18);
        doc.text(`Problemas que a turma enfrenta:`, 24, 220);
        doc.setFont("helvetica", 'normal', 'normal');
        let c = 0;
        let base = 240;
        alunos.forEach(aluno => {
            const paragraph = ` - ${aluno?.profile?.conflitos}`
            const lines = doc.splitTextToSize(paragraph, pdfInPx - marginL);
            if (base + (c * 20) > 700) {
                doc.addPage([595, 842], 'p');
                header();
                base = 150;

                doc.setFont("helvetica", "normal", 400);
                doc.setFontSize(18);
                doc.text(`Problemas que a turma enfrenta:`, 24, 155);
                doc.setFont("helvetica", 'normal', 'normal');
                c = 1;
            }
            if (lines.length === 1) {
                doc.setFontSize(12);
                doc.text(` - ${aluno?.profile?.conflitos}`, 24, base + (c * 20));
                c++;
            }
        })

        base = 10 + base + c * 20;
        c = 1;

        doc.setFont("helvetica", "normal", 400);
        doc.setFontSize(18);
        doc.text(`Tiram a turma do s??rio:`, 24, base);
        doc.setFont("helvetica", 'normal', 'normal');
        alunos.forEach(aluno => {
            const paragraph = ` - ${aluno?.profile?.raiva}`
            const lines = doc.splitTextToSize(paragraph, pdfInPx - marginL);
            if (base + (c * 20) > 700) {
                doc.addPage([595, 842], 'p');
                header();
                base = 150;

                doc.setFont("helvetica", "normal", 400);
                doc.setFontSize(18);
                doc.text(`Tiram a turma do s??rio:`, 24, 155);
                doc.setFont("helvetica", 'normal', 'normal');
                c = 1;
            }
            if (lines.length === 1) {
                doc.setFontSize(12);
                doc.text(` - ${aluno?.profile?.raiva}`, 24, base + (c * 20));
                c++;
            }
        })

        await doc.save(`${FileName}.pdf`);
        setLoading(false);
    }
    //, 'graficos4', 'graficos5', 'graficos6'
    return (<>
        <Button fullWidth variant="contained" onClick={() => pdf('Relat??rio da Turma', ['graficos1', 'graficos2', 'graficos3', 'apps'])}>Baixar PDF</Button>
        <Grid container alignItems='center' spacing={2} id='graficos1'>
            <Grid item xs={12} md={6}>
                <Chart title='Idades' labels={idades} id='idades' data={idadesData} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Chart title='Estado Civil' labels={estado_civil} id='estado_civil' data={estadoCivilData} />
            </Grid>
        </Grid>
        <Grid container alignItems='center' spacing={2} id='graficos1'>
            <Grid item xs={12} md={6}>
                <Chart title='G??neros' labels={generos} id='generos' data={generoData} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Chart title='Etnia' labels={etnia} id='etnia' data={etniaData} />
            </Grid>
        </Grid>
        <Grid container alignItems='center' spacing={2} id='graficos1'>
            <Grid item xs={12} md={6}>
                <Chart title='Baixa Renda' labels={baixa_renda} id='baixa_renda' data={baixaRendaData} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Chart title='Rede p??blica' labels={escola_publica} id='escola_publica' data={escolaPublicaData} />
            </Grid>
        </Grid>
        {/* <Grid container alignItems='center' spacing={2} id='graficos1'>
        <Grid item xs={12} md={6}>
        <Chart title='J?? fez cursos online?' labels={['S id='[''IM','N??O']} data={[2,5]} />
        </Grid>
        
        <Grid item xs={12} md={6}>
        <Chart title='J?? fez cursos de capacita????o profissional?' labels={['S id='[''IM','N??O']} data={[1,4]} />
    </Grid>
    </Grid> */}
        <Grid container alignItems='center' spacing={2} id='graficos1'>
            <Grid item xs={12} md={6}>
                <Chart title='Escolaridade' labels={escolaridade} id='escolaridade' data={escolaridadeData} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Chart title='Com quem mora' labels={quem_mora} id='quem_mora' data={quemMoraData} />
            </Grid>
        </Grid>
        <Grid container alignItems='center' spacing={2} id='graficos2'>
            <Grid item xs={12} md={6}>
                <Chart title='Pessoas morando na casa' labels={qtd_mora} id='qtd_mora' data={qtdMoraData} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Chart title='Tem Filhos' labels={filhos} id='filhos' data={filhosData} />
            </Grid>
        </Grid>
        <Grid container alignItems='center' spacing={2} id='graficos3'>
            <Grid item xs={12} md={6}>
                <Chart title='Renda Familiar' labels={renda} id='renda' data={rendaData} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Chart title='Tem acesso a internet' labels={internet} id='internet' data={internetData} />
            </Grid>
        </Grid>
        <Grid container alignItems='center' spacing={2} id='graficos4'>
            <Grid item xs={12} md={6}>
                <Chart title='Tem computador' labels={computador} id='computador' data={computadorData} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Chart title='Motiva????o para ter trabalho' labels={importante} id='importante' data={importanteData} />
            </Grid>
        </Grid>
        <Grid container alignItems='center' spacing={2} id='graficos5'>
            <Grid item xs={12} md={6}>
                <Chart title='Como se v?? em 5 anos' labels={futuro} id='futuro' data={futuroData} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Chart title='Alvo de profiss??o' labels={profissao} id='profissao' data={profissaoData} />
            </Grid>
        </Grid>
        <Grid container alignItems='center' spacing={2} id='graficos6'>
            <Grid item xs={12} md={6}>
                <Chart title='Quem ajudou a escolher o alvo' labels={escolha} id='escolha' data={escolhaData} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Chart title='Sente-se preparado para o mercado de trabalho' labels={preparado} id='preparado' data={preparadoData} />
            </Grid>
        </Grid>
        <Grid container alignItems='center' spacing={2} id={'apps'} sx={{ mb: 2 }}>
            <Grid item xs={12}>
                <Title>Apps utilizados</Title>
            </Grid>
            <Grid item xs={12}>
                <Stack direction='row' spacing={1}>
                    {apps.map((app, i) => <Chip key={i} label={`${app} ${appData[i]}`} color="primary" />)}
                </Stack>
            </Grid>
        </Grid>
        <Grid container alignItems='center' spacing={2}>
            <Grid item xs={12}>
                <Title>Problemas que a turma enfrenta</Title>
            </Grid>
            {alunos.map(aluno => (
                <Grid item xs={12} key={aluno?._id} >
                    <TextField
                        value={aluno?.profile?.conflitos}
                        maxRows={4}
                        multiline
                        disabled
                        fullWidth
                        sx={{ input: { color: 'black' } }}
                    />
                </Grid>
            ))}
            <Grid item xs={12}>
                <Title>Coisas que tiram a turma do s??rio</Title>
            </Grid>
            {alunos.map(aluno => (
                <Grid item xs={12} key={aluno?._id} >
                    <TextField
                        value={aluno?.profile?.raiva}
                        maxRows={4}
                        multiline
                        disabled
                        fullWidth
                        sx={{ input: { color: 'black' } }}
                    />
                </Grid>
            ))}
        </Grid>
    </>);
}
//['idades', 'estado_civil', 'generos', 'etnia', 'baixa_renda', 'escola_publica', 'escolaridade', 'quem_mora', 'qtd_mora', 'filhos', 'renda', 'internet', 'computador', 'importante', 'futuro', 'profissao', 'escolha', 'preparado']
const idades = ['Menos de 16 anos', 'De 16 ?? 20 anos', 'De 21 ?? 25 anos', 'Mais de 25 anos'];
const generos = ['Feminino', 'Masculino', 'N??o-bin??rio', 'Prefiro n??o informar'];
const estado_civil = ['Solteiro (a)', 'Casado (a)', 'Separado (a)', 'Divorciado (a)', 'Vi??vo (a)'];
const etnia = ['Amarela', 'Branca', 'Ind??gena', 'Parda', 'Preta', 'prefiro n??o opinar'];
const baixa_renda = ['SIM', 'N??O'];
const escola_publica = ['SIM', 'N??O'];
const escolaridade = ['N??vel m??dio - incompleto ou cursando', 'N??vel m??dio ??? completo', 'Superior incompleto ou cursando', 'Superior completo'];
const quem_mora = ['Minha fam??lia', 'Sozinho', 'Com parentes'];
const qtd_mora = ['Moro sozinho', 'Uma pessoa', 'Duas Pessoas', 'Tr??s Pessoas', 'Quatro Pessoas', 'Cinco Pessoas', 'Mais de cinco Pessoas'];
const renda = ['At?? um sal??rio m??nimo', 'Dois sal??rios m??nimos', 'Acima de dois sal??rios m??nimos'];
const internet = ['SIM', 'N??O'];
const computador = ['SIM', 'N??O'];
const importante = ['Para ter mais responsabilidade', 'Independ??ncia financeira', 'Sentir-me ??til', 'Adquirir experi??ncia', 'Ajudar minha fam??lia'];
const futuro = ['Com um diploma universit??rio e um bom emprego', 'Trabalhando no setor p??blico ou estudando pra concurso', 'Ganhando dinheiro com meu pr??prio neg??cio', 'N??o planejei']
const profissao = ['Ainda n??o escolhi', 'Profiss??o ligada ??s Engenharias / Ci??ncias Tecnol??gicas.', 'Profiss??o ligada ??s Ci??ncias Humanas.', 'Profiss??o ligada ??s Artes.', 'Profiss??o ligada ??s Ci??ncias Biol??gicas e da Sa??de.', 'Professor(a) de Ensino Fundamental e M??dio.', 'Empreendedor.'];
const escolha = ['Meus pais', 'A escola', 'Meus (Minhas) amigos(as)', 'Informa????es gerais, revistas, jornais, TV', 'Meu trabalho', 'Est??mulo financeiro', 'Facilidade de obter emprego', 'Eu me identifico com essa profiss??o'];
const preparado = ['N??O SEI', 'SIM', 'N??O'];
const filhos = ['N??o tenho filhos', 'Um filho', 'Dois filhos', 'Tr??s ou mais filhos'];
const apps = ['Linkedin', 'Facebook', 'Instagram', 'Youtube', 'WhatsApp', 'Zoom', 'Google Meet', 'Skype', 'Sympla'];

export default RelatorioTurma;