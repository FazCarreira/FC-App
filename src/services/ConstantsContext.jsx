import React, { createContext, useContext, useEffect, useState } from 'react';
import { FaBinoculars, FaBlog, FaBook, FaBuilding, FaCertificate, FaCommentDollar, FaFileContract, FaFolderOpen, FaHome, FaIdCard, FaLaptop, FaMoneyBill, FaPencilAlt, FaRoad, FaStar, FaUser } from 'react-icons/fa';

import api from '../utils/api';
import { ToolsContext } from './ToolsContext';
import { AuthenticationContext } from './AuthContext';

import EditarSite from '../pages/admin/EditarSite';
import CadastrosAluno from '../pages/admin/Cadastros/Alunos';
import CadastrosEmpresas from '../pages/admin/Cadastros/Empresas';
import CadastrosFacilitador from '../pages/admin/Cadastros/Facilitadores';
import CadastrosFornecedor from '../pages/admin/Cadastros/Facilitadores/Fornecedor';
import Aluno from '../pages/admin/Cadastros/Alunos/Aluno';
import Facilitador from '../pages/admin/Cadastros/Facilitadores/Facilitador';
import Cursos from '../pages/admin/Cursos';
import Blog from '../pages/admin/Blog';
import Post from '../pages/admin/Blog/Post';
import Curso from '../pages/admin/Cursos/Curso';
import Treinamentos from '../pages/admin/Treinamentos';

import AlunoProfile from '../pages/aluno';
import AlunoHome from '../pages/aluno/Homepage';
import PerfilAluno from '../pages/aluno/AlunoPerfil';
import Trilha from '../pages/aluno/Trilha';
import Avisos from '../pages/aluno/Avisos';
import Aula from '../pages/aluno/Aula';

import FacilitadorProfile from '../pages/facilitador';
import PerfilFacilitador from '../pages/facilitador/FacilitadorPerfil';
import FacilitadorCursos from '../pages/facilitador/Cursos';
import TreinamentosFacilitador from '../pages/facilitador/Treinamentos';

import CurriculoAluno from '../pages/aluno/Currículo';
import CertificadoAluno from '../pages/aluno/Certificado';

import EmpresaProfile from '../pages/empresa';
import InProgress from '../pages/empresa/Doing';
import EmpresaInicio from '../pages/empresa/Home';
import PerfilEmpresa from '../pages/empresa/Profile';
import PatrocinioEmpresa from '../pages/empresa/Patrocinio';
import BancoDeTalentos from '../pages/empresa/Banco';
import VagasEmpresa from '../pages/empresa/Vagas';
import DivulgacaoEmpresa from '../pages/empresa/Divulgue';


export const ConstantsContext = createContext();

export const ConstantsContextProvider = ({ children }) => {

    const { loadUser } = useContext(AuthenticationContext)
    const { addAlert } = useContext(ToolsContext)

    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [mobileTitle, setMobileTitle] = useState("");

    const [customTitle, setCustomTitle] = useState("");

    const [headerRight, setHeaderRight] = useState();

    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
        if (window.innerWidth <= 768) setOpen(false);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    let isMobile = (width <= 768);

    const testConection = async () => {
        try {
            await api.get('/');
            loadUser();
        } catch (err) {
            if (err) addAlert('BANCO FORA DO AR', 'error');
        }
    }

    const openLink = (link) => () => {
        window.open(link);
    };

    const NavItems = {
        admin: [
            {
                title: "Editar Site",
                path: "/admin/editar_site",
                icon: <FaFolderOpen color="white" size={24} />,
                component: EditarSite
            },
            {
                title: "Alunos",
                path: "/admin/cadastros/alunos",
                icon: <FaPencilAlt color="white" size={24} />,
                component: CadastrosAluno
            },
            {
                title: "Facilitadores",
                path: "/admin/cadastros/facilitadores",
                icon: <FaLaptop color="white" size={24} />,
                disabled: true,
                component: CadastrosFacilitador
            },
            {
                title: "Fornecedores",
                path: "/admin/cadastros/fornecedores",
                icon: <FaLaptop color="white" size={24} />,
                disabled: true,
                component: CadastrosFornecedor
            },
            {
                title: "Empresas",
                path: "/admin/cadastros/empresas",
                icon: <FaMoneyBill color="white" size={24} />,
                disabled: true,
                component: CadastrosEmpresas
            },
            {
                path: "/admin/alunos/:id",
                component: Aluno
            },
            {
                path: "/admin/facilitador/:id",
                component: Facilitador
            },
            {
                title: "Cursos",
                path: "/admin/cursos",
                icon: <FaBook color="white" size={24} />,
                component: Cursos
            },
            {
                title: "Treinamentos",
                path: "/admin/Treinamentos",
                icon: <FaCertificate color="white" size={24} />,
                component: Treinamentos
            },
            {
                disableHeader: true,
                path: "/admin/cursos/:nome&:id",
                component: Curso
            },
            {
                title: "Blog",
                path: "/admin/blog",
                icon: <FaBlog color="white" size={24} />,
                component: Blog
            },
            {
                title: "Postagem",
                path: "/admin/blog/:id",
                component: Post
            },
        ],
        aluno: [
            {
                title: "Complete seu cadastro",
                path: "/aluno/",
                disableNav: true,
                component: AlunoProfile
            },
            {
                title: "Início",
                path: "/aluno/inicio",
                icon: <FaHome color="white" size={24} />,
                component: AlunoHome
            },
            {
                title: "Avisos",
                path: "/aluno/avisos",
                icon: <FaBinoculars color="white" size={24} />,
                component: Avisos
            },
            {
                title: "A Trilha",
                path: "/aluno/trilha",
                icon: <FaRoad color="white" size={24} />,
                component: Trilha
            },
            {
                title: "Currículo",
                path: "/aluno/curriculo",
                icon: <FaFileContract color="white" size={24} />,
                component: CurriculoAluno
            },
            {
                title: "Certificado",
                path: "/aluno/certificado",
                icon: <FaCertificate color="white" size={24} />,
                component: CertificadoAluno
            },
            {
                title: "Perfil",
                path: "/aluno/perfil",
                icon: <FaUser color="white" size={24} />,
                component: PerfilAluno
            },
            {
                path: "/aluno/aulas",
                component: Aula
            },
        ],
        facilitador: [
            {
                title: "Complete seu cadastro",
                path: "/facilitador/",
                disableNav: true,
                component: FacilitadorProfile
            },
            {
                title: "Perfil",
                path: "/facilitador/perfil",
                icon: <FaUser color="white" size={24} />,
                component: PerfilFacilitador
            },
            {
                title: "Cursos",
                path: "/facilitador/cursos",
                icon: <FaBook color="white" size={24} />,
                component: FacilitadorCursos
            },
            {
                title: "Treinamentos",
                path: "/facilitador/Treinamentos",
                icon: <FaCertificate color="white" size={24} />,
                component: TreinamentosFacilitador
            },
        ],
        empresa: [
            {
                title: "Complete seu cadastro",
                path: "/empresa/",
                disableNav: true,
                component: EmpresaProfile
            },
            {
                title: "Inicio",
                path: "/parceiro/inicio",
                icon: <FaHome color="white" size={24} />,
                component: EmpresaInicio
            },
            {
                title: "Perfil",
                path: "/parceiro/perfil",
                icon: <FaUser color="white" size={24} />,
                component: PerfilEmpresa
            },
            {
                title: "Patrocinio",
                path: "/parceiro/patrocinio",
                icon: <FaCommentDollar color="white" size={24} />,
                component: PatrocinioEmpresa
            },
            {
                title: "Banco de Talentos",
                path: "/parceiro/banco-de-talentos",
                icon: <FaStar color="white" size={24} />,
                component: BancoDeTalentos
            },
            {
                title: "Divulgue suas Vagas",
                path: "/parceiro/vagas",
                icon: <FaIdCard color="white" size={24} />,
                component: VagasEmpresa
            },
            {
                title: "Divulgue sua empresa",
                path: "/parceiro/divulgacao",
                icon: <FaBuilding color="white" size={24} />,
                component: DivulgacaoEmpresa
            },
        ]
    }

    return (
        <ConstantsContext.Provider
            value={{
                mobileTitle, setMobileTitle,
                NavItems,
                testConection,
                open, setOpen,
                toggleDrawer,
                isMobile,
                customTitle, setCustomTitle, headerRight, setHeaderRight,
                openLink
            }}
        >
            {children}
        </ConstantsContext.Provider>
    );
};