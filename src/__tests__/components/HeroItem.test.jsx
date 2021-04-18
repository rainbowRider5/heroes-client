import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import HeroItem from "../../components/HeroList/HeroItem/HeroItem";
import store from "../../redux/store";
import { WrappedComponent } from "../../App";

const getHeroMock = (name) => ({
  avatar_url: "some_url",
  type: { name },
  full_name: `Full ${name}`,
  description:
    "Full description about the hero, should be pretty long to test everything out",
});

const sampleHero = getHeroMock("Hero 1");

const onClickSpy = jest.fn();

describe("Component - <HeroItem/>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <WrappedComponent store={store}>
        <HeroItem hero={sampleHero} onClick={onClickSpy} id={"some_id"} />
      </WrappedComponent>
    );
  });

  describe("Given the HeroItem is rendered", () => {
    it("Then it should display hero name", () => {
      expect(screen.getByText(sampleHero.full_name)).toBeInTheDocument();
    });
    it("Then it should display hero type", () => {
      expect(screen.getByText(sampleHero.type.name)).toBeInTheDocument();
    });
    it("Then it should display hero description", () => {
      expect(screen.getByText(sampleHero.description)).toBeInTheDocument();
    });

    describe("When HeroItem is clicked", () => {
      it("Then it should call passed onClick function", () => {
        const heroItem = screen.getByTestId("some_id");

        fireEvent.click(heroItem);
        expect(onClickSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
