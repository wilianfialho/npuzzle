import React, { Component } from "react";

class RatingForm extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = { game: "nPuzzle", stars: "" };

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
    event.preventDefault();
    this.addRatingToDb();
  };

  cancelHandler = () => {
    this.props.routeToNPuzzle();
  };

  addRatingToDb = () => {
    fetch("http://localhost:3300/api/rating", {
      method: "POST",
      body: JSON.stringify({
        game: this.state.game,
        stars: this.state.stars
      }),
      headers: {
        "Content-type": "application/json"
      }
    }).then(response => {
      this.props.submitHandler(this.state);
      this.props.routeToNPuzzle();
      console.log(response.json());
      //return response.json();
    });
  };

  setStars(event) {
    this.setState({
      stars: event.target.value
    });
  }

  render() {
    return (
      <div className="mb-5">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Game:</label>
            <input
              className="form-control"
              type="text"
              name="game"
              value={this.state.game}
              disabled
            />
          </div>
          <div className="form-group" onChange={this.setStars.bind(this)}>
            <input type="radio" value="1" name="stars" /> 1*
            <input type="radio" value="2" name="stars" /> 2*
            <input type="radio" value="3" name="stars" /> 3*
            <input type="radio" value="4" name="stars" /> 4*
            <input type="radio" value="5" name="stars" /> 5*
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

export default RatingForm;
