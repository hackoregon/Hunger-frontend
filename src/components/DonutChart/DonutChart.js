import React, {Component} from 'react';
import {
    Chart,
    DataSeries,
    Pie
} from 'diffract';

const colors = [
  'rgba(200, 75, 150, 1)',
  'rgba(200, 75, 150, 0.1)'
]
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
      const labels = this.props.labels || []
        this.setState({
            total: this.props.total,
            values: [...this.props.values],
            currValue: this.props.values[0],
            labels: [...labels]
        });
    }
    componentWillReceiveProps(nextProps) {
      const labels = nextProps.labels || []
        this.setState({
            total: nextProps.total,
            values: [...nextProps.values],
            currValue: nextProps.values[0],
            labels: [...labels]
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

        return (
            <div style={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'space-around'
            }}>
                <Chart width={width} height={height}>
                    <DataSeries data={this.state.values}>
                        <Pie innerRadius={75} outerRadius={80} style={(d, i) => ({fill: this.getColors(i)})}>
                          {this.props.children}
                        </Pie>
                    </DataSeries>
                </Chart>
            </div>
        );
    }
}

export default DonutChart;
