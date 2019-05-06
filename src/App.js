import React, { Component } from 'react';
import './App.css';
import "./bootstrap.css";

import GreetingScreen from "./components/greetingScreen/greetingScreen.js"
import Table from "./components/table/table.js"
import solve from "./solve.js"
import TableCell from "./components/tableCell/tableCell.js"
import ResultOutput from "./components/resultOutput/resultOutput.js"

class App extends Component {

  state = {
    xMin : [-40, -35, 15],
    xMax : [20, 15, 25],
    selectedLab : 1,
    l : [1.215, 1.73],
    selectedTypeOfEq : 0,
    xNorm : [],
    xNatur : [[]],
    xNormArray : [],
    xNaturArray : [],
    addedColumns : [0, 0, 0],
    m : 2,
    yMin : 0,
    yMax : 0,
    yValues : [],
    rows : 0,
    xAverage : [],
    yAverage : [],
    averageY : 0,
    dispersion : 0,
    gp : 0,
    isHomogeneous : true,
    gTableUsing : 0,
    aSingle : [],
    aDouble : [],
    mx : [],
    my : 0,
    coeffs : [],
    check : [],
    importantCoeffs : [],
    yImportantValues : [],
    dispersionVidtv : 0,
    d : 0,
    betha : [],
    t : [],
    tTableUsing : 0,
    isAdequate : false,
    fp : 0,
    fTableUsing : 0,
    result : []
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
                .then(() => this.makeCalculations())
                // .then(() => this.pickData())
                // .then(() => this.generateYValues())

    
    // this.setState({
      // kek : "setState srabotal"
    // }, () => console.log("kek " + this.state.kek));
    // console.log("kek " + this.state.kek)
  }

  makeCalculations = () => {
    const promise = function () {
      return( new Promise((resolve, reject) => resolve()) )
    }()

    promise
          .then(() => this.pickData())
          .then(() => this.calculateRows())
          .then(() => this.generateYValues())
          .then(() => this.calculateXAverage())
          // while( !this.state.isHomogeneous && this.state.m < 10 ){
          // promise
          .then(() => this.calculateYAverage())
          .then(() => this.findDispersion())
          .then(() => this.checkCochrane())
          .then(() => this.calculateTemporaryCoeffs())
          .then(() => this.calculateCoeffs())
          .then(() => this.checkStudent())
          .then(() => this.checkFisher())
          .then(() => this.showResults())
            // .then((f, fTableUsing) => {
            //       this.setState({f, fTableUsing},
            //         () => this.showResults()) 
            //       })
            // .catch((f, fTableUsing) => {
            //       this.setState({f, fTableUsing},
            //         () => this.changeType()) 
            //       })

          // }  //returns promise
              // .then(() => )

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

  calculateRows = () => {
    const {selectedLab, selectedTypeOfEq} = this.state;

    let rows = function (){
      if (selectedTypeOfEq == 0){
        return 4
      }
      if (selectedTypeOfEq == 1){
        return 8
      }
      if (selectedTypeOfEq == 2){
        // return (selectedLab == 0) ? 15 : 14
        return 15-selectedLab
      }
    }()
    
    this.setState({
      rows
    })
  }

//  4 8 15
//  0 1 2 
  generateYValues = () => {
    const {selectedLab, selectedTypeOfEq, m, xMin, xMax, xNatur, rows} = this.state;
    const yValues = [];

    

    if (selectedLab == 0) {
      const yMin = 200 + xMin.reduce( (prev, curr) => prev + curr ) / 3;
      const yMax = 200 + xMax.reduce( (prev, curr) => prev + curr ) / 3;
      
      for(let i = 0; i < m; i++){
        yValues[i] = [];
        for (let j = 0; j < rows; j++){
          yValues[i][j] = this.randomInteger(yMin, yMax)
        }
      }
      
      this.setState({
        yValues,
        yMin,
        yMax,
        rows
      }, () => console.log(this.state.yValues))
    } 
    if (selectedLab == 1)  {
        for(let i = 0; i < m; i++){
          yValues[i] = [];
          if(selectedTypeOfEq == 2){
            for (let j = 0; j < 14; j++){
              yValues[i][j] = 2.2 + 1.6*xNatur[0][j] + 9.2*xNatur[1][j] + 9.5*xNatur[2][j] + 0.8*xNatur[7][j] +0.7*xNatur[8][j] + 6.5*xNatur[9][j] + 0.2*xNatur[3][j] + 0.9*xNatur[4][j] + 8.7*xNatur[5][j] + 9.1*xNatur[6][j] + Math.random()*10 - 5;
            }
          }
          if(selectedTypeOfEq == 1){
            for (let j = 0; j < 8; j++){
              yValues[i][j] = 2.2 + 1.6*xNatur[0][j] + 9.2*xNatur[1][j] + 9.5*xNatur[2][j] + 0.2*xNatur[3][j] + 0.9*xNatur[4][j] + 8.7*xNatur[5][j] + 9.1*xNatur[6][j] + Math.random()*10 - 5;
            }
          }
          if(selectedTypeOfEq == 0){
            for (let j = 0; j < 4; j++){
              yValues[i][j] = 2.2 + 1.6*xNatur[0][j] + 9.2*xNatur[1][j] + 9.5*xNatur[2][j] + Math.random()*10 - 5;
            }
          }
        }
        console.log("Значення У")
        console.log(yValues)

        this.setState({
          yValues,
          rows
        })
    }

    //    DLya labi 6
    

  }

  addAColumn = () => {
    const {m, yValues, yMin, yMax, selectedTypeOfEq, selectedLab, rows,xNatur, addedColumns} = this.state;
    const newColumn = [];

    if (selectedLab == 0)  {
      for (let j = 0; j < rows; j++){
        newColumn[j] = this.randomInteger(yMin, yMax)
      }
    }

    if (selectedLab == 1)  {
        if(selectedTypeOfEq == 2){
          for (let i = 0; i < 14; i++){
            newColumn[i] = 2.2 + 1.6*xNatur[0][i] + 9.2*xNatur[1][i] + 9.5*xNatur[2][i] + 0.8*xNatur[7][i] +0.7*xNatur[8][i] + 6.5*xNatur[9][i] + 0.2*xNatur[3][i] + 0.9*xNatur[4][i] + 8.7*xNatur[5][i] + 9.1*xNatur[6][i] + Math.random()*10 - 5;
          }
        }
        if(selectedTypeOfEq == 1){
          for (let i = 0; i < 8; i++){
            newColumn[i] = 2.2 + 1.6*xNatur[0][i] + 9.2*xNatur[1][i] + 9.5*xNatur[2][i] + 0.2*xNatur[3][i] + 0.9*xNatur[4][i] + 8.7*xNatur[5][i] + 9.1*xNatur[6][i] + Math.random()*10 - 5;
          }
        }
        if(selectedTypeOfEq == 0){
          for (let i = 0; i < 4; i++){
            newColumn[i] = 2.2 + 1.6*xNatur[0][i] + 9.2*xNatur[1][i] + 9.5*xNatur[2][i] + Math.random()*10 - 5;
          }
        }
    }

    const yValues1 = [...yValues, newColumn];
    // const newM = m + 1;
    console.log("Було додано стовпчик")
    console.log(yValues1);
    const addedColumns1 = addedColumns;
    addedColumns1[selectedTypeOfEq] += 1
    return(
      this.setState({
        yValues : yValues1,
        m : m + 1,
        addedColumns : addedColumns1
      }, (m < 10) ? this.calculateYAverage() : null)
    )
  }

  randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  calculateYAverage = () => {
    const {yValues, rows, m} = this.state;
    const yAverage = [];
    let averageY = 0;

    for(let i = 0; i < rows; i++){
      yAverage[i] = 0;
      for(let j = 0; j < m; j++){
        yAverage[i] += yValues[j][i]
      }
      yAverage[i] /= m;
    }
    // for(let i = 0; i < rows; i++){
    //       dispersion[i] = 0;
    //       for(let j = 0; j < m; j++){
    //         dispersion[i] += Math.pow((yValues[j][i] - yAverage[i]), 2)
    //       }
    //       dispersion[i] /= m
    //     }


    // for ( let i = 0; i < rows; i++) {
    //   yAverage[i] = +(yValues.reduce((previous, current, index) =>{
    //     if(index === 1) return previous[i] + current[i];
    //     return previous + current[i];
    //     })/m);
    // }
    averageY = +(yAverage.reduce((previous, el) => previous + el)/rows);
    
    console.log("Середній Y")
    console.log(yAverage);
    console.log(averageY);

    return(
      this.setState({
        yAverage,
        averageY
      }, (!this.state.isHomogeneous && m < 10) ? this.findDispersion() : null )
    )
  }

  calculateXAverage = () => {
    const {xNatur, rows} = this.state;  
    let xAverage = [];

    xNatur.forEach((element, index) => {
      xAverage[index] = +(element.reduce((previous, el) => previous + el)/rows);
    })
    console.log("Середній Х")
    console.log(xAverage)
    return(this.setState({
      xAverage
    })
    )
  }

  findDispersion = () => {
    const {yAverage, yValues, rows, m} = this.state;
    const dispersion = [];  
    // const dispersion1 = [];  

    for(let i = 0; i < rows; i++){
      dispersion[i] = 0;
      for(let j = 0; j < m; j++){
        dispersion[i] += Math.pow((yValues[j][i] - yAverage[i]), 2)
      }
      dispersion[i] /= m
    }


    // for ( let i = 0; i < rows; i++ ) {
    //   dispersion1[i] = +(yValues.reduce((previous, current, index) =>{
    //     if( yValues.length == 2) return ((Math.pow(( previous[i] - yAverage[i] ), 2) ) + ( Math.pow( ( current[i] - yAverage[i] ), 2) ) )
    //     if(index === 1) return +( Math.pow( ( previous[i] - yAverage[i] ), 2) );
    //     return +(previous + +( Math.pow( ( current[i] - yAverage[i] ), 2) ));
    //   })/m);
    // }

    console.log("dispersion");
    console.log(dispersion);


    // console.log("dispersion1");
    // console.log(dispersion1);

    return(this.setState({
      dispersion
    }, (!this.state.isHomogeneous && m < 10) ? this.checkCochrane() : null ) )
    
  }


  checkCochrane = () => {
    const {dispersion, m, selectedTypeOfEq} = this.state;

    const gp = +((Math.max(...dispersion)) / (dispersion.reduce((previous, current) => previous + current)));
    // const f1 = m - 1;
    // const f2 = 8;
    let gTable = [];

    if (selectedTypeOfEq == 0){
      gTable = [0.7679, 0.6841, 0.6287, 0.5892, 0.5598, 0.5365, 0.5175,0.5017];
    }else if (selectedTypeOfEq == 1){
      gTable = [0.5157, 0.4377, 0.3910, 0.3595, 0.3362, 0.3185, 0.3043,0.2926];
    }else {
      gTable = [0.3346, 0.2758, 0.2419, 0.2159, 0.2034, 0.1911, 0.1815,0.1736];
    }

    const isHomogeneous = gp < gTable[m - 2];
    const gTableUsing = gTable[m - 2];

    // return(new Promise((resolve, reject) => isHomogeneous ? resolve(gp,isHomogeneous, gTableUsing) : reject()))

    console.log(`Дисперсія однорідна? ${isHomogeneous}`)
    console.log(`Значення коефіцієнту Кохрена ${gp}`)
    console.log(`Значення табл коефіцієнту ${gTableUsing}`)

    this.setState({
      gp,
      isHomogeneous,
      gTableUsing
    }
    , () => (!isHomogeneous && m < 10) ? this.addAColumn() : null
    )
  }

  calculateTemporaryCoeffs = () => {
    const {xNatur, yAverage, averageY, rows} = this.state;
    
    const aSingle = [];
    const aDouble = [];
    const mx = [];
    const my = averageY;

    for( let i = 0; i < xNatur.length; i++){
      mx[i] = xNatur[i].reduce((prev, curr) => prev+curr) / rows;
      
      aSingle[i] = 0
      for(let j = 0; j < rows; j++){
        aSingle[i] += yAverage[j]*xNatur[i][j]
      }
      aSingle[i] /= rows;
      
      aDouble[i] = [];
      for(let j = 0; j < xNatur.length; j++){
        aDouble[i][j] = 0;
        for(let k = 0; k < rows; k++){
          aDouble[i][j] += xNatur[i][k]*xNatur[j][k]
        }
        aDouble[i][j] /= rows;
      }

    }

    console.log("Mx");
    console.log(mx);
    console.log("aSingle");
    console.log(aSingle);
    console.log("aDouble");
    console.log(aDouble);

    this.setState({
      aSingle,
      aDouble,
      mx,
      my
    })
  }

  calculateCoeffs = () => {
    // giraffe live in zoo. 
    const {mx, my, aSingle, aDouble, xNatur, rows} = this.state;

    const firstRow = [1, ...mx];
    const anotherRows = [];

    for(let i = 0; i < aDouble.length; i++){
      anotherRows[i] = [mx[i]];
      for(let j = 0; j < aDouble[i].length;j++){
        anotherRows[i].push(aDouble[j][i])
      }
    }

    const freeRow = [my, ...aSingle]

    const coeffs = solve([[1, ...mx], ...anotherRows], [my, ...aSingle]);

    console.log("coeffs");
    console.log(coeffs);

    const check = [];
    for(let i = 0; i < rows; i++){
      check[i] = coeffs[0];
      for(let j = 0; j < coeffs.length-1; j++){
        check[i] += coeffs[j+1]*xNatur[j][i]
      }
    }

    console.log("check");
    console.log(check);

    this.setState({
      coeffs,
      check
    })

  }


  checkStudent = () => {
    const {dispersion, m, yAverage, xNorm, rows, coeffs, selectedTypeOfEq, xNatur} = this.state;

    const betha = [];
    const t = [];

    const dispersionVidtv = dispersion.reduce((previous, current) => previous + current) / rows;
    const dispersionB = Math.sqrt( dispersionVidtv / (rows * m));

    for(let i = 0; i < coeffs.length; i++){
      betha[i] = 0
      for(let j = 0; j < rows ; j++){
        betha[i] += yAverage[j]*xNorm[i][j]
      }
      betha[i] /= rows

      t[i] = Math.abs(betha[i]) / dispersionB
    }

    let tTable = [];
    if (selectedTypeOfEq == 0){
      tTable = [2.306, 2.179, 2.120, 2.086, 2.064, 2.048, 2.040, 2.030];
    }else if (selectedTypeOfEq == 1){
      tTable = [2.120, 2.064, 2, 2, 2, 2, 2, 2];
    }else {
      tTable = [2.064, 2, 2, 2, 2, 2, 2, 2];
    }

    const tTableUsing = tTable[m-2]
    const abc = t.map((el) => el > tTableUsing);
    const importantCoeffs = abc.map((el, i) => el * coeffs[i])
    const d = importantCoeffs.filter((el) => el !== 0).length;
    
    console.log("important Coeffs");
    console.log(importantCoeffs);

    const yImportantValues = [];
    for(let i = 0; i < rows; i++){  
      yImportantValues[i] = importantCoeffs[0];
      for(let j = 0; j < importantCoeffs.length-1; j++){
        yImportantValues[i] += importantCoeffs[j+1]*xNatur[j][i]
      }
    }

    console.log("important Y values");
    console.log(yImportantValues);

    this.setState({
      dispersionVidtv,
      importantCoeffs,
      d,
      betha,
      t,
      tTableUsing,
      yImportantValues
    })
  }

  checkFisher = () => {
    const {d, dispersionVidtv, rows, yAverage, importantCoeffs, yImportantValues, m} = this.state;

    let dispersionAD = 0;
    yImportantValues.forEach((el, i) => {
      dispersionAD += +Math.pow( (el - yAverage[i]), 2 ) 
    })
    dispersionAD = +(dispersionAD * m / (rows - d))
    console.log("Диперсія відтвор")
    console.log(dispersionVidtv)
    console.log("Диперсія адекватності")
    console.log(dispersionAD)
    const fTable = [ [5.3, 4.8, 4.5, 4.4, 4.3], [4.5, 3.9, 3.6, 3.5, 3.4], [4.1, 3.5, 3.2, 3.1, 3.0] ];
    const fp = +(dispersionAD / dispersionVidtv);
    console.log("Коефіціент Кохрена")
    console.log(fp)
    // const fTableUsing = fTable[3 - d][m - 3];
    const fTableUsing = 4;
    const isAdequate = fp < fTableUsing;
    console.log(`Функція адекватна? ${isAdequate}`);
    this.setState({fp, fTableUsing, isAdequate})

    // return(new Promise((resolve, reject) => {
    //   isAdequate ? resolve(f, fTableUsing) : reject(f, fTableUsing)
    // }))
  }

  showResults = () => {
    this.setState(({result, coeffs, check, selectedTypeOfEq, selectedLab, yAverage, addedColumns, gp, gTableUsing, dispersion,importantCoeffs, yImportantValues, t, tTableUsing, isAdequate, fTableUsing, fp}) => {
      return({
        result : [...result, 
        <ResultOutput 
        coffsData={{coeffs, check, selectedTypeOfEq, selectedLab}}
        CochraneData={{yAverage, addedColumns, gp, gTableUsing, dispersion}}
        StudentData={{importantCoeffs, yImportantValues, t, tTableUsing}}
        FisherData={{isAdequate, fTableUsing, fp}}
        />]
      })
    }
    , () => this.state.isAdequate ? null : this.changeType() 
    )
  }

  changeType = () => {
    console.log("trying to change the type")
    if (this.state.selectedTypeOfEq != 2) {
      this.setState(({selectedTypeOfEq}) => {
        return({
          selectedTypeOfEq : selectedTypeOfEq + 1
        })
      }, () => this.makeCalculations())
    }
  }


  handleTypeChange = (event) => {

    this.setState({
      selectedTypeOfEq : event.target.value,
      result : [],
      addedColumns : [0, 0, 0]
      }
      , () => this.makeCalculations()
    )
  
  }

  handleLabChange = (event) => {
     
    this.setState({
      selectedLab : event.target.value,
      m : ( (event.target.value == 0) ? 3 : 2 ),
      result : [],
      addedColumns : [0, 0, 0]
      }
      , () => this.makeCalculations()
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
        {/* <Table xValues={this.state.xNorm} /> */}
        {/* <Table xValues={this.state.xNatur} /> */}
        {/* <h4>{this.state.xNatur}</h4> */}
        {this.state.result}
        
        {/* <div className="column">

        {
          
            this.state.xNatur[0].map((item) => {
                return (item > 0) ? <TableCell value={`+${item}`}/> : <TableCell value={item}/>
            })
        }    
        </div> */}

      </div>
    );
  }
}

export default App;
