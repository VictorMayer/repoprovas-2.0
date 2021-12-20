import { CentralizeContainer, OptionsContainer, Option } from "../shared/styled";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import ExamsContext from "../../contexts/ExamsContext";
import { getExams } from '../../services/Repoprovas';
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";

export default function Search() {
    const navigate = useNavigate();
    const { setExams } = useContext(ExamsContext);

    useEffect(() => {
        getExams()
            .then((answer) => setExams(answer.data))
            .catch((answer) => console.log(answer.response.data));
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <CentralizeContainer>
            <IoArrowBackCircleOutline className="icon" onClick={() => navigate('/')}/>
            <OptionsContainer>
                <Option onClick={() => navigate('/search/disciplines')}><p>Disciplinas</p></Option>
                <Option onClick={() => navigate('/search/professors')}><p>Professores</p></Option>
            </OptionsContainer>
        </CentralizeContainer>
    )
}