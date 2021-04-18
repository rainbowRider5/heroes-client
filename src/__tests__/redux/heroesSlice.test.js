import { configureStore } from "@reduxjs/toolkit";

import heroesAPI from "../../redux/slices/heroes/heroesAPI";
import heroesReducer, {
  fetchHeroes,
  addHero,
  removeHero,
} from "../../redux/slices/heroes/heroesSlice";

const getHeroMock = (name) => ({
  id: name,
  avatar_url: "some_url",
  type: { name },
  full_name: `Full ${name}`,
  description: "Description about the hero",
});

let store;

describe("Redux - hero slice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = configureStore({
      reducer: { heroesReducer },
    });
    jest.spyOn(heroesAPI, "fetchHeroes").mockResolvedValue({
      data: {
        data: [getHeroMock("Hero 1"), getHeroMock("Hero 2")],
        total_count: 2,
      },
    });
    jest
      .spyOn(heroesAPI, "addHero")
      .mockResolvedValue({ data: getHeroMock("Hero 3") });
    jest
      .spyOn(heroesAPI, "removeHero")
      .mockResolvedValue({ data: getHeroMock("Hero 3") });
  });

  describe("Given the heroes store redux", () => {
    it("Then it should contain initial store", () => {
      expect(store.getState()).toEqual({
        heroesReducer: {
          heroes: [],
          loading: false,
          total: 0,
        },
      });
    });

    describe("When store is dispatched with pending fetchHeros", () => {
      it("Then it should contain loading true", () => {
        // There is no await so we know it won't wait for the fulfilled response here
        store.dispatch(fetchHeroes(2));
        expect(store.getState()).toEqual({
          heroesReducer: {
            heroes: [],
            loading: true, // <--
            total: 0,
          },
        });
      });
    });

    describe("When store is dispatched with rejected fetchHeros", () => {
      it("Then it should contain previous store and loading false", async () => {
        jest.spyOn(heroesAPI, "fetchHeroes").mockRejectedValue({});
        await store.dispatch(fetchHeroes(2));
        expect(store.getState()).toEqual({
          heroesReducer: {
            heroes: [],
            loading: false, // <--
            total: 0,
          },
        });
      });
    });

    describe("When store is dispatched with fulfilled fetchHeros", () => {
      it("Then it should update the state with fetched heroes", async () => {
        await store.dispatch(fetchHeroes(2));
        expect(store.getState()).toEqual({
          heroesReducer: {
            heroes: [getHeroMock("Hero 1"), getHeroMock("Hero 2")],
            loading: false,
            total: 2,
          },
        });
      });
    });

    describe("When store is dispatched with fulfilled addHeroes", () => {
      it("Then it should update the state with added heroes", async () => {
        await store.dispatch(addHero(getHeroMock("Hero 3")));
        expect(store.getState()).toEqual({
          heroesReducer: {
            heroes: [getHeroMock("Hero 3")],
            loading: false,
            total: 0,
          },
        });
      });
    });

    describe("When store is dispatched with fulfilled removeHero", () => {
      it("Then it should update the state with removed heroes", async () => {
        // Add hero to the state
        await store.dispatch(addHero(getHeroMock("Hero 3")));

        // Check if the hero exists in the state
        expect(
          store
            .getState()
            .heroesReducer.heroes.find((hero) => hero.id === "Hero 3")
        ).toBeDefined();

        // Remove the hero
        await store.dispatch(removeHero("Hero 3"));

        // Check if the hero is removed
        expect(
          store
            .getState()
            .heroesReducer.heroes.find((hero) => hero.id === "Hero 3")
        ).toBeUndefined();
      });
    });
  });
});
