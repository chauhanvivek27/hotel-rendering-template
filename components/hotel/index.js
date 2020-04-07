import React from "react";
import "./hotel.scss";
import Header from "../header/index";
import SearchForm from "../Search Form/index";

const BLOCKNAME = "hotel-search";

export default class Hotel extends React.Component {
  render() {
    return (
      <div className={`${BLOCKNAME}`}>
        <Header />
        <SearchForm />
      </div>
    );
  }
}
