import React from 'react';
import './App.css';
import Table from './components/Table';

const appStyle = {marginTop: '70px'}

function App() {
  const str = 'React';
  return (
    <div className="App" style={appStyle}>
      <h1>Hello {str} World!</h1>
      <button className="btn btn-primary">Stlac ma</button>
      <Table className="Table" />
    </div>
  );
}

export default App;
