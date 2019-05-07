 import React, {Component} from "react";
 import "./greetingScreen.css"

 export default class GreetingScreen extends Component{

    // state = {
    //     handleTypeChange : this.props.handleTypeChange,
    //     selectedType : this.props.selectedTypeOfEq
    // }

    render(){

        const {handleLabChange, selectedLab, handleTypeChange, selectedType} = this.props;

        return(
            <div className="greetingScreen">
                <h1>Кривошей Денис Варіант №112</h1>
                <h3>{`Лабораторна робота №${selectedLab == 0 ? "5" : "6"}`}</h3>
                <form>
                    {/* <div className="form-check"> */}
                <label className="labPicking">
                    <input
                        type="radio"
                        name="select-lab"
                        value={0}
                        checked={selectedLab == 0}
                        // className="form-check-input"
                        onChange={handleLabChange}
                        // className="labPicking"
                    />
                    Лабораторна робота №5
                </label>
                    {/* <div className="form-check"> */}
                <label className="labPicking">
                    <input
                        type="radio"
                        name="select-lab"
                        value={1}
                        checked={selectedLab == 1}
                        // className="form-check-input"
                        onChange={handleLabChange}
                        // className="labPicking"
                    />
                    Лабораторна робота №6
                </label>
                </form>
                <h4>{`f(x) = ${(selectedLab == 1) ? "2,2+1,6*x1+9,2*x2+9,5*x3+0,8*x1*x1+0,7*x2*x2+6,5*x3*x3+0,2*x1*x2+0,9*x1*x3+8,7*x2*x3+9,1*x1*x2*x3" : "випадковим чином від Умін до Умакс" } `}</h4>
                <form>
                    <div className="form-check">
                        <label>
                            <input
                                type="radio"
                                name="select-type"
                                value={0}
                                checked={selectedType == 0}
                                className="form-check-input"
                                onChange={handleTypeChange}
                            />
                            Лінійне рівняння
                        </label>
                    </div>
                    <div className="form-check">
                        <label>
                            <input
                                type="radio"
                                name="select-type"
                                value={1}
                                checked={selectedType == 1}
                                className="form-check-input"
                                onChange={handleTypeChange}
                            />
                            Рівняння із взаємодією
                        </label>
                    </div>
                    <div className="form-check">
                        <label>
                            <input  
                                type="radio"
                                name="select-type"
                                value={2}
                                checked={selectedType == 2}
                                className="form-check-input"
                                onChange={handleTypeChange}
                            />
                            Рівняння з квадратичними коефіцієнтами
                        </label>
                    </div>
                </form>
                <h4 className={(selectedType == "linear") ? "show" : "hide" } > y = b0 + Σbi*xi </h4>
                <h4 className={(selectedType == "interaction") ? "show" : "hide" } > y = b0 + Σbi*xi + Σbij*xi*xj + Σbijk*xi*xj*xk</h4>
                <h4 className={(selectedType == "quadric") ? "show" : "hide" } > y = b0 + Σbi*xi + Σbij*xi*xj + Σbijk*xi*xj*xk + Σbii*(xi)² </h4>
            </div>
        )
    }
 }