import React from "react";
import { mount } from "enzyme";
import { renderToJson } from "enzyme-to-json";
import Hotel from "./index";

describe("Header Render test", () => {
  let wrapper;

  it("should render correctly", () => {
    wrapper = mount(<Hotel />);
    expect(renderToJson(wrapper.render())).toMatchSnapshot();
  });
});
