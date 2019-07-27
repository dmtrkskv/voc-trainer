import React from "react";
import ReactMinimalPieChart from 'react-minimal-pie-chart';

import { Context } from "../Context.jsx";

export default class Result extends React.Component {
    constructor(props) {
        super(props);
    }
    static contextType = Context;
    render() {
        const { correctNum, totalCardsNum } = this.props;
        const result = correctNum / totalCardsNum * 100;
        const label = Math.floor(result) + "%";

        const {theme} = this.context;
        const chartBg = theme === "day" ? "#efefef" : "#242424";
        const labelColor = theme === "day" ? "black" : "white";

        return <div className="result">
            <ReactMinimalPieChart
                label={() => label}
                labelPosition={0}
                labelStyle={{ fontSize: "20px", fill: labelColor }}
                data={[{ value: 1, key: 1, color: '#00ceff' }]}
                background={chartBg}

                startAngle={-90}
                reveal={result}

                lineWidth={20}

                animate />
            <div>Your result is {correctNum} / {totalCardsNum}</div>
        </div>;
    }
}