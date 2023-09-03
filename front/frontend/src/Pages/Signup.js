import { useCallback, useState } from "react"
import GlobalStyle from "../GlobalStyle";
import { Container, Header, HeaderText, Input, InputTitle } from "../styles/basicStyles";
import { GoChevronLeft } from "react-icons/go";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Signup() {
    // 입력값 상태값
    const [id, setID] = useState("");
    const [pw, setPW] = useState("");
    const [confirmPW, setConfirmPW] = useState("");
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [addr, setAdder] = useState("");
    const [gender, setGender] = useState("");

    // 생년월일
    const [birth, setBirth] = useState({
        year: "",
        month: "",
        day: ""
    })

    // 메시지
    const [idMsg, setIdMsg] = useState("");
    const [pwMsg, setPwMsg] = useState("");
    const [pwConfrimMsg, setPwConfirmMsg] = useState("");
    const [nameMsg, setNameMsg] = useState("");
    const [emailMsg, setEmailMsg] = useState("");
    const [phoneMsg, setPhoneMsg] = useState("");
    const [addrMsg, setAddrMsg] = useState("");

    // 유효성 검사 함수로 정리하기
    const [isIdValid, setIsIDValid] = useState(false);
    const [isPwValid, setIsPwValid] = useState(false);
    const [isNameValid, setIsNameValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [isAddrValid, setIsAddrValid] = useState(false);
    const [isGenderValid, setIsGenderValid] = useState(false);

    // 아이디
    const onChangeID = useCallback(async(e) => {
        const currID = e.target.value;
        setID(currID);
        const idRegExp = /^(?=.*[a-zA-Z0-9\W_]).{8,}$/;

        if(!idRegExp.test(currID)) {
            setIdMsg("영문, 숫자의 구성으로 8자 이상 입력해주세요.")
            setIsIDValid(false);
        } else {
            setIdMsg("")
            setIsIDValid(true);
        }
    })

    // 비밀번호
    const onChangePw = useCallback(async(e) => {
        const currPw = e.target.value;
        setPW(currPw);
        const passwordRegExp =
            /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
  
        if(!passwordRegExp.test(currPw)) {
            setPwMsg("영문, 숫자, 특수기호의 조합으로 8자리 이상 입력해주세요.")
            setIsPwValid(false)
        } else {
            setPwMsg("")
            setIsPwValid(true)
        }
    })

    // 비밀번호 확인
    const onChangePwConfirm = (e) => {
        const currPwConfirm = e.target.value;
        setConfirmPW(currPwConfirm);
        
        if(pw != currPwConfirm) {
            setPwConfirmMsg("비밀번호가 일치하지 않습니다.");
            setConfirmPW(false);
        } else {
            setPwConfirmMsg("");
            setConfirmPW(true);
        }
    }

    // 이름
    const onChangeName = useCallback(async(e) => {
        const currName = e.target.value;
        setName(currName);

        if(currName.length < 2 || currName.length > 20) {
            setNameMsg("1글자 이상 9글자 미만으로 입력해주세요.")
            setIsNameValid(false)
        } else {
            setNameMsg("")
            setIsNameValid(true)
        }
    })

    // 이메일
    const onChangeEmail = useCallback(async(e) => {
        const currEmail = e.target.value;
        setEmail(currEmail);
        const emailRegExp =
            /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

        if(!emailRegExp.test(currEmail)) {
            setEmailMsg("이메일 형식이 올바르지 않습니다.")
            setIsEmailValid(false)
        } else {
            setEmailMsg("")
            setIsEmailValid(true)
        }
    })

    // 휴대전화
    const onChangePhone = (getNumber) => {
        const currPhone = getNumber;
        setPhone(currPhone);
            const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;

        if(!phoneRegExp.test(currPhone)) {
            setPhoneMsg("숫자만 입력해주세요.");
            setIsPhoneValid(false);
        } else {
            setPhoneMsg("");
            setIsPhoneValid(true);
        }
    };

    const addHyphen = (e) => {
            const currNumber = e.target.value;
            setPhone(currNumber);
            if(currNumber.length == 3 || currNumber.length == 8) {
                setPhone(currNumber + "-");
                onChangePhone(currNumber + "-");
            } else {
                onChangePhone(currNumber);
            }
    }

    // 주소
    const onChangeAddr = useCallback(async(e) => {
        const currAddr = e.target.value;
        setAdder(currAddr);

        if(currAddr.length < 1) {
            setAddrMsg("1글자 이상 입력해주세요.");
            setIsAddrValid(false);
        } else {
            setAddrMsg("");
            setIsAddrValid(true);
        }
    })

    //성별
    const onChangeGender = useCallback(async(e) => {
        const currGender = e.target.value;
        setGender(currGender);
        setIsGenderValid(true);
    })


    //생일
    const onChangeBirth = e => {
        const { name, value } = e.target;
        setBirth({...birth, [name]: value});
    }

    const YEAR = [];
    const nowYear = new Date().getFullYear();
    for (let i = 1910; i <= nowYear; i++) {
        YEAR.push(i);
    }

    const MONTH = [];
    for (let i = 1; i <= 12; i++) {
        let m = String(i).padStart(2, '0');
        MONTH.push(m);
    }

    const DAY = [];
    for (let i = 1; i <= 31; i++) {
        let d = String(i).padStart(2, '0');
        DAY.push(d);
    }


    // 아이디 중복 확인
    const [checkID, setCheckID] = useState(false);
    const onCheckID = useCallback(async(e) => {
        if(!isIdValid) {
            alert("아이디를 올바르게 입력해주세요.")
        } else {
            setCheckID(true);
            console.log(id);
            alert("사용 가능한 아이디입니다!")
        }
    });

    // 가입 버튼 활성화
    const isAllValid = isIdValid && isPwValid && isEmailValid && isNameValid && isPhoneValid && checkID;

    // 제출버튼
    const navigate = useNavigate();
    const onsubmit = async () => {
        console.log(id)
        console.log(email)
        console.log(pw)
        console.log(pw)
        console.log(phone)
        console.log(addr)
        try {   
            console.log("try!")
            const res = await axios.post(
                'http://127.0.0.1:8000/api/accounts/signup/', 
                {
                    username: id,
                    email: email,
                    password: pw,
                    phone: phone,
                    address: addr
                }
            );
            console.log(res.data);
            // alert("회원가입에 성공했습니다!");
            // navigate("/login");
        }
        catch (e) {
            console.error(e);
        }

    }

    // 아이디 중복 버튼 색상
    const ConfirmBtn = styled.button`
        width: 21%;
        height: 55px;
        background-color: ${isIdValid ? "#23AA49" : "#BCC6BF"};
        color: white;
        border-radius: 8px;
        border: none;
    `;

    //회원가입 버튼 색상
    const [color, setColor] = useState("")
    const Btn = styled.button`
        width: 40%;
        height: 48px;
        border: none;
        background: ${isAllValid ? "linear-gradient(329.82deg, #23AA49 18.21%, #4BC06C 109.1%)" : "#BCC6BF"};
        border-radius: 8px;
        color: white;
        font-size: 16px;
    `;


    return(
        <>
        <GlobalStyle />
        <Header>
            <GoChevronLeft style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "1.5rem", height: "1.5rem"
            }}/>
            <HeaderText>회원가입</HeaderText>
        </Header>
        <Container style={{paddingTop: "0px"}}>
        <form>
            <InputBox>
                <InputTitle htmlFor="id">아이디*</InputTitle>
                <Input 
                    onChange={onChangeID}
                    className="inputID"
                    name="id"
                    type="text"
                    placeholder=""
                    style={{width: "60vw", marginRight: "10px"}}
                />
                <ConfirmBtn 
                    onClick={onCheckID}
                    type="button"
                    disabled={!isIdValid}>
                            중복 확인
                </ConfirmBtn>
                <P>{idMsg}</P>
            </InputBox>
            <InputBox>
                <InputTitle htmlFor="pw">비밀번호*</InputTitle>
                <Input 
                    onChange={onChangePw}
                    className="inputPW"
                    name="pw"
                    type="text"
                    placeholder=""
                />
                <P>{pwMsg}</P>
            </InputBox>
            <InputBox>
                <InputTitle htmlFor="pwConfirm">비밀번호 확인*</InputTitle> 
                <Input 
                    onChange={onChangePwConfirm}
                    className="inputPwConfirm"
                    name="pwConfirm"
                    type="password"
                    placeholder=""
                />
                <P>{pwConfrimMsg}</P>
            </InputBox>
            <InputBox>
                <InputTitle htmlFor="name">이름*</InputTitle>
                <Input 
                    onChange={onChangeName}
                    className="inputName"
                    name="name"
                    type="text"
                    placeholder=""
                />
                <P>{nameMsg}</P>
            </InputBox>
            <InputBox>
                <InputTitle htmlFor="email">이메일*</InputTitle> 
                <Input 
                    onChange={onChangeEmail}
                    className="inputEmail"
                    name="email"
                    type="text"
                    placeholder=""
                />
                <P>{emailMsg}</P>
            </InputBox>
            <InputBox>
                <InputTitle htmlFor="phone">휴대폰*</InputTitle>
                <Input 
                    onChange={addHyphen}
                    className="inputPhone"
                    name="phone"
                    type="text"
                    placeholder=""
                />
                <P>{phoneMsg}</P>
            </InputBox>
            <InputBox>
                <InputTitle htmlFor="addr">주소</InputTitle>
                <Input 
                    onChange={onChangeAddr}
                    className="inputAddr"
                    name="addr"
                    type="text"
                    placeholder=""
                />
                <P>{addrMsg}</P>
            </InputBox>

            <InputBox style={{marginBottom: "15px"}}>
                <InputTitle className="userMale label">성별</InputTitle>
                    <input
                        onChange={onChangeGender}
                        name="gender"
                        type="radio"
                        value="man"
                    />
                    <span className="test">남</span>
                    <input
                        onChange={onChangeGender}
                        name="gender"
                        type="radio"
                        value="woman"
                    />
                    <span className="test">여</span>
            </InputBox>

            <InputBox style={{marginBottom: "30px"}}>
                <InputTitle>생년월일</InputTitle>
                <Select 
                    className="select" 
                    name="year" 
                    onChange={onChangeBirth}
                >
                    {YEAR.map(y => {
                        return <option key={y}>{y}</option>
                    })}
                </Select>
                <Select 
                    className="select" 
                    name="month" 
                    onChange={onChangeBirth}
                >
                    {MONTH.map(m => {
                        return <option key={m}>{m}</option>
                    })}
                </Select>
                <Select 
                    className="select" 
                    name="day" 
                    onChange={onChangeBirth}
                >
                    {DAY.map(d => {
                        return <option key={d}>{d}</option>
                    })}
                </Select>
            </InputBox>
        </form>
            <Btn 
                onClick={onsubmit}
                disabled={!isAllValid}>
                        가입하기
            </Btn>
        </Container>
        </>
    );
}

export default Signup


const InputBox = styled.div`
    margin-bottom: 10px;
`;

const P = styled.p`
    font-size: 0.85rem;
    color: red;
`;

const Select = styled.select`
    width: 20%;
    height: 30px;
    font-size: 16px;
`;