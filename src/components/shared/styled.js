import styled from "styled-components";

const CentralizeContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;  
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .icon{
        position: absolute;
        top:5px;
        left:5px;
        font-size: 22px;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        &:hover{
            font-size: 32px; 
            color: #eee;
            background: #333;
            transition: 500ms;
        }
    }
`;
const OptionsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width:100%;
    height: 100%;
`;
const Option = styled.div`
    height: 94%;
    width: 45%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: lightgrey;
    cursor: pointer;
    &:hover{
        font-size: 30px;
        transition: 1000ms;
        background: #444;
        color: #eee;
    }
`;
const ListContainer = styled.div`
    position: relative;
    min-width: 250px; 
    min-height: 320px;
    width: 60%;
    max-width: 800px;
    max-height: 700px;
    border-radius: 8px;
    padding: 50px 10px 10px 10px;
    row-gap: 6px;
    overflow: scroll;
    background: lightgrey;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    -ms-overflow-style: none;
    &::-webkit-scrollbar{
        display: none;
    }

    a{
        width: 100%;
    }
`;
const ListTitle = styled.div`
    display: flex;
    justify-content: space-between;
    width: calc(100% - 20px);
    font-size: 20px;
    position: absolute;
    top:10px;
    z-index: 11; 
`;
const SectionTitle = styled.p`
    font-weight: 700;
`;

export { 
    CentralizeContainer,
    OptionsContainer,
    ListContainer,
    SectionTitle,
    ListTitle,
    Option,
};
