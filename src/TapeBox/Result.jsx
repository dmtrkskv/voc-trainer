import React from "react";
import ReactMinimalPieChart from 'react-minimal-pie-chart';

export default function Result(props) {
    const { correctNum, totalCardsNum } = props;
    const result = correctNum / totalCardsNum * 100;
    const label = Math.floor(result) + "%";

    return <div className="result">
        <ReactMinimalPieChart
            label={() => label}
            labelPosition={0}
            labelStyle={{ fontSize: "20px", fill: "black" }}
            data={[{ value: 1, key: 1, color: '#00ceff' }]}
            background="#efefef"

            startAngle={-90}
            reveal={result}

            lineWidth={20}

            animate />
        <div>Ваш результат {correctNum} / {totalCardsNum}</div>
    </div>;
}