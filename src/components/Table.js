import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Table.css";

const TableHeader = () => {
  return (
    <thead style={{ fontWeight: "bold" }}>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Job</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
  );
};

// const TableBody = (props) => {
// const { charData, handleDelete } = props

const TableBody = ({ charData, handleDelete }) => {
  const history = useHistory();

  function handleClick(character) {
    history.push("/character/character-detail/" + character.name);
  }

  const rows = charData.map((character, index) => (
    <tr
      className="character-table-row"
      key={index}
      onClick={() => handleClick(character)}
    >
      <td>
        <Link to={"/character/character-detail/" + character.name}>
          {character.name}
        </Link>
      </td>
      <td>{character.job}</td>
      <td>
        <button
          className="btn btn-secondary"
          onClick={e => {
            e.stopPropagation();
            handleDelete(index);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return <tbody>{rows}</tbody>;
};

export default class Table extends Component {
  state = {};

  shouldComponentUpdate(nextProps, nextState) {
    console.log("   should update in table");
    return true;
  }

  //robi sa vzdy ked sa zmenia props a chcem si ich ulozit do this.state - bude deprecated!
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("   state => props");
    return prevState;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("   right before render");
    return prevState;
  }

  componentDidUpdate(previousProps, previousState, snapshot) {
    console.log("   after render");
  }

  render() {
    const { charactersData, handleDelete } = this.props;

    return (
      <div>
        <table className="table">
          <TableHeader />
          <TableBody charData={charactersData} handleDelete={handleDelete} />
        </table>
      </div>
    );
  }
}
