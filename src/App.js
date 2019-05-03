import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "./bootstrap.css";

import GreetingScreen from "./components/greetingScreen/greetingScreen.js"
import Table from "./components/table/table.js"
// import TableCell from "./components/tableCell/tableCell.js"

class App extends Component {

  state = {
    xMin : [-40, -35, 15],
    xMax : [20, 15, 25],
    selectedLab : 1,
    l : [1.215, 1.73],
    selectedTypeOfEq : 0,
    xNorm : [],
    xNatur : [],
    xNormArray : [],
    xNaturArray : [],
    m : 2,
    yMin : 0,
    yMax : 0,
    yValues : []

  }

  start = () => {
    return (new Promise((resolve, reject) => {
      return (this.state.xNormArray == false && this.state.xNaturArray == false) ? resolve() : null
    }))
  }

  componentDidMount(){
    this.start()
                .then(() => this.setUpNormValues())
                .then(() => this.setUpNaturValues())
                .then(() => this.pickData())
                .then(() => this.generateYValues())

    
    // this.setState({
      // kek : "setState srabotal"
    // }, () => console.log("kek " + this.state.kek));
    // console.log("kek " + this.state.kek)
  }

  setUpNormValues = () => {
    let {l} = this.state;
    
    const xNormLinear = [];
      xNormLinear[0] = [1, 1, 1, 1];
      xNormLinear[1] = [-1, -1, 1, 1];
      xNormLinear[2] = [-1, 1, -1, 1];
      xNormLinear[3] = [-1, 1, 1, -1];

    const xNormInteraction = [];
      xNormInteraction[0] = [1, 1, 1, 1, 1, 1, 1, 1, ];
      xNormInteraction[1] = [-1, -1, -1, -1, 1, 1, 1, 1];
      xNormInteraction[2] = [-1, -1, 1, 1, -1, -1, 1, 1];
      xNormInteraction[3] = [-1, 1, -1, 1, -1, 1, -1, 1];
      // xNorm[4] = [1, 1, -1, -1, -1, -1, 1, 1];
      // xNorm[5] = [-1, 1, -1, 1, -1, 1, -1, 1];
      // xNorm[6] = [-1, 1, -1, 1, -1, 1, -1, 1];
      // xNorm[7] = [-1, 1, -1, 1, -1, 1, -1, 1];
      for(let i = 4; i < 8; i++){
        xNormInteraction[i] = [];
      }
      //  xNormInteraction[5] = []; xNormInteraction[6] = []; xNormInteraction[7] = [];
      xNormInteraction[1].forEach((element, index) => {
        xNormInteraction[4][index] = xNormInteraction[2][index] * element;
        xNormInteraction[5][index] = xNormInteraction[3][index] * element;
        xNormInteraction[6][index] = xNormInteraction[2][index] * xNormInteraction[3][index];
        xNormInteraction[7][index] = xNormInteraction[2][index] * xNormInteraction[3][index] * element;
      })
    
    let xNormQuadric = [ [], [] ];
      for(let i = 0; i < 2; i++){
        xNormQuadric[i] = [
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] ,
          [-1, -1, -1, -1, 1, 1, 1, 1, -l[i], l[i], 0, 0, 0, 0, 0], 
          [-1, -1, 1, 1, -1, -1, 1, 1, 0, 0, -l[i], l[i], 0, 0, 0], 
          [-1, 1, -1, 1, -1, 1, -1, 1, 0, 0, 0, 0, -l[i], l[i], 0] 
        ];
        for(let j = 4; j < 11; j++){
          xNormQuadric[i][j] = [];
        }
        //  xNormQuadric[5] = []; xNormQuadric[6] = []; xNormQuadric[7] = [];
        // xNormQuadric[8] = []; xNormQuadric[9] = []; xNormQuadric[10] = []; 
        xNormQuadric[i][1].forEach((element, index) => {
          xNormQuadric[i][4][index] = xNormQuadric[i][2][index] * element;
          xNormQuadric[i][5][index] = xNormQuadric[i][3][index] * element;
          xNormQuadric[i][6][index] = xNormQuadric[i][2][index] * xNormQuadric[i][3][index];
          xNormQuadric[i][7][index] = xNormQuadric[i][2][index] * xNormQuadric[i][3][index] * element;
        })
        for(let j = 1; j < 4; j++){
          xNormQuadric[i][j].forEach((element, index) => {
            xNormQuadric[i][j + 7][index] = element*element
          })
        }
      }

      xNormQuadric[1].forEach(element => element.pop()) 
      
      
      // const xNormArray = [[xNormLinear, xNormInteraction, xNormQuadric[0]], [xNormLinear, xNormInteraction, xNormQuadric[1]]];

    this.setState({
      xNormArray : [[xNormLinear, xNormInteraction, xNormQuadric[0]], [xNormLinear, xNormInteraction, xNormQuadric[1]]]
    }
    , () => console.log(this.state.xNormArray)
    // , this.setUpNaturValues([xNormLinear, xNormInteraction, xNormQuadric], selectedTypeOfEq)
    )
    
  } 
  // , ifChange=""

  setUpNaturValues = () => {
    let {xMax, xMin, xNormArray} = this.state;

    // if(selectedTypeOfEq === "linear"){  
      let xNaturLinear = [];

      for( let i = 1; i < 4; i++){
        xNaturLinear[i - 1] = [];
        xNormArray[0][0][i].forEach((element, index) => {
          (element === 1) ? (xNaturLinear[i - 1][index] = xMax[i - 1]) : (xNaturLinear[i - 1][index] = xMin[i - 1])
        })
      }
      // xNatur = xNaturLinear;
    // }

  
    // if(selectedTypeOfEq === "interaction"){  
      let xNaturInteraction = [];
      for( let i = 1; i < 4; i++){
        xNaturInteraction[i - 1] = [];
        xNormArray[0][1][i].forEach((element, index) => {
          (element === 1) ? (xNaturInteraction[i - 1][index] = xMax[i - 1]) : (xNaturInteraction[i - 1][index] = xMin[i - 1])
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
      // xNatur = xNaturInteraction;
    // }



    // if(selectedTypeOfEq === "quadric"){
      let xNaturQuadric = [[], []];
      const xAverage = [];
      const delta = [];



      for(let i = 0; i < 3; i++){
        xAverage[i] = (xMax[i] + xMin[i])/2;
        delta[i] = xMax[i] - xAverage[i];
      }
      
      for(let l = 0; l < 2; l++){
        for( let i = 1; i < 4; i++){
          xNaturQuadric[l][i - 1] = []
          for(let j = 0; j < 8; j++){
            (xNormArray[l][2][i][j] === 1) ? 
            (xNaturQuadric[l][i - 1][j] = xMax[i - 1]) : (xNaturQuadric[l][i - 1][j] = xMin[i - 1])
          }
        }
        for( let i = 0; i < 3; i++){
          for( let j = 8; j < ((l == 0) ? 15 : 14); j++){
            xNaturQuadric[l][i][j] = xAverage[i];
          }
        } 

        for(let i = 0; i < 3; i++){
          xNaturQuadric[l][i][i+i + 8] = xNormArray[l][2][i+1][i+i + 8]*delta[i] + xAverage[i];
          xNaturQuadric[l][i][i+i + 9] = -xNaturQuadric[l][i][i+i + 8];
        }

        // xNaturQuadric[l][0][8] = xNormArray[l][2][1][8]*delta[0] + xAverage[0];
        // xNaturQuadric[l][0][9] = xNaturQuadric[l][0][8];
        // xNaturQuadric[l][1][10] = xNormArray[l][2][2][10]*delta[1] + xAverage[1];
        // xNaturQuadric[l][1][11] = xNaturQuadric[l][1][10];
        // xNaturQuadric[l][2][12] = xNormArray[l][2][3][12]*delta[2] + xAverage[2];
        // xNaturQuadric[l][2][13] = xNaturQuadric[l][2][12];

        for( let i = 3; i < 10; i++){
          xNaturQuadric[l][i] = [];
        }
        // xNaturQuadric[l][3] = []; xNaturQuadric[l][4] = []; xNaturQuadric[l][5] = []; xNaturQuadric[l][6] = [];
        // xNaturQuadric[l][7] = []; xNaturQuadric[l][8] = []; xNaturQuadric[l][9] = []; 

        xNaturQuadric[l][0].forEach((element, index) => {
          xNaturQuadric[l][3][index] = xNaturQuadric[l][1][index] * element;
          xNaturQuadric[l][4][index] = xNaturQuadric[l][2][index] * element;
          xNaturQuadric[l][5][index] = xNaturQuadric[l][1][index] * xNaturQuadric[l][2][index];
          xNaturQuadric[l][6][index] = xNaturQuadric[l][1][index] * xNaturQuadric[l][2][index] * element;
        })

        for(let i = 0; i < 3; i++){
          xNaturQuadric[l][i].forEach((element, index) => {
            xNaturQuadric[l][i + 7][index] = element*element
          })
        }
      }


        
        // xNatur = xNaturQuadric;
      // }
      // console.log([xNaturLinear, xNaturInteraction, xNaturQuadric]);
      this.setState({
        xNaturArray : [[xNaturLinear, xNaturInteraction, xNaturQuadric[0]], [xNaturLinear, xNaturInteraction, xNaturQuadric[1]]]
      }
      // , this.pickData(xNormArray, [xNaturLinear, xNaturInteraction, xNaturQuadric], selectedTypeOfEq)
      , () => console.log(this.state.xNaturArray)
      )  
  }

  // pickData = (xNormArrayNotState=[], xNaturArrayNotState=[], selectedTypeOfEqProps=null, selectedLab=null) => {
    pickData = () => {
    // const {selectedTypeOfEq} = this.state;
    let {xNormArray, xNaturArray, selectedTypeOfEq, selectedLab} = this.state;

    // let selectedTypeOfEq;

    // if (selectedTypeOfEqProps === null) {
    //    const {selectedTypeOfEqState} = this.state;
    //    selectedTypeOfEq = selectedTypeOfEqState;
    // } else {
    //   selectedTypeOfEq = selectedTypeOfEqProps;
    // }
    // if(xNormArray == false && xNaturArray == false) {
    //   (xNormArray = xNormArrayNotState);
    //   (xNaturArray = xNaturArrayNotState);
    // }

    const xNorm = xNormArray[selectedLab][selectedTypeOfEq],
          xNatur = xNaturArray[selectedLab][selectedTypeOfEq];
    
          // console.log(xNormArrayNotState);
          // console.log(xNaturArrayNotState);
    // console.log(xNormArray);
    // console.log(xNaturArray);
    console.log("/////////////////////////////////////////////")
    console.log("Selected type = " + selectedTypeOfEq);
    console.log("Selected lab = " + selectedLab);
    console.log(xNorm);
    console.log(xNatur);
    console.log("/////////////////////////////////////////////")
    
    this.setState({
      xNorm,
      xNatur
    })

  }

  generateYValues = () => {
    const {selectedLab, selectedTypeOfEq, m, xMin, xMax, xNatur} = this.state;
    const yValues = [];

    if (!selectedLab) {
      const yMin = 200 + xMin.reduce( (prev, curr) => prev + curr ) / 3;
      const yMax = 200 + xMax.reduce( (prev, curr) => prev + curr ) / 3;
      
      
      for(let i = 0; i < m; i++){
        yValues[i] = [];
        for (let j = 0; j < 15; j++){
          yValues[i][j] = this.randomInteger(yMin, yMax)
        }
      }
      
      this.setState({
        yValues,
        yMin,
        yMax
      }, () => console.log(this.state.yValues))
    }

    //    DLya labi 6
    for(let i = 0; i < m; i++){
      yValues[i] = [];
      if(selectedTypeOfEq == 2){
        for (let j = 0; j < 14; j++){
          yValues[i][j] = 2.2 + 1.6*xNatur[0][i] + 9.2*xNatur[1][i] + 9.5*xNatur[2][i] + 0.8*xNatur[7][i] +0.7*xNatur[8][i] + 6.5*xNatur[9][i] + 0.2*xNatur[3][i] + 0.9*xNatur[4][i] + 8.7*xNatur[5][i] + 9.1*xNatur[6][i] + Math.random()*10 - 5;
        }
      }
      if(selectedTypeOfEq == 1){
        for (let j = 0; j < 8; j++){
          yValues[i][j] = 2.2 + 1.6*xNatur[0][i] + 9.2*xNatur[1][i] + 9.5*xNatur[2][i] + 0.2*xNatur[3][i] + 0.9*xNatur[4][i] + 8.7*xNatur[5][i] + 9.1*xNatur[6][i] + Math.random()*10 - 5;
        }
      }
      if(selectedTypeOfEq == 0){
        for (let j = 0; j < 4; j++){
          yValues[i][j] = 2.2 + 1.6*xNatur[0][i] + 9.2*xNatur[1][i] + 9.5*xNatur[2][i] + Math.random()*10 - 5;
        }
      }
    }
    this.setState({
      yValues
    }, () => console.log(this.state.yValues))

  }

  addAColumn = () => {
    const {m} = this.state;
    const newColumn = [];
    for (let j = 0; j < 8; j++){
      newColumn[j] = this.randomInteger(+this.state.yMin, +this.state.yMax)
    }
    const yValues1 = [...this.state.yValues, newColumn];
    const newM = m + 1;

    return(
      this.setState({
        yValues : yValues1,
        m : newM
      })
    )
  }

  randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }


  handleTypeChange = (event) => {
    // console.log(event)
    this.setState({
      selectedTypeOfEq : event.target.value
      }
      // , console.log(this.state.selectedTypeOfEq)
      // , this.pickData(undefined, undefined, event.target.value)
      , () => this.pickData()
    )
  }

  handleLabChange = (event) => {
    
    // console.log(event.target.value + " " + this.state.selectedLab)
    this.setState({
      selectedLab : event.target.value,
      m : ( (event.target.value == 0) ? 3 : 2 )
      }
      , () => this.pickData()
      // , console.log(this.state.selectedTypeOfEq)
      // , 
      // this.setUpNormValues(event.target.value)
    )
  }

  render() {
    // if (this.state.xNatur[0] === undefined) this.state.xNatur[0] = []
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
        <GreetingScreen handleLabChange={(event) => this.handleLabChange(event)} selectedLab={this.state.selectedLab} handleTypeChange={(event) => this.handleTypeChange(event)} selectedType={this.state.selectedTypeOfEq}/>
        <Table xValues={this.state.xNorm} />
        <Table xValues={this.state.xNatur} />
        <h4>{this.state.xNatur}</h4>
        <div className="column">
        {/* {
          
            this.state.xNatur[0].map((item) => {
                return (item > 0) ? <TableCell value={`+${item}`}/> : <TableCell value={item}/>
            })
        }     */}
        </div>

      </div>
    );
  }
}

export default App;
