import React from "react";
import "@testing-library/jest-dom";
import {
  waitForElementToBeRemoved,
  fireEvent,
  prettyDOM,
  render,
  screen,
} from "@testing-library/react";
import store from "../../redux/store";
import { WrappedComponent } from "../../App";
import HeroModal from "../../components/HeroList/HeroModal/HeroModal";

const getHeroMock = (name) => ({
  avatar_url: "some_url",
  type: { name },
  full_name: `Full ${name}`,
  description:
    "Full description about the hero, should be pretty long to test everything out",
});

const renderModal = (hero) => {
  render(
    <WrappedComponent store={store}>
      <HeroModal hero={hero} onOk={onOkSpy} onCancel={onCancelSpy} />
    </WrappedComponent>
  );
};

const sampleHero = getHeroMock("Hero 1");
const onOkSpy = jest.fn(async () => sampleHero);
const onCancelSpy = jest.fn();

jest.mock("antd", () => {
  const antd = jest.requireActual("antd");
  const Select = ({ _, onChange }) => {
    return (
      <select onChange={(e) => onChange(e.target.value)}>
        <option role="type_select_option" value="some_type">
          some_type
        </option>
      </select>
    );
  };
  return {
    ...antd,
    Select,
  };
});

describe("Component - <HeroModal/>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Given the HeroModal is rendered with object in hero prop", () => {
    it("Then it should display delete hero button", () => {
      renderModal(sampleHero);
      expect(screen.getByText("Delete hero")).toBeInTheDocument();
    });

    it("Then it should disappear and call onCancel when modal mask is being clicked", () => {
      renderModal(sampleHero);
      document.querySelector(".ant-modal-wrap").click();
      waitForElementToBeRemoved(document.querySelector(".HeroModal")).then(
        () => {
          expect(screen.getByText("Delete hero")).not.toBeInTheDocument();
          expect(onCancelSpy).toHaveBeenCalledTimes(1);
        }
      );
    });

    it("Then it should disappear and call onCancel when modal close button is being clicked", () => {
      renderModal(sampleHero);
      document.querySelector(".ant-modal-close").click();
      waitForElementToBeRemoved(document.querySelector(".HeroModal")).then(
        () => {
          expect(screen.getByText("Delete hero")).not.toBeInTheDocument();
          expect(onCancelSpy).toHaveBeenCalledTimes(1);
        }
      );
    });
  });

  describe("Given the HeroModal is rendered with NEW string in hero prop", () => {
    it("Then it should display save hero button", () => {
      renderModal("NEW");
      expect(screen.getByText("Save")).toBeInTheDocument();
    });

    it("Then it should display disabled save button until the form is filled up", () => {
      renderModal("NEW");
      expect(screen.getByText("Save").closest("button")).toHaveAttribute(
        "disabled"
      );
    });

    it("Then it should enable save button and trigger onOk when button is clicked", () => {
      renderModal("NEW");
      fireEvent.change(screen.getByTestId("avatar_url_input"), {
        target: { value: "some_url" },
      });
      fireEvent.change(screen.getByTestId("full_name_input"), {
        target: { value: "some_name" },
      });
      fireEvent.change(screen.getByText("some_type").closest("select"), {
        target: { value: "some_type" },
      });
      fireEvent.change(screen.getByTestId("description_textarea"), {
        target: { value: "some_description" },
      });
      const saveButton = screen.getByText("Save").closest("button");
      expect(saveButton).not.toHaveAttribute("disabled");
      fireEvent.click(saveButton);
      expect(onOkSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Given the HeroModal is rendered with null in hero prop", () => {
    it("Then it should not be displayed at all", () => {
      renderModal(null);
      expect(screen.queryByText("Delete hero")).not.toBeInTheDocument();
      expect(screen.queryByText("Save")).not.toBeInTheDocument();
    });
  });
});
