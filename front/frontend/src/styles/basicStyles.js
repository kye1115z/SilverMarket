import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 1%;
    width: 100%;
    margin: 0 auto;
    padding: 2.6rem 0 0 0;
    overflow: scroll;
    align-items: center;
`;

export const Input = styled.input`
    width: 80vw;
    height: 50px;
    border: 1.5px solid #BCC6BF;
    border-radius: 8px;
    text-indent: 5px;
    font-size: 1rem;
    outline: none;
    margin-bottom: 10px;
    &:focus {
        border-color: #23AA49;
        outline: none;
    }
`;

export const Text = styled.p`
    font-size: 16px;
    padding: 0.3rem 0.3rem 0.3rem 0;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 2.6rem 0 5px 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.08);
    margin-bottom: 21px;
`;

export const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 63px;
`;

export const Center = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const HeaderText = styled.p`
    font-size: 18px;
    padding-top: 4px;
`;

export const InputTitle = styled.p`
    font-size: 16px;
    margin-bottom: 5px;
    /* font-weight: bold; */
`;

export const BackBtn = styled.button`
background-color: transparent;
border: none;
display: flex;
align-items: center;
`;