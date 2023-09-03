import { styled } from "styled-components";

export function NextArrow(props) {
    const { onClick } = props;
    console.log(props)
    if(props.currentSlide == 7) {
        window.location.href = "/itemregister"
    }

    return (
        <button style={{
            border: "none", borderRadius: "100px", backgroundColor: "#23AA49",
            width: "80px", height: "45px", color: "white", fontSize: "16px", fontWeight: "bold",
            position: "absolute", bottom: "2%", right: "2%"
            }}
            onClick={onClick}
        >
            다음
        </button>
    )
}


export function PrevArrow(props) {
    const { onClick } = props;
    return (
        <button style={{
            border: "none", borderRadius: "100px", backgroundColor: "#23AA49",
            width: "106px", height: "53px", color: "white", fontSize: "16px", fontWeight: "bold",
            position: "absolute", bottom: "2%", right: "2%"
            }}
            onClick={onClick}
        >
            이전
        </button>
    )
}
