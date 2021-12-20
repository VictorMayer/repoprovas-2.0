import { CentralizeContainer, OptionsContainer, Option } from '../shared/styled.js';
import { useNavigate } from "react-router";

export default function Home() {
    const navigate = useNavigate();
    
    return (
        <CentralizeContainer>
            <OptionsContainer>
                <Option onClick={() => navigate('/upload')}><p>Enviar Prova</p></Option>
                <Option onClick={() => navigate('/search')}><p>Procurar Prova</p></Option>
            </OptionsContainer>
        </CentralizeContainer>
    )
}


