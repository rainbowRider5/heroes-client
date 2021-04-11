import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Typography } from "antd";
import { PlusOutlined, FrownOutlined } from "@ant-design/icons";
import {useHistory, useLocation, useParams} from "react-router-dom"
import "./HeroList.less";
import HeroItem from "./HeroItem/HeroItem";
import HeroModal from "./HeroModal/HeroModal"
import { fetchHeroes, addHero, removeHero } from "../../redux/slices/heroes/heroesSlice";

const HeroList = () => {
  const heroes = useSelector((state) => state.heroesReducer.heroes);
  const loading = useSelector((state) => state.heroesReducer.loading);
  const [numberToDisplay, setNumberToDisplay] = useState(8);
  const history = useHistory();
  const location = useLocation();
  const params = useParams()
  const dispatch = useDispatch();
  const activeHero = location.state ? location.state.hero : null;

  const handleModalOk = async (hero) => {
      if (activeHero === "NEW") {
          return dispatch(addHero(hero)).then(r => r)
      } else {
          return dispatch(removeHero(hero.id)).then(r => r)
      }
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
              <HeroItem key={idx} hero={h} onClick={()=> history.push({pathname: `/hero/${h.id}`, state: {hero: h}})}/>
            </div>
          ) : (
            <HeroItem key={idx} hero={h} onClick={()=> history.push({pathname: `/hero/${h.id}`, state: {hero: h}})}/>
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

  useEffect(() => {
    if (params.id && (!location.state || !location.state.hero)) {
      history.replace({pathname: location.pathname, state: {hero: heroes.find(h=>h.id === params.id)}})
    }
  }, [heroes, location.pathname]);

  return (
    <div className="HeroList">
      <Row className="HeroList__options">
        <Col xs={24} sm={4} lg={3} xl={2}>
          <Button type="success" onClick={()=> history.push({pathname: "/hero/", state: {hero: "NEW"}})}>
            <PlusOutlined />
            Add hero
          </Button>
        </Col>
      </Row>
      <Row className="HeroList__header">
        <Col md={7} xs={0}>
          <Typography.Text type="secondary">Heros</Typography.Text>
        </Col>
        <Col md={6} xs={0}>
          <Typography.Text type="secondary">Type</Typography.Text>
        </Col>
        <Col md={11} xs={0}>
          <Typography.Text type="secondary">Description</Typography.Text>
        </Col>
      </Row>
      {renderHeroes()}
      <HeroModal hero={activeHero} onCancel={()=> history.push("/")} onOk={handleModalOk} />
    </div>
  );
};

export default HeroList;
