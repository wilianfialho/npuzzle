import React, { Component } from "react";

export default class Comments extends Component {
  state = {
    commentsData: []
  };

  componentDidMount() {
    fetch("http://localhost:3300/api/comments")
      .then(res => res.json())
      .then(data => {
        this.setState({
          commentsData: data
        });
        console.log(data);
      })
      .catch(console.log);
  }

  render() {
    return (
      <div>
        <br></br>
        <br></br>
        <h3>Comments</h3>
        <table className="table">
          <CommentsTableHeader />
          <CommentsTableBody commentsData={this.state.commentsData} />
        </table>
        <button onClick={() => this.props.addComment()}>Add comment</button>
        <br></br>
        <br></br>
      </div>
    );
  }
}

function CommentsTableHeader() {
  return (
    <thead>
      <tr>
        <th>Player</th>
        <th>Description</th>
        <th>Date</th>
      </tr>
    </thead>
  );
}

function CommentsTableBody({ commentsData }) {
  const rows = commentsData.map((comment, index) => (
    <tr key={index}>
      <td>{comment.player}</td>
      <td>{comment.description}</td>
      <td>{comment.date}</td>
    </tr>
  ));
  return <tbody>{rows}</tbody>;
}
