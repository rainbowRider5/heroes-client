import React from "react";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import "./NotFound.less";

const NotFound = () => {
  const history = useHistory();

  return (
    <div className="NotFound">
      <h1 className="NotFound__heading">OOPS!</h1>
      <p className="NotFound__paragraph">
        We can't find the page you're looking for.
      </p>
      <Button
        className="NotFound__button"
        type="primary"
        onClick={() => history.push("/")}
      >
        Visit homepage
      </Button>
    </div>
  );
};

export default NotFound;
