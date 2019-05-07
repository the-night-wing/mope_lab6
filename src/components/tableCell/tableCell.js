import React from "react"
import "./tableCell.css"

const TableCell = ({value}) => {
    return(
        <div className="tableCell">
            <span>{value}</span>
        </div>
    )
}

export default TableCell