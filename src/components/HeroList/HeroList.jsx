import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Typography, Spin } from "antd";
import { PlusOutlined, FrownOutlined } from "@ant-design/icons";
import { useHistory, useLocation, useParams } from "react-router-dom";
import "./HeroList.less";
import HeroItem from "./HeroItem/HeroItem";
import HeroModal from "./HeroModal/HeroModal";
import {
  fetchHeroes,
  addHero,
  removeHero,
} from "../../redux/slices/heroes/heroesSlice";

const HeroList = () => {
  const heroes = useSelector((state) => state.heroesReducer.heroes);
  const totalHeroes = useSelector((state) => state.heroesReducer.total);
  const loading = useSelector((state) => state.heroesReducer.loading);
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const activeHero = location.state ? location.state.hero : null;

  const handleModalOk = async (hero) =>
    activeHero === "NEW"
      ? dispatch(addHero(hero)).then((r) => r)
      : dispatch(removeHero(hero.id)).then((r) => r);

  const renderHeroes = () => {
    if (loading)
      return (
        <div className="HeroList__loaderContainer" data-testid="large-spinner">
          <Spin size="large" />
        </div>
      );

    if (!heroes.length)
      return (
        <div className="noHeroesPrompt">
          <FrownOutlined className="noHeroesPrompt__Icon" />
          <p className="noHeroesPrompt__Text">No heroes found</p>
        </div>
      );

    return heroes.map((h, idx) =>
      idx === 7 && heroes.length < totalHeroes ? (
        <div className="HeroList__loadMore" key={idx}>
          <div className="HeroList__loadMore__buttonContainer">
            <Button type="primary" onClick={() => dispatch(fetchHeroes(8))}>
              Load more
            </Button>
          </div>
          <HeroItem
            key={idx}
            hero={h}
            id={`hero_${idx}`}
            onClick={() =>
              history.push({
                pathname: `/hero/${h.id}`,
                state: { hero: h },
              })
            }
          />
        </div>
      ) : (
        <HeroItem
          key={idx}
          hero={h}
          id={`hero_${idx}`}
          onClick={() =>
            history.push({ pathname: `/hero/${h.id}`, state: { hero: h } })
          }
        />
      )
    );
  };

  useEffect(() => {
    dispatch(fetchHeroes(8));
  }, []);

  useEffect(() => {
    if (params.id && (!location.state || !location.state.hero)) {
      history.replace({
        pathname: location.pathname,
        state: { hero: heroes.find((h) => h.id === params.id) },
      });
    }
  }, [heroes, location.pathname]);

  return (
    <div className="HeroList">
      <Row className="HeroList__options">
        <Col xs={24} sm={4} lg={3} xl={2}>
          <Button
            type="success"
            onClick={() =>
              history.push({ pathname: "/hero/", state: { hero: "NEW" } })
            }
          >
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
      <HeroModal
        hero={activeHero}
        onCancel={() => history.push("/")}
        onOk={handleModalOk}
      />
    </div>
  );
};

export default HeroList;
