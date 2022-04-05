import { useContext, useEffect } from "react";

import { SiteContext } from "../../../services/SiteContext";

import { AutoAccordion } from "../../../App/components/ControlledAccordion";

import Contato from "./Contato";
import Video from "./video";
import ParceiroCards from "./ParceiroCards";
import { AdminContext } from "../../../services/AdminContext";
import About from "./about";
import Trilhas from "./trilhas";

const EditarSite = () => {

    const { site, getSite, editSite } = useContext(SiteContext);
    const { getUsers } = useContext(AdminContext);
    const { contato, apoiadores, opinioes, parceiros, video, about, trilhas } = site;

    // eslint-disable-next-line
    useEffect(() => getSite(), []);
    // eslint-disable-next-line
    useEffect(() => { getUsers('aluno'); getUsers('facilitador'); getUsers('empresa'); }, []);

    const arr = [
        {
            name: 'contatos',
            render: <Contato editSite={editSite} contato={contato} />
        }, {
            name: 'video',
            render: <Video editSite={editSite} video={video} />
        }, {
            name: 'parceiros',
            render: <ParceiroCards editSite={editSite} info={parceiros} name='parceiros' type='parceiro' />
        }, {
            name: 'apoiador',
            render: <ParceiroCards editSite={editSite} info={apoiadores} name='apoiadores' type='apoiador' />
        }, {
            name: 'opiniões',
            render: <ParceiroCards editSite={editSite} info={opinioes} name='opinioes' type='opinioes' />
        }, {
            name: 'institucional',
            render: <About editSite={editSite} about={about} />
        }, {
            name: 'trilhas',
            render: <Trilhas editSite={editSite} trilhas={trilhas} />
        }
    ]

    return (<AutoAccordion array={arr} />);
}

export default EditarSite;