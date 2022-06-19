import React from 'react'
import HSBar from "react-horizontal-stacked-bar-chart";
import usageData from '../data/usageData'



console.log(usageData);
export default function StackedChart() {
    return (
        <div style={{ margin: "10px" }}>
            <h3 style={{ margin: "2px" }}>Usage</h3>
            <HSBar
                showTextDown
                id="hrStackedChart"

                data={[
                    { value: usageData.high, description: `■ High (>50M) : ${Math.round((usageData.high/usageData.total)*100)}%`, color: "blue" },
                    { value: usageData.medium, description: `■ Medium (10M-50M) : ${Math.round((usageData.medium/usageData.total)*100)}%`, color: "blueviolet" },
                    { value: usageData.low, description: `■ Low (<10M) : ${Math.round((usageData.low/usageData.total)*100)}%`, color: "aqua" }
                ]}
                 />
        </div>

    )
}
