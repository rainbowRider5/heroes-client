import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Typography } from "antd";
import { PlusOutlined, FrownOutlined } from "@ant-design/icons";
import "./HeroList.less";
import HeroItem from "./HeroItem/HeroItem";
import HeroModal from "./HeroModal/HeroModal"
import { fetchHeroes, addHero, removeHero } from "../../redux/slices/heroesSlice";

const HeroList = () => {
  const heroes = useSelector((state) => state.heroesReducer.heroes);
  const loading = useSelector((state) => state.heroesReducer.loading);
  const [numberToDisplay, setNumberToDisplay] = useState(8);
  const [activeHero, setActiveHero] = useState(null)
  const dispatch = useDispatch();

  const handleModalOk = (hero) => {
      if (activeHero === "NEW") {
            dispatch(addHero(hero))
      } else {
          dispatch(removeHero(hero.id))
      }
      setActiveHero(null)
  }

  const renderHeroes = () => {
    if (loading) {
      return "Loading...";
    } else {
      if (heroes.length) {
        return heroes.slice(0, numberToDisplay).map((h, idx) =>
          idx === numberToDisplay - 1 && numberToDisplay < heroes.length ? (
            <div className="HeroList__loadMore">
              <div className="HeroList__loadMore__buttonContainer">
                <Button
                  type="primary"
                  onClick={() => setNumberToDisplay(numberToDisplay + 8)}
                >
                  Load more
                </Button>
              </div>
              <HeroItem hero={h} onClick={()=> setActiveHero(h)}/>
            </div>
          ) : (
            <HeroItem hero={h} onClick={()=> setActiveHero(h)}/>
          )
        );
      } else {
        return (
          <div className="noHeroesPrompt">
            <FrownOutlined className="noHeroesPrompt__Icon" />
            <p className="noHeroesPrompt__Text">No heroes found</p>
          </div>
        );
      }
    }
  };

  useEffect(() => {
    dispatch(fetchHeroes());
  }, []);

  return (
    <div className="HeroList">
      <Row className="HeroList__options">
        <Col span={24}>
          <Button type="success" onClick={()=> setActiveHero("NEW")}>
            <PlusOutlined />
            Add hero
          </Button>
        </Col>
      </Row>
      <Row className="HeroList__header">
        <Col span={7}>
          <Typography.Text type="secondary">Heros</Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text type="secondary">Type</Typography.Text>
        </Col>
        <Col span={11}>
          <Typography.Text type="secondary">Description</Typography.Text>
        </Col>
      </Row>
      {renderHeroes()}
      <HeroModal hero={activeHero} onCancel={() => setActiveHero(null)} onOk={handleModalOk} />
    </div>
  );
};

export default HeroList;
