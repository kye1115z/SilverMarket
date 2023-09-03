import { useCallback, useState } from "react";
import GlobalStyle from "../GlobalStyle";
import {
  Container,
  Header,
  HeaderText,
  Input,
  InputTitle,
} from "../styles/basicStyles";
import { GoChevronLeft } from "react-icons/go";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ItemSelfRegister() {
  // 입력값 상태값
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [origin, setOrigin] = useState("");
  const [quantity, setQuantity] = useState("");
  const [detail, setDetail] = useState("");

  // 메시지
  const [nameMsg, setNameMsg] = useState("");
  const [categoryMsg, setCategoryMsg] = useState("");
  const [priceMsg, setPriceMsg] = useState("");
  const [originMsg, setOriginMsg] = useState("");
  const [quantityMsg, setQuantityMsg] = useState("");
  const [detailMsg, setDetailMsg] = useState("");

  // 유효성 검사 함수로 정리하기
  const [isNameValid, setIsNameValid] = useState(false);
  const [isCategoryValid, setIsCategoryValid] = useState(false);
  const [isPriceValid, setIsPriceValid] = useState(false);
  const [isOriginValid, setIsOriginValid] = useState(false);
  const [isQuantityValid, setIsQuantityValid] = useState(false);
  const [isDetailValid, setIsDetailValid] = useState(false);

  // 상품명
  const onChangeName = useCallback(async (e) => {
    const currName = e.target.value;
    setName(currName);

    if (currName.length < 2 || currName.length > 20) {
      setNameMsg("상품명을 입력해주세요");
      setIsNameValid(false);
    } else {
      setNameMsg("");
      setIsNameValid(true);
    }
  });

  //카테고리
  const onChangeCategory = useCallback(async (e) => {
    const currCategory = e.target.value;
    setCategory(currCategory);

    if (currCategory.length < 2 || currCategory.length > 4) {
      setCategoryMsg("과일, 채소, 유제품, 고기 중 카테고리를 선택해주세요.");
      setIsCategoryValid(false);
    } else {
      setCategoryMsg(`${currCategory}을(를) 선택하셨습니다.`);
      setIsCategoryValid(true);
    }
  });

  // 가격
  const onChangePrice = (e) => {
    const currPrice = e.target.value;
    setPrice(currPrice);
    const priceRegExp = /^[0-9]{1,20}$/;

    if (!priceRegExp.test(currPrice)) {
      setPriceMsg("숫자만 입력해주세요.");
      setIsPriceValid(false);
    } else {
      setPriceMsg("");
      setIsPriceValid(true);
    }
  };

  // 원산지
  const onChangeOrigin = useCallback(async (e) => {
    const currOrigin = e.target.value;
    setOrigin(currOrigin);

    if (currOrigin.length < 2 || currOrigin.length > 20) {
      setOriginMsg("원산지를 입력해주세요");
      setIsOriginValid(false);
    } else {
      setOriginMsg("");
      setIsOriginValid(true);
    }
  });

  // 개당 수량 또는 중량
  const onChangeQuantity = useCallback(async (e) => {
    const currQuan = e.target.value;
    setQuantity(currQuan);
    const regex = /^[0-9]{1,20}$/;

    if (!regex.test(currQuan)) {
      setQuantityMsg("숫자만 입력해주세요.");
      setIsQuantityValid(false);
    } else {
      setQuantityMsg("");
      setIsQuantityValid(true);
    }
  });

  // 상품 설명
  const onChangeDetail = useCallback(async (e) => {
    const currDetail = e.target.value;
    setDetail(currDetail);

    if (currDetail.length < 2 || currDetail.length > 20) {
      setDetailMsg("상품명을 입력해주세요");
      setIsDetailValid(false);
    } else {
      setDetailMsg("");
      setIsDetailValid(true);
    }
  });
  // 버튼 활성화
  const isAllValid =
    isCategoryValid &&
    isNameValid &&
    isPriceValid &&
    isOriginValid &&
    isQuantityValid &&
    isDetailValid;

  // 버튼 색상
  const [color, setColor] = useState("");
  const Btn = styled.button`
    width: 40%;
    height: 48px;
    border: none;
    background: ${isAllValid
      ? "linear-gradient(329.82deg, #23AA49 18.21%, #4BC06C 109.1%)"
      : "#BCC6BF"};
    border-radius: 8px;
    color: white;
    font-size: 16px;
  `;

    //파일 선택
    const [file, setFile] = useState({});
    const onChangeImg = async (e) => {
      const imageTpye = e.target.files[0].type.includes('image')
      setFile({
        url: URL.createObjectURL(e.target.files[0]),
        image: imageTpye,
    });
    console.log(imageTpye)
    } 


  // 제출버튼
  const navigate = useNavigate();
  const onClick = async (e) => {
    e.preventDefault();

    try {   
      console.log("try!")
      console.log(name)
      console.log(category)
      console.log(quantity)
      console.log(detail)

      const formData = new FormData(); 
      formData.append("products_name", name);
      formData.append("category", category);
      formData.append("separate_weight", quantity);
      formData.append("description", detail);
      formData.append("writer", "후");

      const res = await axios.post(
          'http://127.0.0.1:8000/api/products/', 
              formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }
          
      );

      // formData.append("image", file.url);
      // const image = await axios.post(
      //   'http://127.0.0.1:8000/api/imageapp/upload/', 
      //   {
      //     image: file.url
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     }
      //   }
      // )
      // console.log(image);
      // alert("회원가입에 성공했습니다!");
      // navigate("/login");
  }
  catch (e) {
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
        <HeaderText>상품 직접 등록하기</HeaderText>
      </Header>
      <Container style={{ paddingTop: "0px" }}>
        <InputBox style={{width: "80%"}}>
        <InputTitle htmlFor="image">사진 등록하기</InputTitle>
        <InputBtn>
          <input
              className="inputName"
              name="name"
              type="file"
              accept="image/*"
              onChange={onChangeImg}
            />
        </InputBtn>
        </InputBox>
        <form>
          <InputBox>
            <InputTitle htmlFor="name">상품명</InputTitle>
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
            <InputTitle htmlFor="category">카테고리</InputTitle>
            <Input
              onChange={onChangeCategory}
              className="inputCategory"
              name="Category"
              type="text"
              placeholder=""
            />
            <P>{categoryMsg}</P>
          </InputBox>
          <InputBox>
            <InputTitle htmlFor="price">가격</InputTitle>
            <Input
              onChange={onChangePrice}
              className="inputPrice"
              name="price"
              type="text"
              placeholder=""
            />
            <P>{priceMsg}</P>
          </InputBox>
          <InputBox>
            <InputTitle htmlFor="origin">원산지</InputTitle>
            <Input
              onChange={onChangeOrigin}
              name="origin"
              type="text"
              placeholder=""
            />
            <P>{originMsg}</P>
          </InputBox>
          <InputBox>
            <InputTitle htmlFor="origin">개당 수량 또는 중량 </InputTitle>
            <Input
              onChange={onChangeQuantity}
              name="quantity"
              type="text"
              placeholder=""
            />
            <P>{quantityMsg}</P>
          </InputBox>
          <InputBox>
            <InputTitle htmlFor="detail">상품설명</InputTitle>
            <Input
              onChange={onChangeDetail}
              name="detail"
              type="text"
              placeholder=""
            />
            <P>{detailMsg}</P>
          </InputBox>

          <Btn onClick={onClick} disabled={!isAllValid}>
            상품 등록하기
          </Btn>
        </form>
      </Container>
    </>
  );
}

export default ItemSelfRegister;

const InputBox = styled.div`
  margin-bottom: 10px;
`;

const InputBtn = styled.button`
  width: 70px;
  height: 50px;
  background-color: transparent;
  margin-bottom: 10px;
  border: none;
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

