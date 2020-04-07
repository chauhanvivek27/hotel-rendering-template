import React from "react";
import { mount } from "enzyme";
import { renderToJson } from "enzyme-to-json";
import Header from "./index";

describe("Header Render test", () => {
  let wrapper;

  it("should render correctly", () => {
    wrapper = mount(<Header />);
    expect(renderToJson(wrapper.render())).toMatchSnapshot();
  });
});
