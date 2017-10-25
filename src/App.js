import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProdutoPagina from './produto/ProdutoPagina';
import Principal from './Principal';

class App extends Component {
  render() {
      return <Principal/>;
      /*
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        <ProdutoPagina nome="Carlos" />
        </p>
      </div>
    );*/
  }
}

export default App;
