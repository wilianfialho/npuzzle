import React, { Component } from "react";

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { player: "", description: "" };

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
    this.addCommentToDb();
    event.preventDefault();
  };

  cancelHandler = () => {
    this.props.routeToMinesweeper();
  };

  addCommentToDb = () => {
    fetch("http://localhost:3300/api/comments", {
      method: "POST",
      body: JSON.stringify({
        player: this.state.player,
        description: this.state.description
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => this.props.routeToMinesweeper());
  };

  render() {
    return (
      <div className="mb-5">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Player name:</label>
            <input
              className="form-control"
              type="text"
              name="player"
              value={this.state.player}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              className="form-control"
              type="text"
              name="description"
              value={this.state.description}
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
