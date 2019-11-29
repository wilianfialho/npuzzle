import React, { Component } from "react";
import FieldComponent from "./Field";
import { Field } from "./Core";
import GameState from "./GameState";
import { Switch, Route, withRouter } from "react-router-dom";

class Npuzzle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      field: new Field(4, 4),
      avgRating: "",
      rows: 4,
      cols: 4,
      showAllowedRange: false
    };
  }

  componentDidMount() {
    fetch("http://localhost:3300/api/rating")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        console.log("data length:", data.length);
        let avg = "unavailable";
        let total = 0;
        data.forEach(element => {
          total += parseInt(element["stars"]);
        });
        avg = total / data.length;
        let avgRound = Math.round(avg * 100) / 100;
        this.setState({
          avgRating: avgRound
        });
      })
      .catch(console.log);
  }

  setWidth(event) {
    this.setState({
      cols: event.target.value
    });
  }

  setHeight(event) {
    this.setState({
      rows: event.target.value
    });
  }

  handleSubmit = event => {
    const { rows, cols } = this.state;
    if (rows < 2 || rows > 12 || cols < 2 || cols > 12) {
      this.setState({
        showAllowedRange: true
      });
    } else {
      event.preventDefault();
      console.log("handling set dimensions", rows, cols);
      this.setState({
        showAllowedRange: false
      });
      this.handleNewGame(rows, cols);
    }
  };

  render() {
    const { field } = this.state;
    const { match } = this.props;
    return (
      <div>
        <h1>nPuzzle</h1>
        <GameState
          gameState={field.gameState}
          handleNewGame={this.handleNewGame}
          rows={this.state.rows}
          cols={this.state.cols}
          handleRating={this.routeToRating}
        />
        <Switch>
          <Route path={`${match.path}/`}>
            <br></br>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Width:</label>
                <input
                  className="form-control"
                  type="number"
                  min="2"
                  max="12"
                  name="width"
                  value={this.state.cols}
                  onChange={this.setWidth.bind(this)}
                />
              </div>
              <div className="form-group">
                <label>Height:</label>
                <input
                  className="form-control"
                  type="number"
                  min="2"
                  max="12"
                  name="height"
                  value={this.state.rows}
                  onChange={this.setHeight.bind(this)}
                />
              </div>
              <div>{this.state.showAllowedRange ? <AllowedRange /> : null}</div>
              <button
                className="btn btn-primary mr-2"
                type="button"
                onClick={this.handleSubmit}
              >
                Set dimensions
              </button>
            </form>
            <FieldComponent field={field} handleClick={this.handleClickTile} />
            <br></br>
            <button
              className="btn btn-outline-secondary"
              onClick={() => this.handleShuffle(10)}
            >
              Shuffle
            </button>
          </Route>
        </Switch>
        <br></br>
        <br></br>
        <p>Average rating for this game: {this.state.avgRating}</p>
      </div>
    );
  }

  handleClickTile = (row, col) => {
    const { field } = this.state;
    field.clickTile(row, col);
    this.setState({ field: field });
  };

  handleShuffle = swapCount => {
    const { field } = this.state;
    field.shuffle(swapCount);
    this.setState({ field: field });
  };

  handleNewGame = (rows, cols) => {
    const { history, match } = this.props;
    this.setState({ field: new Field(rows, cols) });
    history.push(`${match.url}`);
  };

  routeToRating = () => {
    const { match, history } = this.props;
    history.push(`${match.url}/rating`);
  };
}

function AllowedRange() {
  return <p className="text-danger small">Range must be between 2 and 12!</p>;
}

export default withRouter(Npuzzle);
