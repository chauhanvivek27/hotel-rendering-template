const apiGetURL = process.env.API_URL || "http://localhost:3000/gethotels";
module.exports = {
  setUrlParams: (Params) => {
    let Url = apiGetURL;
    const filterKeys = Object.keys(Params);
    filterKeys.forEach((key) => {
      if (Params[key]) {
        Url += Url.includes("?")
          ? `&${key}=${encodeURIComponent(Params[key])}`
          : `?${key}=${encodeURIComponent(Params[key])}`;
      }
    });
    return Url;
  },
};
