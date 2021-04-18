import React from "react";
import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";

import heroesAPI from "../../redux/slices/heroes/heroesAPI";
import typesAPI from "../../redux/slices/types/typesAPI";
import HeroList from "../../components/HeroList/HeroList";
import store from "../../redux/store";
import { WrappedComponent } from "../../App";
import { fetchHeroes } from "../../redux/slices/heroes/heroesSlice";

const getHeroMock = (name) => ({
  avatar_url: "some_url",
  type: { name },
  full_name: `Full ${name}`,
  description: "Description about the hero",
});

describe("Component - <HeroList/>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(typesAPI, "fetchTypes")
      .mockResolvedValue({ data: { data: [], total_count: 0 } });
  });

  describe("Given the HeroList render attempt", () => {
    describe("When component is rendered", () => {
      beforeEach(() => {
        render(
          <WrappedComponent store={store}>
            <HeroList />
          </WrappedComponent>
        );
      });

      it('Then it should render button "Add hero"', () => {
        expect(screen.getByText("Add hero")).toBeInTheDocument();
      });

      it("Then it should render list headers", () => {
        expect(screen.getByText("Heros")).toBeInTheDocument();
        expect(screen.getByText("Type")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
      });
    });

    describe("When the loading is true", () => {
      beforeEach(() => {
        render(
          <WrappedComponent store={store}>
            <HeroList />
          </WrappedComponent>
        );
      });

      it("Then it should render the large spinner", () => {
        expect(screen.getByTestId("large-spinner")).toBeInTheDocument();
      });
    });

    describe("When fetchHeroes found 0 heroes", () => {
      beforeEach(async () => {
        jest
          .spyOn(heroesAPI, "fetchHeroes")
          .mockResolvedValue({ data: { data: [], total_count: 0 } });
        render(
          <WrappedComponent store={store}>
            <HeroList />
          </WrappedComponent>
        );
        await act(async () => {
          await store.dispatch(fetchHeroes(1));
        });
      });

      it("Then it should not render the large spinner", () => {
        expect(screen.queryByTestId("large-spinner")).toBeNull();
      });

      it('Then it should render message "No heroes found"', () => {
        expect(screen.getByText("No heroes found")).toBeInTheDocument();
      });
    });

    describe("When fetchHeroes found multiple heroes", () => {
      beforeEach(async () => {
        jest.spyOn(heroesAPI, "fetchHeroes").mockResolvedValue({
          data: {
            data: [getHeroMock("Hero 1"), getHeroMock("Hero 2")],
            total_count: 2,
          },
        });
        render(
          <WrappedComponent store={store}>
            <HeroList />
          </WrappedComponent>
        );
        await act(async () => {
          await store.dispatch(fetchHeroes(2));
        });
      });

      it('Then it should not render message "No heroes found"', () => {
        expect(screen.queryByText("No heroes found")).toBeNull();
      });

      it("Then it should render multiple HeroItems", () => {
        expect(screen.getByTestId("hero_0")).toBeInTheDocument();
        expect(screen.getByTestId("hero_1")).toBeInTheDocument();
      });
    });
  });
});
