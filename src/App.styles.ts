import styled, { createGlobalStyle } from 'styled-components';
import BackgroundImage from './images/greenFields.jpg'

export const GlobalStyle = createGlobalStyle`
*{
    box-sizing: border-box;
    font-family: 'Catamaran', sans-serif;
}

html{
    height: 100%;
}
:root{
    width:100%;
}
body{
    width:100%;
    color:white;
    background: url(${BackgroundImage});
    background-size:cover;
    margin:0;
    padding:0 20px;
    display:flex;
    justify-content:center;
}
`

export const Wrapper = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;

    > p{
        color: rgb(255, 255, 255)
    }

    .score{
        color: white;
        font-size:2rem;
    }

    h1{
    font-size:5rem;
    background-color:white;
    background-size:100%;
    background-clip:text;
    -webkit-background-clip:text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(2px, 2px, #0085a3);
    text-align:center; 
    }   
    .next, .start{
    cursor:pointer;
    background: #c2e59c;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #64b3f4, #c2e59c);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #64b3f4, #c2e59c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border:none;
    box-shadow: 0px 5px 10px rgba(0,0,0, 0.25);
    border-radius: 10px;
    height:40px;
    margin:20px 0;
    padding:0 40px;
    color:white;
    font-size:1.3rem;
    }

    .start{
        max-width:200px;
    }
    
`