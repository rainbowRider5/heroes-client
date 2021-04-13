import React from "react";
import { shallow } from "enzyme";
import store from "../redux/store";
import HeroList from "../components/HeroList/HeroList";

// Couldn't get redux-connected components right
// I should probably mock the store but how to pass it into the shallow?

test("HeroModal should be visible in details mode if provided with hero", () => {
  const wrapper = shallow(<HeroList store={store} />);
  console.log(wrapper.children().dive().find(HeroList).dive().debug());
});
