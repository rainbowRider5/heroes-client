import React from "react";
import { Row, Col, Typography } from "antd";
import "./HeroItem.less";
const HeroItem = ({ hero, onClick }) => {
  return (
    <Row className="HeroItem" onClick={onClick}>
      <Col span={7}>
        <img src={hero.avatar_url} className="HeroItem__avatar" />
        <Typography.Text style={{ lineHeight: "37px" }} strong>
          {hero.full_name}
        </Typography.Text>
      </Col>
      <Col span={6}>
        <Typography.Text style={{ lineHeight: "37px" }}>
          {hero.type.name}
        </Typography.Text>
      </Col>
      <Col span={11} className="HeroItem__description">
        <Typography.Text style={{ lineHeight: "37px" }}>
          {hero.description}
        </Typography.Text>
      </Col>
    </Row>
  );
};

export default HeroItem;
