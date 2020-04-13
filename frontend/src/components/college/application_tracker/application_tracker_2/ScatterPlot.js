import React, { useState } from 'react'
import Plot from "react-plotly.js";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

function ScatterPlot(props) {
    const { students } = props
    const [ test, setTest ] = useState("ACT_composite")

    function computeWA_SAT() {
        students.map(student => {
            let result = 0;
            let weights = 0;
            Object.keys(student).forEach(y => {
                // console.log('key: ' + y)
                if (y.substring(0,4)=="SAT_" && y != "SAT_math" && y!= "SAT_EBRW" && student[ y ] != null) {
                  result += 0.05 * (student[y] / 800);
                  weights += 0.05;
                }
            });
            if(student.SAT != null && student.ACT_composite != null){
                result += (1-weights)/2 * (student.SAT / 1600 + student.ACT_composite / 36)
                weights = 1;
            }else if(student.SAT != null){
                result += (1-weights) * student.SAT / 1600;
                weights = 1;
            }else if(student.ACT_composite != null){
                result += (1-weights) * student.ACT_composite / 36;
                weights = 1;
            }
            result = Math.round(result/weights * 100)
            // console.log("WAWAWA")
            // console.log(result)
            student.WA_SAT = result;
        });
    };

    computeWA_SAT();

    return (
        <>
            <Plot
                data={ [
                    {
                        x: students
                            .filter(s => s.status === "denied")
                            .map(s => s[ test ]),
                        y: students.filter(s => s.status === "denied").map(s => s.GPA),
                        type: "scatter",
                        mode: "markers",
                        marker: { color: "red" },
                        name: "Denied"
                    },

                    {
                        x: students
                            .filter(s => s.status === "accepted")
                            .map(s => s[ test ]),
                        y: students.filter(s => s.status === "accepted").map(s => s.GPA),
                        type: "scatter",
                        mode: "markers",
                        marker: { color: "green" },
                        name: "Accepted"
                    },
                    {
                        x: students
                            .filter(s => s.status !== "accepted" && s.status !== "denied")
                            .map(s => s[ test ]),
                        y: students
                            .filter(s => s.status !== "accepted" && s.status !== "denied")
                            .map(s => s.GPA),
                        type: "scatter",
                        mode: "markers",
                        marker: { color: "orange" },
                        name: "Other"
                    }

                ] }
                layout={ { width: 1000, height: 800, title: "A Fancy Plot" } }
            />
            <Select onChange={ (e) => { setTest(e.target.value) } }>
                <MenuItem value="ACT_composite">ACT </MenuItem>
                <MenuItem value="SAT">SAT</MenuItem>
                <MenuItem value="ACT_english">ACT English</MenuItem>
                <MenuItem value="ACT_math">ACT math</MenuItem>
                <MenuItem value="ACT_reading">ACT reading</MenuItem>
                <MenuItem value="ACT_science">ACT science</MenuItem>
                <MenuItem value="WA_SAT">Weighted Average of Percentile Scores for Standardized Tests</MenuItem>
            </Select>
        </>
    )
}

export default ScatterPlot
