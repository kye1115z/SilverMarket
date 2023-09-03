import GlobalStyle from "../GlobalStyle";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function BestProduct(lists) {
    const navigate = useNavigate();
    const [id, setId] = useState("")
    useEffect(()=>{
        setId(lists.id)
    }, [])


    const onClick = () => {
        setId(lists.id)
        navigate('detail', {
            state: { id }
        })
    }

    return (
        <>
        <GlobalStyle />
        <Box>
            <ImgButton onClick={onClick}> 
                <img src={lists.icon} width="100%" height="80%" alt="best"/>
            </ImgButton>
            <InfoButton onClick={onClick}>
                <Info>{lists.name}</Info>
                <Price>5,000₩</Price>
            </InfoButton>
        </Box>
        </>
    );
}
export default BestProduct

const Box = styled.div`
    width: 43.5vw;
    height: 55vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    float: left;
    margin-left: 16px;
    margin-bottom: 16px;
    background-color: #F3F5F7;
    border-radius: 16px;


    @media (min-width: 768px) {
        margin-left: 2em;
    }
`;

const ImgButton = styled.div`
    width: 100%;
    height: 65%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
`;

const InfoButton = styled.div`
    width: 100%;
    height: 35%;
    display: flex;
    flex-direction: column;
    padding-left: 15px;
`;

const Info = styled.p`
    margin-bottom: 3px;
    font-size: 16px;
    font-weight: bolder;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    word-wrap : break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding: 3px 5px 0 0px;
    word-break:keep-all;
    line-height: 110%;

    @media (min-width: 768px) {
    font-size: 1.7em;
    padding: 15px 5px 0 15px;
  }
`;

const Price = styled.p`
    color: #FF324B;
    font-size: 19px;
    font-weight: bold;
    
    @media (min-width: 768px) {
    font-size: 2em;
    font-weight: bolder;
    padding: 15px 5px 0 15px;
  }
`;
