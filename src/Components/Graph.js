import React, { Component } from 'react';
import { VictoryChart } from 'victory';
import { VictoryGroup } from 'victory';
import { VictoryArea } from 'victory';
import { VictoryAxis } from 'victory';
import { VictoryLabel } from 'victory';

//SearchBar AutoFill Dropdown Component
class Graph extends Component {

    render() {
        const chartTheme = {
            axis: {

                style: {
                    tickLabels: {
                        // this changed the color of my numbers to white
                        fill: 'white',
                    },
                },
            }
        };
        return (
            <div>
                <div className="graph">
                    <VictoryChart width={300} height={300} domainPadding={10} animate={{ duration: 1000 }}
                        theme={chartTheme}
                    >
                    <VictoryGroup
                        style={{
                            data: { strokeWidth: 3, fillOpacity: 0.7 }
                        }}
                    >

                    <VictoryArea
                        style={{
                            data: { fill: "#c4aa8c", stroke: "#c8bba3" }
                        }}
                        data={this.props.stockGraphArray}
                    />

                    <VictoryLabel x={425} y={55} width={500}
                        text={`${this.props.symbol} Value over Past 3 Months`}
                    />

                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x) => (`$${x}`)}
                    />

                    <VictoryAxis
                    />

                    </VictoryGroup>

                    </VictoryChart>
                </div>
            </div>
        )
    }
}

export default Graph;