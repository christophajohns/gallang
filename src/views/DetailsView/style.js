import { Button } from "react-bootstrap";
import styled from "styled-components";

export const StyledDetailsView = styled.div`
    padding:0;
    margin:0;
    box-sizing:border-box;
    overflow-y: scroll;
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
`;

export const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: 100vh;
    scroll-snap-align: center;
    background: #eee;
`;

export const StyledImageWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background: url(${props=>props.img});
    background-size:contain;
    background-repeat: no-repeat;
    background-position: center center;
`;

export const StyledInfoWrappper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eee;
`;

export const InfoContainer = styled.div`
    width: 50%;
    margin: 50px auto;
    padding: 50px;
    background-color: #d5d9e0;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
    :hover {
        box-shadow: 10px 10px 30px rgba(0, 0, 0, .3);
    }
`;

export const StyledOptionContainer = styled.div`
    position: fixed;
    top: 100px;
    right: 150px;
    width: 40px;
    padding-top: 5px;
    padding-bottom: 10px;
    background-color: rgba(204,204,204,0.4);
    box-sizing: border-box;
    border-radius: 10px;
    :hover {
        box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
    }
`;

export const StyledIconButton = styled(Button)`
    color: grey;
    &:hover {
        color: black;
    }
`;

export const BackIconWrapper = styled.div`
    position: fixed;
    top: 30px;
    left: 100px;
    background-color: rgba(204,204,204,0.4);
    box-sizing: border-box;
    border-radius: 50%;
    padding-bottom:3px;
    :hover {
        box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
    }
`;

export const ScrollUpWrapper = styled.div`
    position: fixed;
    bottom: 50px;
    right: 150px;
    background-color: rgba(204,204,204,0.4);
    box-sizing: border-box;
    border-radius: 50%;
    padding-bottom:3px;
    :hover {
        box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
    }
`;

export const StyledTitle = styled.div`
    font-family: 'Playfair Display SC', serif;
    font-weight: bold;
    font-size: 35px;
    padding-bottom: 15px;
    padding-top: 20px;
    a{
        color: #666666;
        text-decoration: none;
        :hover{
            text-shadow: 0px 4px 4px rgba(0,0,0,0.25);
        }
    }
`;

export const StyledDescription = styled.div`
    font-family: 'Martel', serif;
    font-size: 20px;
    padding: 10px 100px 20px 100px;
    color: #7f7f7f;
`;