import { styled } from "styled-components";
import GlobalStyle from "../GlobalStyle";
import { Container, Header, HeaderText } from "../styles/basicStyles";
import { GoChevronLeft } from "react-icons/go";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

function ItemVideoRegister() {

  //체크박스
  const checkBoxList = ['상품 외관', '상품명', '가격', '개당 수량 또는 중량', '총 수량 또는 중량', '상품 설명']

  const [checkedList, setCheckedList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const checkedItemHandler = (value, isChecked) => {
    if(isChecked) {
      setCheckedList((prev) => [...prev, value]);

      return;
    }

    if(!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));

      return;
    }

    return;
  };

  const checkHandler = (e, value) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked)
  }

  const [allow, setAllow] = useState(false);
  const [color, setColor] = useState("#BCC6BF");

  useEffect(() => {
    if(checkedList.length == 6) {
      setAllow((prev) => !prev)
      setColor("linear-gradient(329.82deg, #23AA49 18.21%, #4BC06C 109.1%);")
      console.log("hi")
      console.log(allow)
      console.log(color)
    }
  }, [checkedList])

  console.log(checkedList.length)

  const Button = styled.button`
  width: 75vw;
  height: 65px;
  border: none;
  border-radius: 15px;
  font-size: 24px;
  color: white;
  background: ${color};
  margin-bottom: 20px;
`; 

  // 비디오 저장
  const [file, setFile] = useState({});

  const imageUpload = e => {
    const videoTpye = e.target.files[0].type.includes('video');

    setFile({
      url: URL.createObjectURL(e.target.files[0]),
      video: videoTpye,
    });
    console.log(videoTpye);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("img")


    try {   
      console.log("try!")

      const formData = new FormData(); 
      formData.append("title", "맛있는 고구마");
      formData.append("video_file", file.url);

      const res = await axios.post(
          'http://127.0.0.1:8000/api/videos/', formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          },
          
      );
      console.log(res);
  }
  catch (e) {
      console.error(e);
  }
  }

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
            <Text style={{
                fontSize: "22px", fontWeight: "bolder", color: "#23AA49"
            }}>영상을 선택해주세요!</Text>
            <Text style={{fontSize: "22px"}}>영상의 길이는 5분 내로 제한됩니다.</Text>
            <Text style={{fontSize: "22px"}}>영상 속에 다음 정보가 포함되었는지 확인해주세요.</Text>
          </Container>
          <Container style={{paddingTop: "5px"}}>
            {checkBoxList.map((item, idx) => (
              <Text>
                <Input 
                  type="checkbox"
                  id={item}
                  checked={checkedList.includes(item)}
                  onChange={(e)=>checkHandler(e, item)}
                />
                {item}
              </Text>
            ))}
          </Container>
        </Box>
        <Button
          disabled={allow}
        >
          동영상 선택하기
          <VideoInput 
            type="file"
            accept="video/*"
            onChange={imageUpload}
            />
        </Button>
        {file.video && <video src={file.url} controls width="350px" />}
        <Submit onClick={onSubmit}>
          동영상 보내기
        </Submit>
      </Container>
    </>
  );
}
export default ItemVideoRegister;

const Box = styled.div`
  width: 85vw;
  height: 70vh;
  background-image: url('../img/boxcheck.svg');
  background-size: contain;
  background-repeat: no-repeat;
`;

const Text = styled.p`
  font-size: 20px;
  width: 80%;
  margin-top: 20px;
  line-height: 120%;
`;

const Submit = styled.button`
  width: 75vw;
  height: 65px;
  border: none;
  border-radius: 15px;
  font-size: 24px;
  color: white;
  background: linear-gradient(329.82deg, #23AA49 18.21%, #4BC06C 109.1%);
  
`; 

const Input = styled.input`
  margin-right: 10px;
  width: 17px;
  height: 17px;
`;

const VideoInput = styled.input`
`;