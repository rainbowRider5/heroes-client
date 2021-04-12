import React from "react";
import { render } from "@testing-library/react";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import HeroModal from "../components/HeroList/HeroModal/HeroModal";

const hero = {
  full_name: "The Cactus",
  description:
    "Quisque diam sapien, euismod sed ornare feugiat, vulputate nec tellus.",
  id: "cknbtpcpg00ch0887eroc1szd",
  type: {
    id: "cknbtpcnr00b408870x6qbzv2",
    name: "Plant",
  },
  avatar_url: "http://localhost:4000/assets/cactus.png",
};

const handleCancel = jest.fn();

const heroModalDetails = (
  <Provider store={store}>
    <BrowserRouter>
      <HeroModal hero={hero} onCancel={handleCancel} />
    </BrowserRouter>
  </Provider>
);

const heroModalNew = (
  <Provider store={store}>
    <BrowserRouter>
      <HeroModal hero={"NEW"} onCancel={handleCancel} />
    </BrowserRouter>
  </Provider>
);

test("Modal pops up in details mode when hero is provided", () => {
  const { getByText } = render(heroModalDetails);
  getByText("Delete hero");
});

test("Modal pops up in creation mode when keyword NEW is provided", () => {
  const { getByText } = render(heroModalNew);
  getByText("Save");
});

test("Modal dissapears when user clicks on mask or cross", async () => {
  render(heroModalDetails);
  document.querySelector(".ant-modal-wrap").click();
  render(heroModalDetails);
  document.querySelector(".ant-modal-close-icon").click();
  expect(handleCancel).toHaveBeenCalledTimes(2);
});
