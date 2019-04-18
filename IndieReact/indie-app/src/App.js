import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
          <p>this is the header</p>
          <Game />
        </div>
        
      </div>
    );
  }
}
let yeet = "this bitch empty";
let returndata = "no";

function search() {
    returndata = window.Itch.getGameData({ user: "leafo", game: "x-moon", onComplete: function(data){}});
    //second log
    // console.log("Returndata: " + returndata);
    for(let i = 0; i < 1000; i++){
      console.log("Returndata: " + returndata);
    }
    
    return returndata;
}

//calls search
let results = search();

//3rd and 4rth
console.log("printing");
console.log("\""+results+"\"");


class Game extends Component{
  render(){
    return(
      <div className="testingStyle">
        <p>{yeet}</p>
        <p>{results}</p>
      </div>
      
    );
  }
}
export default App;
