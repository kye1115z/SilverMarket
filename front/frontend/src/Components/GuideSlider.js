import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "styled-components";
import GlobalStyle from "../GlobalStyle";
import { NextArrow, PrevArrow } from "./Arrow";
import { useState } from "react";


const items = [
  { id: 1, url: '../img/guide1.svg' },
  { id: 2, url: '../img/guide2.svg' },
  { id: 3, url: '../img/guide3.svg' },
  { id: 4, url: '../img/guide4.svg' },
  { id: 5, url: '../img/guide5.svg' },
  { id: 6, url: '../img/guide6.svg' },
  { id: 7, url: '../img/guide7.svg' },
  { id: 8, url: '../img/guide8.svg' },
];

function GuideSlider() {

    const [slide, setSlide] = useState({
      activeSlide: 0,
      activeSlide2: 0,
    });

    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0px',  // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
        draggable : true,
        dots: true,
        beforeChange: (current, next) => {
          setSlide({activeSlide: next, activeSlide2: current})
        },
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <>
        <GlobalStyle />
          <Container>
            <StyledSlider {...settings}>
                {items.map(item =>{
                  return (
                    <div key={item.id}>
                      <ImageContainer>
                        <Image src={item.url} />
                      </ImageContainer>
                    </div>
                  );
                })}
            </StyledSlider>
          </Container>
        </>
        );
}
export default GuideSlider;


const Container = styled.div`
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 100%;
    position: relative;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Image = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: relative;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  height: 100%;
  position: relative;

  .slick-dots {
    display: flex;
    justify-content: center;
    bottom: 10px;
    color: white;

    li button:before {
      color: white;
    }

    li.slick-active button:before {
      color: gray;
    }
  }
`;