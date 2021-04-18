import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NotFound from "../../components/NotFound/NotFound";
import store from "../../redux/store";
import { WrappedComponent } from "../../App";

describe("Component - <NotFound/>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <WrappedComponent store={store}>
        <NotFound />
      </WrappedComponent>
    );
  });

  describe("Given the NotFound is rendered", () => {
    it("Then it should display heading", () => {
      expect(screen.getByText("OOPS!", { selector: "h1" })).toBeInTheDocument();
    });

    it("Then it should display paragraph", () => {
      expect(
        screen.getByText(`We can't find the page you're looking for.`, {
          selector: "p",
        })
      ).toBeInTheDocument();
    });

    it("Then it should display button", () => {
      expect(screen.getByText("Visit homepage")).toBeInTheDocument();
    });
  });
});
