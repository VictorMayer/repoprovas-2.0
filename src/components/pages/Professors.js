import { CentralizeContainer, ListContainer, ListTitle } from '../shared/styled.js';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import ExamsContext from '../../contexts/ExamsContext.js';
import { sendAlert } from '../shared/alerts.js';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';


export default function Professor() {
    const { exams, formData } = useContext(ExamsContext); 
    const { professors } = formData;
    const navigate = useNavigate();

    useEffect(() => {
        if (!exams || !professors) navigate('/');
    })

    function goToProfessorExams(professorId) {
        const thereIsExams = exams.find(e => (e.professorId === professorId));
        if (thereIsExams) return navigate(`/search/professors/${professorId}/exams`);

        return sendAlert('warning', 'Opa...', 'Parece que este professor ainda não tem nenhuma prova!');
    }

    return(
        <CentralizeContainer>
            <IoArrowBackCircleOutline className="icon" onClick={() => navigate('/search')}/>
            <ListContainer>
            <ListTitle><p>Professores</p><p>Quantidade de Provas</p></ListTitle>
                {professors?.map((p, i) => (
                    <ListOpt key={i} onClick={() => goToProfessorExams(p.id)}>
                        <span>{p.name}</span>
                        <span>{exams.filter(e => (e.professorId === p.id)).length}</span>
                    </ListOpt>
                ))}
            </ListContainer>
        </CentralizeContainer>
    )
}

const ListOpt = styled.div`
    width: calc(100% - 10px);
    display: flex;
    justify-content: space-between;
    border-radius: 4px;
    padding: 2px;
    cursor: pointer;
    &:hover {
        background: #bbb;
    }
    span {
        width:95%;
        &:nth-child(2) {
            text-align: end;
            /* margin-right: -2px; */
            width: 60%;
        }
    }
`;