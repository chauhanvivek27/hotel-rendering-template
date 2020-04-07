import { setUrlParams } from "./util";

describe("Check the Request Url", () => {
  it("If only city passed", () => {
    const url = setUrlParams({
      city: "dubai",
      hotelname: "",
      pricerange: "",
      daterange: "",
    });
    expect(url).toEqual("http://localhost:3000/gethotels?city=dubai");
  });

  it("If only city and Hotel name passed", () => {
    const url = setUrlParams({
      city: "dubai",
      hotelname: "Le Merdian",
      pricerange: "",
      daterange: "",
    });
    expect(url).toEqual(
      "http://localhost:3000/gethotels?city=dubai&hotelname=Le%20Merdian"
    );
  });
});
