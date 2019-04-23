import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "./bootstrap.css";

import GreetingScreen from "./components/greetingScreen/greetingScreen.js"

class App extends Component {

  state = {
    xMin : [-40, -35, 15],
    xMax : [20, 15, 25],
    selectedTypeOfEq : "linear",
    xNorm : [],
    xNatur : [],
    m : 3,

  }

  componentDidMount(){
    this.setUpNormValues();
  }

  setUpNormValues = (ifChange="") => {
    let {selectedTypeOfEq} = this.state;
    if(ifChange) (selectedTypeOfEq = ifChange);
    let xNorm = [];

    let xNormLinear = [];
      xNormLinear[0] = [1, 1, 1, 1];
      xNormLinear[1] = [-1, -1, 1, 1];
      xNormLinear[2] = [-1, 1, -1, 1];
      xNormLinear[3] = [-1, 1, 1, -1];

    let xNormInteraction = [];
      xNormInteraction[0] = [1, 1, 1, 1, 1, 1, 1, 1, ];
      xNormInteraction[1] = [-1, -1, -1, -1, 1, 1, 1, 1];
      xNormInteraction[2] = [-1, -1, 1, 1, -1, -1, 1, 1];
      xNormInteraction[3] = [-1, 1, -1, 1, -1, 1, -1, 1];
      // xNorm[4] = [1, 1, -1, -1, -1, -1, 1, 1];
      // xNorm[5] = [-1, 1, -1, 1, -1, 1, -1, 1];
      // xNorm[6] = [-1, 1, -1, 1, -1, 1, -1, 1];
      // xNorm[7] = [-1, 1, -1, 1, -1, 1, -1, 1];
      xNormInteraction[4] = []; xNormInteraction[5] = []; xNormInteraction[6] = []; xNormInteraction[7] = [];
      xNormInteraction[1].forEach((element, index) => {
        xNormInteraction[4][index] = xNormInteraction[2][index] * element;
        xNormInteraction[5][index] = xNormInteraction[3][index] * element;
        xNormInteraction[6][index] = xNormInteraction[2][index] * xNormInteraction[3][index];
        xNormInteraction[7][index] = xNormInteraction[2][index] * xNormInteraction[3][index] * element;
      })

    let xNormQuadric = [];
      xNormQuadric = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] ,
        [-1, -1, -1, -1, 1, 1, 1, 1, -1.73, 1.73, 0, 0, 0, 0, 0], 
        [-1, -1, 1, 1, -1, -1, 1, 1, 0, 0, -1.73, 1.73, 0, 0, 0], 
        [-1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0, 0, -1.73, 1.73, 0] 
      ];
      xNormQuadric[4] = []; xNormQuadric[5] = []; xNormQuadric[6] = []; xNormQuadric[7] = [];
      xNormQuadric[8] = []; xNormQuadric[9] = []; xNormQuadric[10] = []; 
      xNormQuadric[1].forEach((element, index) => {
        xNormQuadric[4][index] = xNormQuadric[2][index] * element;
        xNormQuadric[5][index] = xNormQuadric[3][index] * element;
        xNormQuadric[6][index] = xNormQuadric[2][index] * xNormQuadric[3][index];
        xNormQuadric[7][index] = xNormQuadric[2][index] * xNormQuadric[3][index] * element;
      })
      for(let i = 1; i < 4; i++){
        xNormQuadric[i].forEach((element, index) => {
          xNormQuadric[i + 7][index] = element*element
        })
      }




    if(selectedTypeOfEq === "linear"){
      xNorm = xNormLinear;
    }else if(selectedTypeOfEq === "interaction"){
      xNorm = xNormInteraction;
    }else if(selectedTypeOfEq === "quadric"){
      xNorm = xNormQuadric;
    }
    console.log(xNorm);

    this.setState({
      xNorm
    }, this.setUpNaturValues(xNorm, selectedTypeOfEq))
    
  } 

  setUpNaturValues = (xNorm, ifChange="") => {
    let {selectedTypeOfEq, xMax, xMin} = this.state;
    if(ifChange) (selectedTypeOfEq = ifChange);
    let xNatur = [];

  
    if(selectedTypeOfEq === "linear"){  
      let xNaturLinear = [];
      for( let i = 1; i < 4; i++){
        xNaturLinear[i - 1] = [];
        xNorm[i].forEach((element, index) => {
          (element === 1) ? (xNaturLinear[i - 1][index] = element*xMax[i - 1]) : (xNaturLinear[i - 1][index] = element*xMin[i - 1])
        })
      }
      xNatur = xNaturLinear;
    }

  
    if(selectedTypeOfEq === "interaction"){  
      let xNaturInteraction = [];
      for( let i = 1; i < 4; i++){
        xNaturInteraction[i - 1] = [];
        xNorm[i].forEach((element, index) => {
          (element === 1) ? (xNaturInteraction[i - 1][index] = element*xMax[i - 1]) : (xNaturInteraction[i - 1][index] = element*xMin[i - 1])
        })
      }
      // xNaturInteraction[0] = [1, 1, 1, 1, 1, 1, 1, 1, ];
      // xNaturInteraction[1] = [-1, -1, -1, -1, 1, 1, 1, 1];
      // xNaturInteraction[2] = [-1, -1, 1, 1, -1, -1, 1, 1];
      // xNaturInteraction[3] = [-1, 1, -1, 1, -1, 1, -1, 1];
      // xNorm[4] = [1, 1, -1, -1, -1, -1, 1, 1];
      // xNorm[5] = [-1, 1, -1, 1, -1, 1, -1, 1];
      // xNorm[6] = [-1, 1, -1, 1, -1, 1, -1, 1];
      // xNorm[7] = [-1, 1, -1, 1, -1, 1, -1, 1];
      xNaturInteraction[3] = []; xNaturInteraction[4] = []; xNaturInteraction[5] = []; xNaturInteraction[6] = [];
      xNaturInteraction[0].forEach((element, index) => {
        xNaturInteraction[3][index] = xNaturInteraction[1][index] * element;
        xNaturInteraction[4][index] = xNaturInteraction[2][index] * element;
        xNaturInteraction[5][index] = xNaturInteraction[1][index] * xNaturInteraction[2][index];
        xNaturInteraction[6][index] = xNaturInteraction[2][index] * xNaturInteraction[1][index] * element;
      })
      xNatur = xNaturInteraction;
    }



    if(selectedTypeOfEq === "quadric"){
      let xNaturQuadric = [];
      const xAverage = [];
      const delta = [];

      for(let i = 0; i < 3; i++){
        xAverage[i] = (xMax[i] + xMin[i])/2;
        delta[i] = xMax[i] - xAverage[i];
      }
      

        for( let i = 1; i < 4; i++){
          xNaturQuadric[i - 1] = []
          for(let j = 0; j < 8; j++){
            (xNorm[i][j] === 1) ? 
            (xNaturQuadric[i - 1][j] = xNorm[i][j]*xMax[i - 1]) : (xNaturQuadric[i - 1][j] = xNorm[i][j]*xMin[i - 1])
          }
        }
        for( let i = 0; i < 3; i++){
          for( let j = 8; j < 14; j++){
            xNaturQuadric[i][j] = xAverage[i];
          }
        } 

        xNaturQuadric[0][8] = xNorm[1][8]*delta[0] + xAverage[0];
        xNaturQuadric[0][9] = xNaturQuadric[0][8];
        xNaturQuadric[0][8] = xNorm[1][8]*delta[0] + xAverage[0];
        xNaturQuadric[0][9] = xNaturQuadric[0][8];
        xNaturQuadric[0][8] = xNorm[1][8]*delta[0] + xAverage[0];
        xNaturQuadric[0][9] = xNaturQuadric[0][8];

        xNaturQuadric[3] = []; xNaturQuadric[4] = []; xNaturQuadric[5] = []; xNaturQuadric[6] = [];
        xNaturQuadric[7] = []; xNaturQuadric[8] = []; xNaturQuadric[9] = []; 
        xNaturQuadric[0].forEach((element, index) => {
          xNaturQuadric[3][index] = xNaturQuadric[1][index] * element;
          xNaturQuadric[4][index] = xNaturQuadric[2][index] * element;
          xNaturQuadric[5][index] = xNaturQuadric[1][index] * xNaturQuadric[2][index];
          xNaturQuadric[6][index] = xNaturQuadric[1][index] * xNaturQuadric[2][index] * element;
        })
        for(let i = 0; i < 3; i++){
          xNaturQuadric[i].forEach((element, index) => {
            xNaturQuadric[i + 7][index] = element*element
          })
        }
        xNatur = xNaturQuadric;
      }
      console.log(xNatur);
      this.setState({
        xNatur
      })  
  }


  handleTypeChange = (event) => {
    this.setState({
      selectedTypeOfEq : event.target.value
  }, this.setUpNormValues(event.target.value))
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
          </a>
        </header> */}
        <GreetingScreen handleTypeChange={(event) => this.handleTypeChange(event)} selectedType={this.state.selectedTypeOfEq}/>

      </div>
    );
  }
}

export default App;
