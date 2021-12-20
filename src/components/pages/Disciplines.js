import { CentralizeContainer, ListContainer, ListTitle, SectionTitle } from '../shared/styled.js';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import ExamsContext from '../../contexts/ExamsContext.js';
import { sendAlert } from '../shared/alerts.js';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';


export default function Disciplines() {
    const { exams, formData } = useContext(ExamsContext); 
    const { disciplines, periods } = formData;
    const navigate = useNavigate();

    useEffect(() => {
        if (!exams || !disciplines || !periods) navigate('/');
    });

    function goToDisciplineExams(disciplineId) {
        const thereIsExams = exams.find(e => (e.disciplineId === disciplineId));
        if (thereIsExams) return navigate(`/search/disciplines/${disciplineId}/exams`);

        return sendAlert('warning', 'Opa...', 'Parece que esta disciplina ainda não tem nenhuma prova!');
    }

    return(
        <CentralizeContainer>
            <IoArrowBackCircleOutline className="icon" onClick={() => navigate('/search')}/>
            <ListContainer>
                <ListTitle><p>Disciplinas</p><p>Quantidade de Provas</p></ListTitle>
                {periods.map((p, i) => 
                <>
                    <SectionTitle key={i}>{p.name}</SectionTitle>
                    {exams.filter(e => (e.discipline.periodId === p.id)).map((fe, j) =>
                    <>
                        <ListOpt key={j} onClick={() => goToDisciplineExams(fe.disciplineId)}>
                            <span>{fe.discipline.name}</span>
                            <span>{exams.filter(e => (e.disciplineId === fe.disciplineId)).length}</span>
                        </ListOpt>
                    </>)}
                </> )}
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