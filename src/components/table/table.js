import React, {Component} from "react";

import TableCell from "../tableCell/tableCell.js"

export default class Table extends Component{
    
    state = {
        header : this.props.header,
        xValues : this.props.xValues,
        yValues : this.yValues,
        startFrom : this.startFrom
    }

    static defaultProps = {
        header : false,
        yValues : [],
        startFrom : 0
    }

    render(){

        let {xValues, yValues, header, startFrom} = this.state;

        const xValuesToRender = [];

        // for( let i = 0; i < 3; i++){
        //     xValuesToRender[i] = 
        //     <div className="column">
        //     {
        //         xValues[i].map((item) => {
        //             return (item > 0) ? <TableCell value={`+${item}`}/> : <TableCell value={item}/>
        //         })
        //     }    
        //     </div>
        // }

        xValues.forEach((element, index) => {
            return(
                xValuesToRender[index] = <div className="column">
                {
                    element.map((item) => {
                        return (item > 0) ? <TableCell value={`+${item}`}/> : <TableCell value={item}/>
                    })
                }    
                </div>
                ) 
        });

        return(
            <div>
                {xValuesToRender}
            </div>
        )
    }

}