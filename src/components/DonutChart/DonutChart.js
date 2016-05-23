import React, {Component} from 'react';
import {
    Chart,
    DataSeries,
    Pie
} from 'diffract';

const colors = [
    '#E91E63'
];
const width = 240;
const height = 240;

class DonutChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            currValue: 50,
            currLabel: 'meals missing',
            values: [],
            labels: []
        }
        this.setLabel = this.setLabel.bind(this);
        this.animateLabel = this.animateLabel.bind(this);
    }

    componentWillMount() {
        this.setState({
            total: this.props.total,
            values: [...this.props.values],
            currValue: this.props.values[0],
            labels: [...this.props.labels]
        });
    }

    getColors(d, i) {
        if (arguments.length === 2) {
            return colors[i];
        } else {
            return colors[d];
        }
    }

    setLabel(v, i) {
        this.setState({currValue: v, currLabel: this.state.labels[i]})
    }

    animateLabel(i,_this){
      let j = i+1;
      let nextVal = i <= _this.state.values.length ? _this.state.values[j] : _this.state.values[0];
      _this.setLabel(nextVal,j);
    }

    render() {
        let percent = null || Math.round((this.state.currValue / this.state.total) * 100);
        let labelPercent = percent
            ? `${percent}%`
            : 'by %';

        return (
            <div style={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'space-around'
            }}>
                <Chart width={width} height={height}>
                    <DataSeries data={this.state.values}>
                        <Pie innerRadius={75} outerRadius={80} style={(d, i) => ({fill: this.getColors(i)})}>
                            <text className="donut-title" textAnchor="middle" x={0} y={0} fontSize={14}>
                                {this.state.currLabel}
                            </text>
                            <text className="donut-subtitle" textAnchor="middle" x={0} y={18} fontSize={10}>
                                {`${labelPercent}`}
                            </text>
                        </Pie>
                    </DataSeries>
                </Chart>
            </div>
        );
    }
}

export default DonutChart;
