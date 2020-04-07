import React from "react";
import data from "../../mock/data.json";
import { mount } from "enzyme";
import { renderToJson } from "enzyme-to-json";
import SearchForm from "./index";
import axios from "axios";

jest.mock("axios");

describe("Search Form Test", () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    axios.get.mockResolvedValue(data);
    wrapper = mount(<SearchForm />);
    instance = wrapper.find("SearchForm").instance();
  });

  it("should render correctly", () => {
    expect(renderToJson(wrapper.render())).toMatchSnapshot();
  });

  it("OnChanges on form iput field", () => {
    wrapper.find('input[id="txtDateRange"]').prop("onChange")({
      target: { value: "10-03-2020:15-03-2020" },
    });

    expect(instance.state.dateRange).toBe("10-03-2020:15-03-2020");

    wrapper.find('input[id="txtPriceRange"]').prop("onChange")({
      target: { value: "$80:$100" },
    });
    expect(instance.state.priceRange).toBe("$80:$100");

    wrapper.find('input[id="txtName"]').prop("onChange")({
      target: { value: "Media One Hotel" },
    });
    expect(instance.state.name).toBe("Media One Hotel");

    wrapper.find('input[id="txtCity"]').prop("onChange")({
      target: { value: "Dubai" },
    });
    expect(instance.state.city).toBe("Dubai");
  });

  it("Error input fields", () => {
    wrapper.find('input[id="txtDateRange"]').prop("onChange")({
      target: { value: "10-03-2020-15-03-2020" },
    });
  });

  it("fetches the data from API", async () => {
    expect(instance.fetchhotelList());
    wrapper.setState({ formValid: false });
    expect(instance.onSubmit());
  });

  it("fetches erroneously data from an API", async () => {
    const errorMessage = "Network Error";
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
    expect(instance.fetchhotelList());
  });

  it("Form validation failed", async () => {
    wrapper.setState({ formValid: true });
    expect(instance.onSubmit());
  });
});
