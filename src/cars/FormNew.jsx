import React, { Component } from "react";

class FormNew extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = { brand: "", vehicleId: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    this.addCarToDb();
    this.props.submitHandler(this.state);
    event.preventDefault();
    this.props.routeToCars();
  };

  cancelHandler = () => {
    this.props.routeToCars();
  };

  addCarToDb = () => {
    fetch("http://localhost:3300/api/cars", {
      method: "POST",
      body: JSON.stringify({
        brand: this.state.brand,
        vehicleId: this.state.vehicleId
      }),
      headers: {
        "Content-type": "application/json"
      }
    }).then(response => {
      console.log(response.json());
      //return response.json();
    });
  };

  render() {
    return (
      <div className="mb-5">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Brand:</label>
            <input
              className="form-control"
              type="text"
              name="brand"
              value={this.state.brand}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Vehicle Id:</label>
            <input
              className="form-control"
              type="text"
              name="vehicleId"
              value={this.state.vehicleId}
              onChange={this.handleChange}
            />
          </div>
          <button
            className="btn btn-primary mr-2"
            type="button"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={this.cancelHandler}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export default FormNew;
