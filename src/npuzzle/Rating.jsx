import React, { Component } from "react";
import RatingForm from "./RatingForm";
import { withRouter } from "react-router-dom";

class Rating extends Component {
  state = {
    ratingData: []
  };

  componentDidMount() {
    fetch("http://localhost:3300/api/rating")
      .then(res => res.json())
      .then(data => {
        this.setState({
          ratingData: data
        });
        console.log(data);
      })
      .catch(console.log);
  }

  render() {
    return (
      <div>
        <table className="table">
          <RatingTableHeader />
          <RatingTableBody ratingData={this.state.ratingData} />
        </table>
        <RatingForm
          submitHandler={this.submitHandler}
          routeToNPuzzle={this.routeToNPuzzle}
        ></RatingForm>
      </div>
    );
  }

  routeToNPuzzle = () => {
    const { match, history } = this.props;
    history.goBack();
    console.log("routing", history);
  };

  submitHandler = rating => {
    this.state.ratingData.push(rating);
  };
}

function RatingTableHeader() {
  return (
    <thead>
      <tr>
        <th>Game</th>
        <th>Stars</th>
        <th>Date</th>
      </tr>
    </thead>
  );
}

function RatingTableBody({ ratingData }) {
  const rows = ratingData.map((rating, index) => (
    <tr key={index}>
      <td>{rating.game}</td>
      <td>{rating.stars}</td>
      <td>{rating.date}</td>
    </tr>
  ));
  return <tbody>{rows}</tbody>;
}

export default withRouter(Rating);
