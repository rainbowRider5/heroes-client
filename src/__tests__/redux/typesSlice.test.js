import { configureStore } from "@reduxjs/toolkit";

import typesAPI from "../../redux/slices/types/typesAPI";
import typesReducer, { fetchTypes } from "../../redux/slices/types/typesSlice";

let store;

const getTypeMock = (name) => ({
  id: `${name}_id`,
  name,
});

describe("Redux - types slice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = configureStore({
      reducer: { typesReducer },
    });
    jest.spyOn(typesAPI, "fetchTypes").mockResolvedValue({
      data: [getTypeMock("Type 1"), getTypeMock("Type 2")],
    });
  });

  describe("Given the types store redux", () => {
    it("Then it should contain initial store", () => {
      expect(store.getState()).toEqual({
        typesReducer: {
          types: [],
          loading: false,
        },
      });
    });

    describe("When store is dispatched with pending fetchTypes", () => {
      it("Then it should contain loading true", () => {
        // There is no await so we know it won't wait for the fulfilled response here
        store.dispatch(fetchTypes());
        expect(store.getState()).toEqual({
          typesReducer: {
            types: [],
            loading: true, // <--
          },
        });
      });
    });

    describe("When store is dispatched with rejected fetchTypes", () => {
      it("Then it should contain previous store and loading false", async () => {
        jest.spyOn(typesAPI, "fetchTypes").mockRejectedValue({});
        await store.dispatch(fetchTypes());
        expect(store.getState()).toEqual({
          typesReducer: {
            types: [],
            loading: false,
          },
        });
      });
    });

    describe("When store is dispatched with fulfilled fetchTypes", () => {
      it("Then it should update the state with fetched types", async () => {
        await store.dispatch(fetchTypes());
        expect(store.getState()).toEqual({
          typesReducer: {
            types: [getTypeMock("Type 1"), getTypeMock("Type 2")],
            loading: false,
          },
        });
      });
    });
  });
});
