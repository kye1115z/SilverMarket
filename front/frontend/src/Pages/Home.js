import React, { useState, useEffect } from "react";
import GlobalStyle from "../GlobalStyle";
import { styled } from "styled-components";
import { Container, Title, Center } from "../styles/basicStyles.js";
import { CiSearch } from "react-icons/ci"
import CategoryList from "../Components/CategoryList";
import BestProduct from "../Components/BestProduct";
import SimpleSlider from "../Components/SimpleSlider";
import Footer from "../Components/Footer";
import axios from "axios";


function Home() {
    const lists = [
        [1, "과일", "../img/fruit.svg"],
        [2, "채소", "../img/vegetable.svg"],
        [3, "유제품", "../img/diary.svg"],
        [4, "고기", "../img/meat.svg"]
    ]

    const best = [
        [1, "[당일배송] 빨간색 파프리카", "../img/fruit.svg", '5,000₩'],
        [2, "신선한 양고기 1kg 숙성 냉장 양제비추리 어찌구 저찌구", "../img/vegetable.svg", '50,000₩'],
        [3, "유제품", "../img/diary.svg", '1₩'],
        [4, "고기", "../img/meat.svg", '500,000₩']
    ]
        
    const [product, setProduct] = useState();
    const CateList = lists.map((v) => (<CategoryList name={v[1]} icon={v[2]}/>))

    //리스트 받아오기
    const getProduct = async() => {
        try {
            const res = await axios.get(
                    "http://127.0.0.1:8000/api/products/"
                )
            setProduct(res.data)
            console.log(res.data)
        }
        catch(e) {
            console.log(e)
        }
    };

    useEffect(()=>{
        getProduct()
    }, [])

    //반복 함수. v로 읽음.
    // const CateList = product.map((v) => (<CategoryList name={v.name} icon={v.photo}/>))
    // const BestList = product.map((v) => (<BestProduct name={v[1]} icon={v[2]} price={v[3]}/>))

        
    return (
        <> 
        <GlobalStyle />
            <div style={{
                width: "100%", backgroundColor: "#F3F5F7",
                height: "236px", position: "relative",
                borderTopLeftRadius: "0",
                borderTopRightRadius: "0",
                borderBottomLeftRadius: "50px",
                borderBottomRightRadius: "50px",
            }}>
                <Container>
                    <InputBox>
                        <CiSearch 
                            size="20"
                            color="#23AA49"
                            style={{
                                marginLeft: "16px",
                            }}/>
                        <form style={{
                            width: "90%"}}>
                            <Search 
                                placeholder="상품 검색"
                            />
                        </form>
                    </InputBox>
                    <div style={{
                        width: "100%", height: "19%", display: "flex",
                        justifyContent: "center", alignItems: "center",
                        marginBottom: "3vw"}}>
                        <SimpleSlider />
                    </div>
                    <Center style={{flexDirection: "column", marginBottom: "3vw"}}>
                        <Center className="CategoryBox">
                            <Title>
                                <Ttitle>상품 목록😋</Ttitle>
                                <More href="/signup">더 보기</More>
                            </Title>
                        </Center>
                        <Center 
                            className="Category" 
                            style={{justifyContent: "space-around"}}>
                            {CateList}
                        </Center>
                    </Center>
                    <Center style={{flexDirection: "column"}}>
                        <Center className="CategoryBox">
                            <Title>
                                <Ttitle>인기 상품🔥</Ttitle>
                                <More href="/signup">더 보기</More>
                            </Title>
                        </Center>
                        {product&&product.map((item, index) => 
                        <Box 
                            key={index}
                            className="BestList" 
                            style={{display: "flow"}}>
                            <BestProduct name={item.products_name} icon={item.photo} price={item.id} id={item.id} />
                        </Box>
                        )}
                    </Center>
                </Container>
                <Footer />
            </div>
        </>
    );
}

export default Home;

const Search = styled.input`
    width: 90%;
    height: 50px;
    border: none;
    text-indent: 5px;
    font-size: 16px;
    color: #979899;
    outline: none;
    background-color: white;

`;

const InputBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 50px;
    border-radius: 67px;
    position: relative;
    margin-top: 30px;
    margin-bottom: 24px;
    background-color: white;
`;

const Ttitle = styled.p`
    font-size: 18px;
    font-weight: bolder;
    color: #06161C;

    @media (min-width: 768px) {
    font-size: 1.7em;
    }
`;

const More = styled.a`
    font-size: 15px;
    color: #23AA49;
    text-decoration: none;


    @media (min-width: 768px) {
    font-size: 1.3em;
    }
`;

const Box = styled.div`
    width: 100%;
`;
