import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class FormEdit extends Component {
  state = { brand: "", vehicleId: "" };
  constructor(props) {
    super(props);
    // this.state = { brand: "", vehicleId: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let { carId } = this.props.match.params;
    fetch("http://localhost:3300/api/cars/" + carId)
      .then(res => res.json())
      .then(data => {
        this.setState({
          brand: data.brand,
          vehicleId: data.vehicleId
        });
        console.log(this.state);
      })
      .catch(console.log);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    this.editCarInDb();
    //todo: edit car locally in table after submit
    // this.props.submitHandler(this.state);
    event.preventDefault();
  };

  editCarInDb = () => {
    let { carId } = this.props.match.params;
    fetch("http://localhost:3300/api/cars/" + carId, {
      method: "PUT",
      body: JSON.stringify({
        brand: this.state.brand,
        vehicleId: this.state.vehicleId
      }),
      headers: {
        "Content-type": "application/json"
      }
    }).then(response => response.json());
    //todo: route to cars
    //   .then(response => this.props.routeToCars());
  };

  render() {
    let { carId } = this.props.match.params;
    return (
      <div className="mb-5">
        <br></br>
        <h4>Edit car {carId} </h4>
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Brand:</label>
            <input
              className="form-control"
              type="text"
              name="brand"
              value={this.state.brand}
              placeholder={this.state.brand}
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
        </form>
        <br></br>
        <Link to="/cars">Cancel</Link>
      </div>
    );
  }
}

export default withRouter(FormEdit);
