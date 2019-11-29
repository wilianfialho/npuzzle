import React, { Component } from "react";
import FieldComponent from "./Field";
import { Field, GameStateEnum } from "./Core";
import GameState from "./GameState";
import Score from "./Score";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { Switch, Route, withRouter } from "react-router-dom";

class Minesweeper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      field: new Field(10, 10, 10)
    };
  }

  render() {
    const { field } = this.state;
    const { match } = this.props;
    return (
      <div>
        <h1>Minesweeper</h1>
        <GameState
          gameState={field.gameState}
          handleNewGame={this.handleNewGame}
        />
        <Switch>
          <Route path={`${match.path}/score`}>
            <Score />
          </Route>
          <Route path={`${match.path}/comment-form`}>
            <CommentForm routeToMinesweeper={this.routeToMinesweeper} />
          </Route>
          <Route path={`${match.path}/`}>
            <FieldComponent
              field={field}
              handleOpen={this.handleOpen}
              handleMark={this.handleMark}
            />
            <Comments addComment={this.addComment} />
          </Route>
        </Switch>
      </div>
    );
  }

  handleOpen = (row, col) => {
    const { field } = this.state;
    field.openTile(row, col);
    this.setState({ field: field });
    if (field.gameState === GameStateEnum.WON) {
      this.addScoreToDb();
    } else if (field.gameState === GameStateEnum.LOST) {
      this.routeToScores();
    }
  };

  routeToScores = () => {
    const { match, history } = this.props;
    history.push(`${match.url}/score`);
  };

  routeToMinesweeper = () => {
    const { match, history } = this.props;
    history.push(`${match.url}`);
  };

  addScoreToDb() {
    fetch("http://localhost:3300/api/scores", {
      method: "POST",
      body: JSON.stringify({
        player: "Marek",
        points: Math.floor(Math.random(100))
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => this.routeToScores());
  }

  addComment = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/comment-form`);
  };

  handleMark = (row, col) => {
    const { field } = this.state;
    field.markTile(row, col);
    this.setState({ field: field });
  };

  handleNewGame = () => {
    const { history, match } = this.props;
    this.setState({ field: new Field(10, 10, 10) });
    history.push(`${match.url}`);
  };
}

export default withRouter(Minesweeper);
