import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import ExamsContext from "../../contexts/ExamsContext";
import { CentralizeContainer } from "../shared/styled";
import { sendExam } from "../../services/Repoprovas";
import { useNavigate } from "react-router-dom";
import { sendAlert } from "../shared/alerts";
import styled from "styled-components";

export default function Upload() {
    const [examData, setExamData] = useState({ name: "", url: "", category: "", discipline: "", professor: "", });
    const [requesting, setRequesting] = useState(false);
    const { formData } = useContext(ExamsContext);
    const navigate = useNavigate();

    useEffect(() => {
        // if (!formData.categories || !formData.disciplines || !formData.periods) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function submit(e) {
        e.preventDefault();
        setRequesting(true);
        sendExam(examData)
            .then(answer => {
                console.log(answer.data);
                setRequesting(false);
                sendAlert('success', ':)', 'Prova enviada com sucesso!');
                navigate('/');
            }).catch(answer => {
                setRequesting(false);
                console.log(answer.response);
                sendAlert('warning', ':(', answer.response.data ? answer.response.data : 'Ocorreu um erro inesperado!');
            });
    }

    return (
        <CentralizeContainer>
            <IoArrowBackCircleOutline className="icon" onClick={() => navigate('/')}/>
            <FormContainer>
                <MyForm onSubmit={submit}>
                    <p>Nome da Prova</p>
                    <input disabled={requesting} onChange={(e)=> setExamData({ ...examData, name: e.target.value })} value={examData.name} required placeholder="Ex: Cálculo de Integrais e Derivadas" type="text"></input>
                    <span>Link da Prova</span>
                    <input disabled={requesting} onChange={(e)=> setExamData({ ...examData, url: e.target.value })} value={examData.url} required placeholder="URL com Link para a Prova" type="url"></input>
                    
                    <label htmlFor={examData.category}>Escolha uma categoria </label>
                    <select disabled={requesting} value={examData.category} onChange={(e)=>setExamData({ ...examData, category: e.target.value })} required className="selection">
                        <option value="">Escolha</option>
                        {formData.categories 
                        ?
                            formData.categories?.map((c, i) => (
                                <option key={i} value={c.id}>{c.name}</option>
                            ))
                        :
                        <></>
                        }
                                                
                    </select>

                    <label htmlFor={examData.professor}>Escolha um professor </label>
                    <select disabled={requesting} value={examData.professor} onChange={(e)=>setExamData({ ...examData, professor: e.target.value })} required className="selection">
                        <option value="">Escolha</option>
                        {formData.professors?.map((p, i) => (
                            <option key={i} value={p.id}>{p.name}</option>
                        ))}
                    </select>

                    <label htmlFor={examData.category}>Escolha uma disciplina </label>
                    <select disabled={requesting} value={examData.discipline} onChange={(e)=>setExamData({ ...examData, discipline: e.target.value })} required className="selection">
                        <option value="">Escolha</option>
                        {formData.periods?.map((p, i) => (
                        <optgroup key={i} label={p.name}>
                            {formData.disciplines
                                .filter(d => d.periodId === p.id)
                                .map((d, i) => (
                                <option key={i} value={d.id}>{d.name}</option>
                            ))}
                        </optgroup>    
                    ))}
                    </select>

                    <button disabled={requesting} type="submit">{requesting ? 'Enviando...' : 'Enviar Prova' }</button>
                </MyForm>
            </FormContainer>
        </CentralizeContainer>
    )
}

const MyForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 90%;
    row-gap: 12px;
    margin-top: 20px;
    
    input {
        height: 30px;
        border-radius: 5px;
        padding: 0px 8px;
        outline: none;
        border: none;
        background: #fff;
        color: #000;
        &:hover, :focus {
            &::placeholder{
                color:#eee;
            }
            color:#fff;
            background:#444;
            transition: 1000ms;
        }
    }

    button {
        cursor: pointer;
        align-self: center;
        border:none;
        border-radius: 8px;
        margin-top: 70px;
        width: 200px;
        height: 50px;
        font-size: 16px;
        &:hover {
            font-size: 24px;
            color: #efefef;
            background:#444;
            transition: 1000ms;
        }
    }


`

const FormContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: lightgrey;
    min-width: 250px;
    width: 75%;
    max-width: 500px;
    min-height: 250px;
    height: 75%;
    max-height: 600px;
    border-radius: 12px;
`