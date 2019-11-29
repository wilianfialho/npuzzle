import React, { Component } from "react";
import { Link } from "react-router-dom";

const CarsTableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Brand</th>
        <th>Vehicle ID</th>
      </tr>
    </thead>
  );
};

const CarsTableBody = ({ carsData, handleDelete, handleEdit }) => {
  const rows = carsData.map((cars, index) => (
    <tr key={index}>
      <td>{cars.brand}</td>
      <td>{cars.vehicleId}</td>
      <td>
        <Link to={"/cars/car-detail/" + cars._id}>Detail</Link>
      </td>
      <td>
        <button
          className="btn btn-secondary mr-1"
          onClick={e => {
            e.stopPropagation();
            handleDelete(index);
          }}
        >
          Delete
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={e => {
            e.stopPropagation();
            handleEdit(index);
          }}
        >
          Edit
        </button>
      </td>
    </tr>
  ));
  return <tbody>{rows}</tbody>;
};

class Table extends Component {
  state = {};
  render() {
    const { carsData, handleDelete, handleEdit } = this.props;
    return (
      <div>
        <table className="table">
          <CarsTableHeader />
          <CarsTableBody
            carsData={carsData}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </table>
        <button onClick={() => this.props.addCar()}>Add car</button>
      </div>
    );
  }
}

export default Table;
