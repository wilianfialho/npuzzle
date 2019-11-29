import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class CarDetail extends Component {
  state = {};

  render() {
    let { carId } = this.props.match.params;
    return (
      <div>
        <h1>Car detail</h1>
        <strong>Car id: </strong>
        {carId}
        <br></br>
        <Link to="/cars">Go back</Link>
      </div>
    );
  }
}

export default withRouter(CarDetail);
