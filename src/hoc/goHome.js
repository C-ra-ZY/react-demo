import React from "react";
import {Link} from "react-router-dom";

const GoHome = Component => {
  const WithGoHome = () => {
    return (
      <React.Fragment>
        <Link to="/">home</Link>
        <Component />
      </React.Fragment>
    );
  };
  return WithGoHome;
};

export default GoHome;
