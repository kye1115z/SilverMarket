import GlobalStyle from "../GlobalStyle";
import { styled } from "styled-components";
import { Container } from "../styles/basicStyles";

function ConfirmOrder() {
    return(
        <>
            <GlobalStyle />
            <Container style={{padding: "0px"}}>
                <Box>
                    <InnerBox>

                    </InnerBox>
                </Box>
            </Container>
        </>
    )
}

export default ConfirmOrder;

const Box = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url('../img/ConfirmOrder.svg');
    filter: blur(25px);
    -webkit-filter: blur(25px);
    position: relative;
`;

const InnerBox = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
`;

