import React, { Component } from 'react'

export default class ResultOutput extends Component {
    
    
    
    render(){
        const {coffsData, CochraneData, StudentData, FisherData} = this.props;
        const {coeffs, check, selectedTypeOfEq, selectedLab} = coffsData;
        const {yAverage, addedColumns, gp, gTableUsing, dispersion} = CochraneData;
        const {importantCoeffs, yImportantValues, t, tTableUsing} = StudentData;
        const {isAdequate, fTableUsing, fp} = FisherData;

        // const xLinearLabels = ["x1", "x2", "x3"];
        // const xInteractionLabels = ["x1", "x2", "x3", "x1x2", "x1x3", "x2x3", "x1x2x3"];
        // const xQuadricLabels = ["x1", "x2", "x3", "x1x2", "x1x3", "x2x3", "x1x2x3", "x1²", "x2²", "x3²"];
        const xLabel = [["x1", "x2", "x3"], ["x1", "x2", "x3", "x1x2", "x1x3", "x2x3", "x1x2x3"], ["x1", "x2", "x3", "x1x2", "x1x3", "x2x3", "x1x2x3", "x1²", "x2²", "x3²"]]
        let equationPhormula = `${coeffs[0].toFixed(2)}`
        let equationImportantPhormula = `${importantCoeffs[0].toFixed(2)}`
        
        coeffs.forEach((element, index) => {
         if(index != 0){
            equationPhormula += ` +${element.toFixed(2)}*${xLabel[Math.round((coeffs.length-4)/4)][index-1]}`
         }               
        })
        importantCoeffs.forEach((element, index) => {
            if(index != 0){
                equationImportantPhormula += ` +${element.toFixed(2)}*${xLabel[Math.round((coeffs.length-4)/4)][index-1]}`
            }               
           })

        const equation = function(){
            if(selectedTypeOfEq == 0) {return "Лінійне рівняння регерсії"} 
            if(selectedTypeOfEq == 1) {return "Рівняння регресії із взаємодією"}
            if(selectedTypeOfEq == 2) {return "Рівняння регресії з квадратичними членами"}
        }()
        // console.log(Math.round(1.5));
        return(
            <div>
                <div>
                    <h2>{selectedLab == 0 ? "Ортогональний план" : "Рототабельний план"}</h2>
                    <h2>{equation}</h2>
                    <h2>Знаходження коефіціентів рівняння</h2>
                    <h4>{equationPhormula}</h4>
                    <h3>Підставимо значення у отримане рівняння</h3>
                    {/* <h4>{equationLabel}</h4> */}
                    {check.map((el,i) => <span>{`y${i+1}=${el.toFixed(2)}`}</span>)}
                </div>

                <div>
                    <h4>Середні значення Y</h4>
                    {yAverage.map((el,i) => <span>{`y${i+1}=${el.toFixed(3)}`}</span>)}
                    <h4>Значення дисперсії</h4>
                    {dispersion.map((el) => <span>{`${el.toFixed(2)}`}</span>)}
                    <h4>{`${gp.toFixed(2)} < ${gTableUsing}`}</h4>
                    <h4>{`Дисперсія однорідна, ${(addedColumns[selectedTypeOfEq] == false) ? "колонки не було додано" : `було додано ${addedColumns[selectedTypeOfEq]} колонок` }`}</h4>

                </div>

                <div>
                <h4>Статистичні оцінки коефіціентів</h4>
                {t.map((el) => <span>{`${el.toFixed(2)}`}</span>)}
                <h4>{`Табличне значення t = ${tTableUsing}`}</h4>
                <h4>Рівняння регерсії зі значущими коефіціентами</h4>
                <h4>{equationImportantPhormula}</h4>
                <h3>Підставимо значення у отримане рівняння</h3>
                {yImportantValues.map((el,i) => <span>{`y^${i+1}=${el.toFixed(3)}`}</span>)}
                </div>

                <div>
                    <h4>{`Коефіціент Кохрена${fp.toFixed(2)}`}</h4>
                    <h4>{`Табличний коефіціент${fTableUsing}`}</h4>
                    <h4>{isAdequate ? "Функція адеватна" : "Функція неадекватна"}</h4>
                </div>

            </div>
        )
    }
}