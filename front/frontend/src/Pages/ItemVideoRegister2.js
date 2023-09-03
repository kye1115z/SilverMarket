import { styled } from "styled-components";
import GlobalStyle from "../GlobalStyle";
import { Container, Header, HeaderText } from "../styles/basicStyles";
import { GoChevronLeft } from "react-icons/go";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
function ItemVideoRegister2() {
  // 비디오 저장
  const [file, setFile] = useState({});
  const imageUpload = (e) => {
    const videoTpye = e.target.files[0].type.includes("video");
    setFile({
      url: URL.createObjectURL(e.target.files[0]),
      video: videoTpye,
    });
    console.log(videoTpye);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("img");
    try {
      console.log("try!");
      const res = await axios.post("http://127.0.0.1:8000/api/videos/", {
        title: "맛있는 고구마",
        video_file: e.target.files[0],
      });
      console.log(res);
      // alert("회원가입에 성공했습니다!");
      // navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <GlobalStyle />
      <Header>
        <GoChevronLeft
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "1.5rem",
            height: "1.5rem",
          }}
        />
        <HeaderText>상품 동영상으로 등록하기</HeaderText>
      </Header>
      <Container>
        <Box>
          <Container>
            <Text style={{ fontSize: "22px" }}>
              영상으로 말씀하신 정보로 상품 정보로 상품 정보를 저희가 대신
              작성해 드려요.
            </Text>
            <Text style={{ fontSize: "22px" }}>
              정보 누락이 있는 경우 영상을 다시 요구할 수 있어요.
            </Text>
            <Text style={{ fontSize: "22px" }}>
              확인이 완료되면 영상은 게시되어 소비자에게 제공됩니다.
            </Text>
          </Container>
        </Box>

        {file.video && <video src={file.url} controls width="350px" />}
        <Submit onClick={onSubmit}>동영상 등록하기</Submit>
      </Container>
    </>
  );
}
export default ItemVideoRegister2;
const Box = styled.div`
  width: 85vw;
  height: 70vh;
  background-image: url("../img/boxcheck.svg");
  background-size: contain;
  background-repeat: no-repeat;
`;
const Text = styled.p`
  font-size: 20px;
  width: 80%;
  margin-top: 20px;
  line-height: 120%;
  font-weight: bold;
`;
const Submit = styled.button`
  width: 75vw;
  height: 65px;
  border: none;
  border-radius: 15px;
  font-size: 24px;
  color: white;
  background: linear-gradient(329.82deg, #23aa49 18.21%, #4bc06c 109.1%);
`;
const Input = styled.input`
  margin-right: 10px;
  width: 17px;
  height: 17px;
`;
const VideoInput = styled.input``;
