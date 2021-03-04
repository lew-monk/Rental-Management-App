import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { useState } from "react";
import "./404.css";

const style = {
  slider: {
    position: "relative",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderRadius: "10px",
    height: "300px",
    width: "100%",
  },
  leftArrow: {
    position: "absolute",
    left: 0,
    top: "50%",
    fontSize: "20px",
    color: "#34495e",
    cursor: "pointer",
    userSelect: "none",
    zIndex: "10",
  },
  rightArrow: {
    position: "absolute",
    right: "0",
    top: "50%",
    fontSize: "20px",
    color: "#34495e",
    cursor: "pointer",
    userSelect: "none",
    zIndex: "10",
  },
  slide: {
    opacity: "0",
    transitionDuration: "1s ease",
  },
  active: {
    opacity: "1",
    transitionDuration: "1s",
    transform: "scale(1.08)",
  },
};
const Carousel = ({ url }) => {
  const [current, setCurrent] = useState(0);
  const length = url.length;

  const handleNextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const handlePreviousSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(url) || url.length <= 0) {
    return null;
  }

  return (
    <div style={style.slider}>
      <FaArrowAltCircleLeft
        style={style.leftArrow}
        onClick={handlePreviousSlide}
      />
      <FaArrowAltCircleRight
        style={style.rightArrow}
        onClick={handleNextSlide}
      />
      {url.map((image, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img
                src={`data:image/jpeg;base64,${image.data}`}
                alt="property"
                style={style.image}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
