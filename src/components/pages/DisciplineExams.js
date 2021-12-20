import { CentralizeContainer, ListContainer, ListTitle, SectionTitle } from '../shared/styled.js';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ExamsContext from '../../contexts/ExamsContext.js';
import styled from 'styled-components';

export default function DisciplineExams() {
    const [disciplineExams, setDisciplineExams] = useState([]);
    const [selected, setSelected] = useState("");
    const { exams, formData } = useContext(ExamsContext);
    const { categories, disciplines } = formData;
    const params = useParams();
    const disciplineId = Number(params.id);
    const navigate = useNavigate();

    useEffect(() => {
        if (!exams || !categories || !disciplines) navigate('/');
        setSelected(disciplines?.find(d => (d.id === disciplineId)));
        const filteredExams = exams.filter(e => (e.disciplineId === disciplineId));
        setDisciplineExams(filteredExams);
    }, []);    // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <CentralizeContainer>
            <IoArrowBackCircleOutline className="icon" onClick={() => navigate('/search/disciplines')}/>
            <Selected>{selected.name}</Selected>
            <ListContainer>
            <ListTitle><p>Provas</p><p>Professor(a)</p></ListTitle>
                {categories?.map((c, i) => 
                <>
                    <SectionTitle key={i}>{c.name}</SectionTitle>

                    {disciplineExams.filter(de => (de.category.id === c.id)).map((fde, j) => (
                        <a href={fde.url} target="_blank" rel="noreferrer">
                            <ListOpt key={j}>
                                <span>{fde.name}</span>
                                <span>{fde.professor.name}</span>
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