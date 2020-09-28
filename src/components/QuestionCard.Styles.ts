import styled from 'styled-components';

export const Wrapper = styled.div`
    max-width: 1000%;
    background-color: rgba(255,255,255, 0.25);
    border-radius: 10px;
    padding: 20px;
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    align-items:center;

    p{
        font-size:1.2rem;
        max-width:80%;
        text-align:center;
    }

    .answerButton{
        width:100%;
        min-width:200px;
        margin-top:5px;
        border:none;
        background-color: rgba(107, 219, 121, 0.75);
        color:white;
        font-size:16px;
        border-radius:5px;
        cursor:pointer;
    }

`