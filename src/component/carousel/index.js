import React from "react";
import Carousel from "./carousel";

const CarouselDemo = () => {
  let length = 4;
  return (
    <Carousel style={{width: "60vw"}}>
      {new Array(length).fill(null).map((e, index) => {
        return (
          <div
            key={index}
            style={{
              color: "white",
              width: "100%",
              userSelect: "none",
              height: "100%",
              backgroundColor: `rgb(0,0,${(255 / length) * (index + 1)})`
            }}
          >
            {index}
          </div>
        );
      })}
    </Carousel>
  );
};

export default CarouselDemo;
