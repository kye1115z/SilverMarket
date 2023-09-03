import GlobalStyle from "../GlobalStyle"
import { Container } from "../styles/basicStyles"
import { styled } from "styled-components";

function First() {
    return(
        <>
        <GlobalStyle />
            <BackContainer>
                <Container>
                    <div style={{height: "130px", backgroundColor: "blue"}}></div>
                    <P>은 빛 시 장</P>
                    <Btn onClick={() => {window.location.href="/"}}>
                        구매하기
                    </Btn>
                    <Btn onClick={() => {window.location.href="/itemregister"}}>
                        상품 등록하기
                    </Btn>
                </Container>
            </BackContainer>
        </>
    )
}

export default First;

const BackContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url('../img/first.svg');
    position: relative;

`;

const P = styled.p`
    font-size: 30px;
    font-weight: bolder;
    background: #4AB846;
    background: linear-gradient(to top left, #4AB846 0%, #16692D 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 90px;
`;

const Btn = styled.button`
    width: 45%;
    height: 53px;
    border-radius: 100px;
    border: none;
    background: linear-gradient(329.82deg, #23AA49 18.21%, #4BC06C 109.1%);
    margin-bottom: 20px;
    color: white;
    font-size: 1.1rem;
`;