import { CentralizeContainer, ListContainer, ListTitle, SectionTitle } from '../shared/styled.js';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ExamsContext from '../../contexts/ExamsContext.js';
import styled from 'styled-components';

export default function ProfessorExams() {
    const [professorExams, setProfessorExams] = useState([]);
    const { exams, formData } = useContext(ExamsContext);
    const { categories } = formData;
    const params = useParams();
    const professorId = Number(params.id);
    const navigate = useNavigate();

    useEffect(() => {
        if (!exams || !categories) navigate('/');
        const filteredExams = exams.filter(e => (e.professorId === professorId));
        setProfessorExams(filteredExams);
    }, []);    // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <CentralizeContainer>
            <IoArrowBackCircleOutline className="icon" onClick={() => navigate('/search/professors')}/>
            <Selected>{professorExams[0]?.professor?.name}</Selected>
            <ListContainer>
            <ListTitle><p>Provas</p><p>Disciplina</p></ListTitle>
                {categories?.map((c, i) => 
                <>
                    <SectionTitle key={i}>{c.name}</SectionTitle>

                    {professorExams.filter(pe => (pe.category.id === c.id)).map((fpe, j) => (
                        <a href={fpe.url} target="_blank" rel="noreferrer">
                            <ListOpt key={j}>
                                <span>{fpe.name}</span>
                                <span>{fpe.discipline.name}</span>
                            </ListOpt>
                        </a>   
                    ))}
                </>
                )}
            </ListContainer>
        </CentralizeContainer>
    )
}

const Selected = styled.p`
    font-size: 20px;
    margin-top:-30px;
    margin-bottom:30px;
    padding: 8px;
    border-radius:10px;
    border: 1px solid #444;
`

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
        width:39%;
        &:nth-child(2) {
            text-align: end;
            /* margin-right: -2px; */
            width: 69%;
        }
    }
`;