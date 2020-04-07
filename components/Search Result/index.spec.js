import React from "react";
import data from "../../mock/data.json";
import { mount } from "enzyme";
import { renderToJson } from "enzyme-to-json";
import SearchResult from "./index";

describe("Search Result test", () => {
  let wrapper;

  it("should render correctly", () => {
    wrapper = mount(<SearchResult hotelList={data.data.hotels} />);
    expect(renderToJson(wrapper.render())).toMatchSnapshot();
  });
});
