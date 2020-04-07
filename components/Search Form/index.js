import React, { Fragment } from "react";
import axios from "axios";
import SearchResult from "../Search Result";
const BLOCKNAME = "hotel-search";
import { FormErrors } from "./FormErrors";
import { setUrlParams } from "./../../common/util.js";
import { HOTEL } from "./constant";

const HOTEL_ENUM = {
  HOTELNAME: "name",
  CITY: "city",
  DATERANGE: "dateRange",
  PRICERANGE: "priceRange",
};

export default class SearchForm extends React.Component {
  state = {
    city: "",
    name: "",
    dateRange: "",
    priceRange: "",
    hotelList: [],
    formErrors: { city: "", name: "", priceRange: "", dateRange: "" },
    cityValid: false,
    nameValid: false,
    priceRangeValid: false,
    dateRangeValid: false,
    formValid: false,
    showErrorMessage: true,
    errorResponseMessage: "",
    submit: false,
  };

  handleChange = (inputName) => (event) => {
    const { value } = event.target;
    this.setState(
      {
        [inputName]: value,
      },
      () => {
        this.validateField(inputName, value);
      }
    );
  };

  /**
   * Set the state of Form Validation.
   * @param {fieldName} x Input field Name.
   * @param {value} n Value of input field.
   */
  validateField(fieldName, value) {
    let { cityValid, nameValid, dateRangeValid, priceRangeValid } = this.state;
    const { city, name, priceRange, dateRange } = this.state;
    this.setState({
      showErrorMessage: city || name || priceRange || dateRange,
    });
    let fieldValidationErrors = this.state.formErrors;

    switch (fieldName) {
      case "city":
        cityValid = value.match(/^[a-zA-Z]+[a-zA-Z\s]*$/i);
        fieldValidationErrors.city = cityValid
          ? ""
          : value === ""
          ? ""
          : ` ${HOTEL.ERROR_MSG_INPUT_FIELD}`;
        break;
      case "name":
        nameValid = value.match(/^[a-zA-Z]+[a-zA-Z\s]*$/i);
        fieldValidationErrors.name = nameValid
          ? ""
          : value === ""
          ? ""
          : ` ${HOTEL.ERROR_MSG_INPUT_FIELD}`;
        break;
      case "dateRange":
        dateRangeValid = this.ValidateDate(value);
        fieldValidationErrors.dateRange = dateRangeValid
          ? ""
          : value === ""
          ? ""
          : ` ${HOTEL.ERROR_MSG_DATE_FIELD}`;
        break;
      case "priceRange":
        priceRangeValid = value.match(/^\$\d+[.]?\d{1,2}\:\$\d+[.]?\d{1,2}$/i);
        fieldValidationErrors.priceRange = priceRangeValid
          ? ""
          : value === ""
          ? ""
          : ` ${HOTEL.ERROR_MSG_PRICE_FIELD}`;
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        cityValid,
        nameValid,
        dateRangeValid,
        priceRangeValid,
      },
      this.validateForm
    );
  }

  ValidateDate(dateRange) {
    if (dateRange.includes(":")) {
      const dates = dateRange.split(":");
      if (
        dates[0].match(
          /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/i
        ) &&
        dates[1].match(
          /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$$/i
        )
      ) {
        return "correct";
      }
    } else {
      return "";
    }
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.cityValid ||
        this.state.nameValid ||
        this.state.priceRangeValid ||
        this.state.dateRangeValid,
    });
  }

  /**
   * Call the Hotel Search API.
   */

  fetchhotelList = () => {
    const { city, name, priceRange, dateRange } = this.state;
    const url = setUrlParams({
      city: city,
      hotelname: name,
      pricerange: priceRange,
      daterange: dateRange,
    });
    return axios
      .get(url)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        this.setState({
          errorResponseMessage: HOTEL.ERROR_MSG_NETWORK,
        });
      });
  };

  onSubmit = async () => {
    const { city, name, priceRange, dateRange, formValid } = this.state;
    this.setState({
      submit: true,
    });
    if (formValid) {
      const dataList = await this.fetchhotelList();
      if (dataList) {
        this.setState({
          hotelList: dataList,
        });
      }
    } else {
      this.setState({
        showErrorMessage: city || name || priceRange || dateRange,
      });
    }
  };

  render() {
    const {
      city,
      name,
      priceRange,
      dateRange,
      hotelList,
      showErrorMessage,
      errorResponseMessage,
      submit,
    } = this.state;
    return (
      <Fragment>
        <div className={`${BLOCKNAME}__divsection`}>
          {!showErrorMessage && (
            <span className="error"> {HOTEL.ERROR_MSG_ANY_FIELD} </span>
          )}
          {errorResponseMessage && (
            <span className="error"> {errorResponseMessage} </span>
          )}
          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
          <div className={`${BLOCKNAME}__field-row`}>
            <div className="input-field">
              <input
                id="txtCity"
                type="text"
                value={city}
                onChange={this.handleChange(HOTEL_ENUM.CITY)}
                placeholder="City"
              />
              <label for="txtCity" className="topLabel">
                City
              </label>
            </div>
            <div className="input-field">
              <input
                id="txtName"
                type="text"
                value={name}
                onChange={this.handleChange(HOTEL_ENUM.HOTELNAME)}
                placeholder="Hotel Name"
              />
              <label for="txtName" className="topLabel">
                Hotel Name
              </label>
            </div>
          </div>
          <div className={`${BLOCKNAME}__field-row`}>
            <div className="input-field">
              <input
                id="txtPriceRange"
                type="text"
                value={priceRange}
                onChange={this.handleChange(HOTEL_ENUM.PRICERANGE)}
                placeholder="Price Range"
              />
              <label for="txtPriceRange" className="topLabel">
                Price Range
              </label>
            </div>
            <div className="input-field">
              <input
                id="txtDateRange"
                type="text"
                value={dateRange}
                onChange={this.handleChange(HOTEL_ENUM.DATERANGE)}
                placeholder="Date Range"
              />
              <label for="txtDateRange" className="topLabel">
                Date Range
              </label>
            </div>
          </div>
          <div className="btndiv">
            <input
              type="submit"
              value="Search"
              className="btnsumbit"
              onClick={this.onSubmit}
            />
          </div>
        </div>
        <div className={`${BLOCKNAME}__record-msg`}>
          {hotelList.length > 0 ? (
            <SearchResult hotelList={hotelList} />
          ) : (
            submit && <span className="error"> No Record found </span>
          )}
        </div>
      </Fragment>
    );
  }
}
