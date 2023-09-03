import { styled } from "styled-components";
import GlobalStyle from "../GlobalStyle";
import { GoHomeFill, GoHeartFill, GoPersonFill } from "react-icons/go";
import { FaBox } from "react-icons/fa";
import { useState } from "react";

function Footer() {
    const [select, setSelect] = useState("home");

    // onpopstate
    window.onpopstate = function(event) {
        alert("location: " + document.location + ", state : " + JSON.stringify(event.state));
    }

    return (
        <>
        <GlobalStyle />
        <Box>
            <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                width: "85%", height: "100%", 
            }}>
                <Btn onClick={() => {
                    setSelect('home')
                    alert(select)
                }}>
                    <GoHomeFill style={{
                        width: "45px", height: "45px",
                        color: select === 'home' ? "#23AA49" : "#F3F5F7"
                    }}/>
                </Btn>

                <Btn onClick={() => {
                    setSelect('favo')
                    window.location.href="/favo"
                }}>
                    <GoHeartFill  style={{
                        width: "45px", height: "45px",
                        color: select === 'favo' ? "#23AA49" : "#F3F5F7"
                    }}/>
                </Btn>

                <Btn onClick={() => {
                    setSelect('deliver')
                    window.location.href="/deliver"
                }}>
                    <FaBox  style={{
                        width: "45px", height: "45px",
                        color: select === 'deliver' ? "#23AA49" : "#F3F5F7"
                    }}/>
                </Btn>
                
                <Btn onClick={() => {
                    setSelect('mypage')
                    window.location.href="/mypage"
                }}>
                    <GoPersonFill  style={{
                        width: "45px", height: "45px",
                        color: select === 'mypage' ? "#23AA49" : "#F3F5F7"
                    }}/>
                </Btn>
            </div>
        </Box>
        </>
    );
}

export default Footer;

const Box = styled.div`
    width: 100%;
    height: 64px;
    background-color: white;
    position: fixed;
    bottom: 0px;
    box-shadow: 0px -5px 37px rgba(0, 0, 0, 0.09);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Btn = styled.button`
    background-color: transparent;
    border: none;
    width: 45px;
    height: 45px;
    display: flex;
`;