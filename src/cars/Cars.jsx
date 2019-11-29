import React, { Component } from "react";
import CarsTable from "./Table";
import { Switch, Route, withRouter } from "react-router-dom";
import FormNew from "./FormNew";

class Cars extends Component {
  state = {
    carsData: []
  };

  componentDidMount() {
    fetch("http://localhost:3300/api/cars")
      .then(res => res.json())
      .then(data => {
        this.setState({
          carsData: data
        });
        console.log(data);
      })
      .catch(console.log);
  }

  render() {
    const { match } = this.props;
    return (
      <div>
        <br></br>
        <br></br>
        <h3>Cars</h3>
        <CarsTable
          className="Table"
          carsData={this.state.carsData}
          handleDelete={this.removeCar}
          handleEdit={this.editCar}
          addCar={this.addCar}
        />
        <br></br>
        <br></br>
        <Switch>
          <Route path={`${match.url}/form-new`}>
            <h4>Add new car</h4>
            <FormNew
              routeToCars={this.routeToCars}
              submitHandler={this.submitHandler}
            />
          </Route>
        </Switch>
      </div>
    );
  }

  routeToCars = () => {
    const { match, history } = this.props;
    history.push(`${match.url}`);
  };

  submitHandler = car => {
    this.state.carsData.push(car);
  };

  editCar = index => {
    const { match, history } = this.props;
    const { carsData } = this.state;
    history.push(`${match.url}/form-edit/` + carsData[index]._id);
  };

  removeCar = index => {
    // TODO: Remove from DOM after deleting from DB

    const { carsData } = this.state;
    this.removeCarFromDb(carsData[index]._id);
    this.setState({
      carsData: carsData.filter((car, i) => {
        return i !== index;
      })
    });
  };

  // TO DO
  removeCarFromDb = objectId => {
    fetch("http://localhost:3300/api/cars/" + objectId, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    }).then(response => response.json());
  };

  addCar = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/form-new`);
  };
}

export default withRouter(Cars);
