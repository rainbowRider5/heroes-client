import React from "react";
import { Row, Col, Typography } from "antd";
import "./HeroItem.less";
import useWindowDimensions from "../../../hooks/useDimensions";

const HeroItem = ({ hero, onClick }) => {
  const {width: screenWidth} = useWindowDimensions();

  const renderFirstColumn = () => {
    if (screenWidth < 768) {
      return (<div className="HeroItem__mobileTitle">
        <img alt={`${hero.full_name} avatar`} src={hero.avatar_url} className="HeroItem__avatar" />
        <div className="HeroItem__mobileTitle__text">
          <Typography.Text strong>{hero.full_name}</Typography.Text>
          <Typography.Text type="secondary">{hero.type.name}</Typography.Text>
        </div>
      </div>)
    } else {
      return (<><img alt={`${hero.full_name} avatar`} src={hero.avatar_url} className="HeroItem__avatar" />
        <Typography.Text className="HeroItem__heading" strong>
          {hero.full_name}
        </Typography.Text></>)
    }
  }

  return (
    <Row className="HeroItem" onClick={onClick}>
      <Col md={7} xs={24}>
        {renderFirstColumn()}
      </Col>
      <Col md={6} xs={0}>
        <Typography.Text className="HeroItem__heading">
          {hero.type.name}
        </Typography.Text>
      </Col>
      <Col md={11} className="HeroItem__description">
        <Typography.Text className="HeroItem__heading">
          {hero.description}
        </Typography.Text>
      </Col>
    </Row>
  );
};

export default HeroItem;
