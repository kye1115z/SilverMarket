import React, { useEffect, useState } from "react";
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import GlobalStyle from "../GlobalStyle";
import { Container, Text, Input } from "../styles/basicStyles.js";
import axios from "axios";



export default function Login() {
  const [ID, setID] = useState("");
  const [pw, setPw] = useState("");

  const [IDValid, setIDValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [Allow, setAllow] = useState(false);
  
  const [color, setColor] = useState("#BCC6BF");

  const navigate = useNavigate();

  const Btn = styled.button`
    width: 30%;
    height: 48px;
    border: none;
    background: ${color};
    border-radius: 8px;
    color: white;
    font-size: 18px;
`;

// 로그인 가능/불가능 판단
  useEffect(() => {
    if (IDValid && pwValid) {
      setAllow(false);
      setColor("linear-gradient(329.82deg, #23AA49 18.21%, #4BC06C 109.1%)")
      return;
    }
    setAllow(true);
    setColor("#BCC6BF")
  }, [IDValid, pwValid]);

  // 아이디 유효성 검사
  const handleID = (e) => {
    setID(e.target.value);

    const regex = /^(?=.*[a-zA-Z0-9\W_]).{8,}$/;
    //   /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (regex.test(e.target.value)) {
      setIDValid(true);
    } else {
      setIDValid(false);
    }
  };

  // 비밀번호 유효성 검사
  const handlePw = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  // 로그인 버튼 클릭 시
  const onClickConfirmButton = async() => {
      try {   
        const csrfToken = window.csrfToken;
        console.log("try!")
        const res = await axios.post(
            'http://127.0.0.1:8000/api/accounts/login/', 
            {
                username: ID,
                password: pw,
                'X-CSRFToken': csrfToken
            },
            // {
            //   headers: {
            //       'X-CSRFToken': csrfToken
            //   },
            // }
        );
        console.log(res.data.detail);
        // navigate("/");
    }
    catch (e) {
        console.error(e);
    }
    
  };

  return (
    <>
    <GlobalStyle />
    <Container>
      <LogoBox>
        <Logo src="https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg" />
      </LogoBox>
        <div 
          className="contentWrap" 
          style={{width: "85%", marginBottom: "22px"}}>
          <Text style={{color: "#23AA49"}}>아이디</Text>
          <div className="inputWrap">
            <Input
              type="text"
              value={ID}
              onChange={handleID}
            />
          </div>
          {/* <div className="errorMessageWrap">
            {!IDValid && ID.length > -1 && (
              <Text>8자 이상 입력해주세요.</Text>
            )}
          </div> */}

          <Text style={{ marginTop: "13px", color: "#23AA49" }}>
            비밀번호
          </Text>
          <div className="inputWrap">
            <Input
              type="password"
              value={pw}
              onChange={handlePw}
            />
          </div>
          {/* <div className="errorMessageWrap">
            {!pwValid && pw.length > -1 && (
              <Text>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</Text>
            )}
          </div> */}
        </div>
        
        <Foot>
            <Find
              href="/">
                아이디 찾기
            </Find>
            <Find
              href="/"
              style={{textDecoration: "none", color: "#23AA49", marginBottom: "22px"}}>
                비밀번호 찾기
            </Find>
          </Foot>

          <Btn
            onClick={onClickConfirmButton}
            disabled={Allow}
            className="bottomButton"
          >
            로그인
          </Btn>
          <Foot
            style={{position: "absolute", bottom: "30px"}}>
            <p
              style={{color: "#BCC6BF", marginRight: "7px"}}>
                계정이 없으신가요?
            </p>
            <a 
              href="/signup"
              style={{textDecoration: "none", color: "#23AA49"}}>
                회원가입
            </a>
          </Foot>
    </Container>
    </>
  );
}

const LogoBox = styled.div`
  width: 100%;
  height: 30vh;
  display: flex; 
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 70%;
  height: 52px;
  overflow: hidden;
`;

const Foot = styled.div`
  display: flex;

`;

const Find = styled.a`
  text-decoration: none;
  color: #1DAB45;
  margin-right: 7px;
  font-size: 14px;
`;