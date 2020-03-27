import React from "react";

const Indexer = props => {
  const {index: carouselIndex, length, jump} = props;

  function onClick(evt) {
    evt.stopPropagation();
    jump(parseInt(evt.target.getAttribute("value")));
  }

  return (
    <React.Fragment>
      <div className="indexer">
        {new Array(length).fill(null).map((e, index) => {
          let className = "dot";
          if (index == carouselIndex) {
            className += " active";
          }
          return (
            <div key={index} className="box">
              <div className={className} value={index} onClick={onClick} />
              {/* <div className> */}
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .indexer {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgb(0, 0, 0, 0);
          height: 10%;
        }
        .box {
          float: left;
          margin-left: 0.5em;
          margin-right: 0.5em;
          height: 100%;
          background-color: rgba(255, 255, 255, 0);
          position: relative;
        }
        .dot {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.5);
          width: 0.75em;
          height: 0.75em;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .active {
          background-color: rgba(255, 255, 255, 0.75);
        }
      `}</style>
    </React.Fragment>
  );
};

export default Indexer;
