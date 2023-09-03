import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "styled-components";
import { Component } from "react";



const items = [
  { id: 1, url: '../img/banner1.svg' },
  { id: 2, url: '../img/banner2.svg' },
  { id: 3, url: '../img/banner1.svg' },
  { id: 4, url: '../img/banner2.svg' },
];

export default class SimpleSlider extends Component {

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,  // 넘어가는 속도
            centerMode: true,
            centerPadding: '0px',  // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
            pauseOnHover : true,
            draggable : true,
            centerPadding: "25px",
          };

    return (
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
        );
    }
}


const Container = styled.div`
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 100%;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 82vw;
  height: 38vw;
  background-color: white;
  border-radius: 25px;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  height: 100%;

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