import { createContext, useContext } from 'react';
import moment from 'moment';
import jsPDF from 'jspdf'

import { ToolsContext } from './ToolsContext';

import '../constants/fonts/League Spartan-bold'

export const PdfContext = createContext();

export const PdfContextProvider = ({ children }) => {

    const { setLoading } = useContext(ToolsContext);

    const gerarCurriculo = (curriculo) => async _ => {
        const hobbieArr = ['ASSISTIR FILME', 'BORDAR', 'COSTURAR', 'COZINHAR', 'DANÇAR', 'ESCREVER', 'EXERCITAR-SE', 'IR À PRAIA', 'JOGAR VIDEO GAME', 'JOGAR BOLA', 'JOGAR XADREZ', 'LER', 'MEDITAR', 'OUVIR MÚSICA', 'SAIR COM OS AMIGOS', 'VIAJAR'];
        const apoioArr = ['COMBATE À FOME', 'EDUCAÇÃO', 'IDOSOS', 'CRIANÇA E ADOLESCENTE', 'SAÚDE', 'MEIO AMBIENTE', 'ANIMAIS'];
        const softSkills = ['COMUNICAÇÃO', 'INTELIGÊNCIA EMOCIONAL', 'GESTÃO DE CONFLITOS'];
        const { email, name, phone, endereco, idiomas, hobbies, apoio, resumo, objetivo, office, formacao, profissional, voluntario, cursos } = curriculo;
        setLoading(true);

        const PHONE = new Image();
        const EMAIL = new Image();
        const LOCAL = new Image();
        const CURSOS = new Image();
        PHONE.src = '/img/currículo/37.png'
        EMAIL.src = '/img/currículo/38.png'
        LOCAL.src = '/img/currículo/39.png'
        CURSOS.src = '/img/currículo/29.png'

        const doc = new jsPDF('p', 'px', [595, 842]);
        const pdfInPx = 595;
        const marginR = 180;
        let yPos = 80;
        const wrapLine = (paragraph, x, y, marginL = 20) => {
            const lines = doc.splitTextToSize(paragraph, pdfInPx - marginL - x);
            const dim = doc.getTextDimensions('Text');
            const lineHeight = dim.h;
            for (let j = 0; j < lines.length; j++) {
                let lineTop = (lineHeight) * j;
                doc.text(lines[j], x, y + lineTop);
                yPos = y + lineTop + lineHeight;
            }
        }
        const header = () => {
            yPos = 0;
            doc.setFont("League Spartan", "bold");
            doc.setFontSize(24);
            wrapLine(`${name}`, 10, 35);
            yPos += 10
        }

        const leftSessionHeader = (name, altura) => {
            doc.setFont("League Spartan", "bold");
            doc.setFontSize(14);
            doc.setTextColor('#606060');
            doc.setFillColor('#606060');
            doc.rect(15, altura + 5, 45, 5, 'F');
            doc.text(name, 15, altura);
            doc.setFont('times', 'normal');
            doc.setFontSize(12);
            yPos += 20;
        }

        const rightSessionHeader = (name, img, altura) => {
            doc.setFont("League Spartan", "bold");
            doc.setFontSize(14);
            doc.setTextColor('#606060');
            doc.setFillColor('#606060');
            doc.addImage(img, 'PNG', 190, altura, 40, 40);
            const { w } = doc.getTextDimensions(name);
            doc.text(name, 240, altura + 20, { baseline: 'middle' });
            doc.line(250 + w, altura + 19, 560, altura + 19);
            doc.setFont('times', 'normal');
            doc.setFontSize(12);
            yPos += 40;
        }

        header();

        doc.setFillColor('#e5e5e5');
        doc.rect(0, 50, marginR, 842, 'F');

        leftSessionHeader('CONTATO', yPos);
        doc.setFontSize(12);
        doc.addImage(PHONE, 'PNG', 15, yPos, 20, 20);
        wrapLine(phone, 40, yPos + 12, marginR);

        doc.addImage(EMAIL, 'PNG', 15, yPos, 20, 20);
        wrapLine(email, 40, yPos + 12, marginR);

        doc.addImage(LOCAL, 'PNG', 15, yPos, 20, 20);
        wrapLine(`${endereco.rua},${endereco.numero}`, 40, yPos + 12, marginR);
        wrapLine(endereco.bairro, 40, yPos, marginR);
        wrapLine(`${endereco.cidade}/${endereco.estado}`, 40, yPos, marginR);
        yPos+=20;

        if (idiomas?.length > 0) {
            leftSessionHeader('IDIOMAS', yPos);
            idiomas.forEach(({ idioma, nivel }) => wrapLine(`${idioma} - ${nivel}`, 15, yPos, marginR));
        }

        yPos+=20;

        leftSessionHeader('SOFT SKILLS', yPos);
        doc.setFontSize(12);
        softSkills.forEach((skill, i) => {
            const IMG = new Image();
            IMG.src = `/img/currículo/${i + 1}.png`;
            if (i !== 0) yPos += 7;
            doc.addImage(IMG, 'PNG', 15, yPos, 30, 30);
            wrapLine(skill, 50, yPos + 17, marginR);
        });

        yPos+=20;

        if (hobbies?.length > 0) {
            leftSessionHeader('HOBBIES', yPos);
            yPos += 5;
            hobbies.forEach((hobbie, i) => {
                const index = hobbieArr.indexOf(hobbie) + 4;
                const IMG = new Image();
                IMG.src = `/img/currículo/${index}.png`;
                if (i !== 0) yPos += 7;
                doc.addImage(IMG, 'PNG', 15, yPos, 30, 30);
                wrapLine(hobbie, 50, yPos + 17, marginR);
            });
        }

        yPos+=20;

        if (apoio?.length > 0) {
            leftSessionHeader('CAUSAS QUE APOIO', yPos);
            apoio.forEach((ap, i) => {
                const index = apoioArr.indexOf(ap) + 20;
                const IMG = new Image();
                IMG.src = `/img/currículo/${index}.png`;
                if (i !== 0) yPos += 7;
                doc.addImage(IMG, 'PNG', 15, yPos, 30, 30);
                wrapLine(ap, 50, yPos + 17, marginR);
            });
        }

        yPos = 50;
        if (resumo) {
            const RESUMO = new Image();
            RESUMO.src = '/img/currículo/40.png';
            rightSessionHeader('RESUMO', RESUMO, yPos);
            wrapLine(resumo, 240, yPos);
            yPos += 10;
        }
        
        if (objetivo) {
            const OBJETIVO = new Image();
            OBJETIVO.src = '/img/currículo/41.png';
            rightSessionHeader('OBJETIVO', OBJETIVO, yPos);
            wrapLine(objetivo, 240, yPos);
            yPos += 10;
        }

        if (formacao?.length > 0) {
            const FORMACAO = new Image();
            FORMACAO.src = '/img/currículo/42.png'
            rightSessionHeader('FORMAÇÃO', FORMACAO, yPos);
            let newPos = yPos;
            let endPos = yPos;
            formacao.forEach((f, i) => {
                if (i !== 0) yPos += 10;
                if (i % 2 === 0) {
                    newPos = yPos;
                    doc.setFontSize(12);
                    wrapLine(`${f?.nome} - ${f?.instituicao}`, 240, yPos, 180);
                    doc.setFontSize(10);
                    wrapLine(`${moment().diff(moment(f?.conclusao, 'DD/MM/YYYY')) < 0 ? 'Previsão de conclusão em:' : 'Concluido em:'} ${f?.conclusao}`, 240, yPos + 2, 180);
                    endPos = yPos;
                } else {
                    doc.setFontSize(12);
                    wrapLine(`${f?.nome} - ${f?.instituicao}`, 400, newPos);
                    doc.setFontSize(10);
                    wrapLine(`${moment().diff(moment(f?.conclusao, 'DD/MM/YYYY')) < 0 ? 'Previsão de conclusão em:' : 'Concluido em:'} ${f?.conclusao}`, 400, yPos + 2);
                    yPos = Math.max(yPos, endPos);
                }
            });
            yPos += 10
        }

        if (office) {
            const OFFICE = new Image();
            OFFICE.src = '/img/currículo/27.png';
            rightSessionHeader('PACOTE OFFICE', OFFICE, yPos);
            Object.values(office).forEach((v, i) => {
                const O = new Image();
                O.src = `/img/currículo/${31 + i}.png`;
                doc.addImage(O, 'PNG', 260 + i * 100, yPos, 40, 40)
                const B = new Image();
                switch (v) {
                    case 'medio':
                        B.src = `/img/currículo/36.png`;
                        doc.addImage(B, 'PNG', 240 + i * 100, yPos + 10, 80, 80)
                        break;
                    case 'alto':
                        B.src = `/img/currículo/34.png`;
                        doc.addImage(B, 'PNG', 240 + i * 100, yPos + 10, 80, 80)
                        break;
                    default:
                        B.src = `/img/currículo/35.png`;
                        doc.addImage(B, 'PNG', 240 + i * 100, yPos + 10, 80, 80)
                        break;
                }
            })
            yPos += 70;
        }

        if (cursos?.length > 0) {
            const CURSOS = new Image();
            CURSOS.src = '/img/currículo/43.png'
            rightSessionHeader('CURSOS', CURSOS, yPos);
            cursos.forEach((f, i) => {

                // const dia = [moment(f.inicio).format('DD'), moment(f.fim).format('DD')]
                // const mes = [moment(f.inicio).format('MMM'), moment(f.fim).format('MMM')]
                // const ano = [moment(f.inicio).format('YYYY'), moment(f.fim).format('YYYY')]
                const periodo = moment(f.inicio).format('MMMM/YYYY')

                // const periodo = () => {
                //     if (ano[0] === ano[1]) {
                //         if (mes[0] === mes[1]) {
                //             if (dia[0] === dia[1]) {
                //                 return `${dia[0]} de ${mes[0]} de ${ano[0]}`
                //             } else return `De ${dia[0]} à ${dia[1]} de ${mes[0]} de ${ano[0]}`
                //         } else return `Entre ${dia[0]} de ${mes[0]} à ${dia[1]} de ${mes[1]} de ${ano[0]}`
                //     } else return `De ${dia[0]} de ${mes[0]} de ${ano[0]} à ${dia[1]} de ${mes[1]} de ${ano[1]}`
                // }

                // doc.setFontSize(12);
                // wrapLine(`${f.ch}hrs - ${f.nome}`, 240, yPos + 8);
                // doc.setFontSize(10);
                // wrapLine(`Em ${f.instituicao} - ${periodo()}`, 240, yPos + 2);
                wrapLine(`${f.nome} - ${f.instituicao} - ${f.ch} horas - ${periodo}`, 240, yPos);
            });
        }

        if (profissional?.length > 0) {
            const EXPERIENCIA = new Image();
            EXPERIENCIA.src = '/img/currículo/28.png'
            rightSessionHeader('EXPERIÊNCIA', EXPERIENCIA, yPos);
            let newPos = yPos;
            let endPos = yPos;
            profissional.forEach((f, i) => {
                if (i !== 0) yPos += 10;
                if (i % 2 === 0) {
                    newPos = yPos;
                    doc.setFontSize(12);
                    wrapLine(`${f?.empresa}`, 240, yPos, 180);
                    doc.setFontSize(8);
                    wrapLine(`${f?.entrou} até ${f?.saiu.replace('até ','')}`, 240, yPos, 180);
                    doc.setFontSize(10);
                    wrapLine(f?.desc, 240, yPos + 2, 180);
                    endPos = yPos;
                } else {
                    doc.setFontSize(12);
                    wrapLine(`${f?.empresa}`, 400, newPos);
                    doc.setFontSize(8);
                    wrapLine(`${f?.entrou} até ${f?.saiu.replace('até ','')}`, 400, yPos);
                    doc.setFontSize(10);
                    wrapLine(f?.desc, 400, yPos + 2);
                    yPos = Math.max(yPos, endPos);
                }
            });
        }

        if (voluntario?.length > 0) {
            const VOLUNTARIO = new Image();
            VOLUNTARIO.src = '/img/currículo/29.png'
            rightSessionHeader('TRABALHO VOLUNTÁRIO', VOLUNTARIO, yPos);
            doc.setFontSize(12);
            let newPos = yPos;
            let endPos = yPos;
            voluntario.forEach((f, i) => {
                if (i !== 0) yPos += 10;
                if (i % 2 === 0) {
                    newPos = yPos;
                    doc.setFontSize(12);
                    wrapLine(`${f?.empresa}`, 240, yPos, 180);
                    doc.setFontSize(8);
                    wrapLine(`${f?.entrou} até ${f?.saiu.replace('até ','')}`, 240, yPos, 180);
                    doc.setFontSize(10);
                    wrapLine(f?.desc, 240, yPos + 2, 180);
                    endPos = yPos;
                } else {
                    doc.setFontSize(12);
                    wrapLine(`${f?.empresa}`, 400, newPos);
                    doc.setFontSize(8);
                    wrapLine(`${f?.entrou} até ${f?.saiu.replace('até ','')}`, 400, yPos);
                    doc.setFontSize(10);
                    wrapLine(f?.desc, 400, yPos + 2);
                    yPos = Math.max(yPos, endPos);
                }
            });
        }

        await doc.save(`Curriculo.pdf`);
        setLoading(false);
    }

    const gerarRelatorioAulas = (modulos, formData, alunos) => async _ => {
        setLoading(true);

        const doc = new jsPDF('p', 'px', [595, 842]);
        const tibrado = new Image();
        tibrado.src = '/img/Timbrado Vertical.png'

        const pdfInPx = 595;
        let yPos = 0;

        const header = (nome) => {
            yPos = 0;
            doc.addImage(tibrado, 'PNG', 0, 0, 595, 842);
            doc.setFont("helvetica", "normal", 400);
            doc.setFontSize(24);
            doc.text(`${alunos.length} alunos`, 560, 90, 'right');
            wrapLine(`Acelerando Talentos - ${nome}`, 24, 90, 160, nome);
            yPos += 10
        }

        const wrapLine = (paragraph, x, y, marginL = 50, nome = 'AJUSTE O NOME') => {
            const lines = doc.splitTextToSize(paragraph, pdfInPx - marginL);
            const dim = doc.getTextDimensions('Text');
            const lineHeight = dim.h;
            for (let j = 0; j < lines.length; j++) {
                let lineTop = (lineHeight) * j;
                doc.text(lines[j], x, y + lineTop);
                yPos = y + lineTop + lineHeight;
            }
            if (yPos > 700) {
                doc.addPage([595, 842], 'p');
                header(nome);
            }
        }

        modulos.forEach((modulo, k) => {
            if (k !== 0) doc.addPage([595, 842], 'p');
            header(modulo.nome);
            modulo?.aulas?.forEach((aula, i) => {
                doc.setFont("helvetica", "normal", 400);
                doc.setFontSize(18);
                wrapLine(`Atividades da aula - ${aula.nome}`, 24, yPos + 20 * i, 50, modulo.nome);
                doc.setFontSize(12);
                wrapLine(`${moment(aula.dia).format('DD/MM/YYYY')} - ${moment(aula.hora_inicial).format('HH:mm')} às ${moment(aula.hora_final).format('HH:mm')}`, 24, yPos, 50, modulo.nome);
                Array.apply(null, Array(2)).forEach((_, j) => {
                    doc.setFontSize(14);
                    wrapLine(`Tema: ${formData[k].partes[i * 2 + j]?.tema || ''}`, 24, yPos + 20, 50, modulo.nome);
                    wrapLine(`Tempo: ${formData[k].partes[i * 2 + j]?.tempo || ''}`, 24, yPos + 5, 50, modulo.nome);
                    wrapLine(`Atividades: ${formData[k].partes[i * 2 + j]?.atividades || ''}`, 24, yPos + 5, 50, modulo.nome);
                });
            })
            doc.line(24, yPos + 5, 560, yPos + 5);
            doc.setFontSize(18);
            wrapLine('OBSERVAÇÕES:', 24, yPos + 30, 50, modulo.nome);
            doc.setFontSize(14);
            wrapLine(`${formData[k].observacao_geral || ''}`, 24, yPos + 5, 50, modulo.nome);
            doc.line(24, yPos + 5, 560, yPos + 5);

            doc.setFontSize(18);
            wrapLine(`Alunos Destaques:`, 24, yPos + 30, 50, modulo.nome);
            formData[k].destaques.forEach((d, i) => {
                doc.setFontSize(14);
                wrapLine(`${alunos.find(a => a._id === d.id)?.name || ''} - ${d.hab_per?.toString().replace(',', ', ') || ''}`, 24, yPos + 5, 50, modulo.nome);
                doc.setFontSize(14);
                wrapLine(`Obs.: ${d.observacao || ''}`, 24, yPos + 5, 50, modulo.nome);
            })
            doc.line(24, yPos + 5, 560, yPos + 5);

            doc.setFontSize(18);
            wrapLine(`Alunos que requerem atenção especial:`, 24, yPos + 30, 50, modulo.nome);
            formData[k].atencao_especial.forEach(d => {
                doc.setFontSize(14);
                wrapLine(`${alunos.find(a => a._id === d.id)?.name || ''}`, 24, yPos + 5, 50, modulo.nome);
                doc.setFontSize(14);
                wrapLine(`Obs.: ${d.observacao || ''}`, 24, yPos + 5, 50, modulo.nome);
            })
        })

        await doc.save(`Relatório de aula.pdf`);

        setLoading(false);
    }

    const gerarCertificado = (curso) => {
        setLoading(true)
        const doc = new jsPDF('l', 'px', [595, 842]);
        let firstY = 0;
        let lastYPos = 0;
        const wrapLine = (paragraph, x, y, marginL = 50) => {
            const lines = doc.splitTextToSize(paragraph, pdfInPx - marginL - x);
            const dim = doc.getTextDimensions('Text');
            const lineHeight = dim.h;
            for (let j = 0; j < lines.length; j++) {
                let lineTop = (lineHeight) * j;
                doc.text(lines[j], x, y + lineTop, curso.align || 'left');
                lastYPos = y + lineTop + lineHeight;
            }
        }
        const background = new Image();
        switch (curso.tipo) {
            case 'treinamento':
                background.src = '/img/CERTIFICADO-t.png'
                firstY = 230;
                break;
            default:
                background.src = '/img/CERTIFICADO.png'
                firstY = 160;
                break;
        }
        doc.addImage(background, 'PNG', 0, 0, 842, 595)

        doc.setFont("helvetica", "normal");
        doc.setFontSize(24);
        doc.text("Certificamos que", curso.align === 'center' ? 421 : 110, firstY, curso.align || 'left');

        doc.setFontSize(64);
        doc.text(curso.user, curso.align === 'center' ? 421 : 110, firstY + 50, curso.align || 'left');

        doc.setFontSize(24);
        const pdfInPx = 842;  // width of A4 in px

        const periodo = () => {
            if (curso.periodo.ano[0] === curso.periodo.ano[1]) {
                if (curso.periodo.mes[0] === curso.periodo.mes[1]) {
                    if (curso.periodo.dia[0] === curso.periodo.dia[1]) {
                        return `dia ${curso.periodo.dia[0]} de ${curso.periodo.mes[0]} de ${curso.periodo.ano[0]}`
                    } else return `período de ${curso.periodo.dia[0]} à ${curso.periodo.dia[1]} de ${curso.periodo.mes[0]} de ${curso.periodo.ano[0]}`
                } else return `período de ${curso.periodo.dia[0]} de ${curso.periodo.mes[0]} à ${curso.periodo.dia[1]} de ${curso.periodo.mes[1]} de ${curso.periodo.ano[0]}`
            } else return `período de ${curso.periodo.dia[0]} de ${curso.periodo.mes[0]} de ${curso.periodo.ano[0]} à ${curso.periodo.dia[1]} de ${curso.periodo.mes[1]} de ${curso.periodo.ano[1]}`
        }

        wrapLine(`Participou do ${curso.tipo} ${curso.name} realizado no ${periodo()} com a carga horária de ${curso.ch} horas.`, curso.align === 'center' ? 421 : 110, firstY + 80, 0);

        if (curso.conteudo) {
            doc.text(`Contemplando em seu conteúdo programático os temas abaixo:`, 110, lastYPos + 20);
            lastYPos += 45
            curso.conteudo.forEach(n => {
                doc.setFillColor('#000');
                doc.circle(115, lastYPos - 5, 2, 'F');
                wrapLine(n, 120, lastYPos);
            });
        }

        const string = doc.output('datauristring', { filename: 'Certificado Faz Carreira.pdf' });
        // window.open(doc.output('bloburl'), '_blank');
        setLoading(false);
        return ({
            download: async () => await doc.save('Certificado Faz Carreira.pdf'),
            uri: string
        });
        // await doc.save('Certificado Faz Carreira.pdf');
    }

    return (
        <PdfContext.Provider
            value={{
                gerarCertificado,
                gerarRelatorioAulas,
                gerarCurriculo
            }}
        >
            {children}
        </PdfContext.Provider>
    );
};

