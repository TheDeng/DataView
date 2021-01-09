import React from "react";
import {

  Chart,
  Geom,
  Axis,
  Tooltip, Legend,

} from "bizcharts";
import RefreshButton from "./Components/RefreshButton";
import {getPerformance} from "../../api";

class CpuPayloadCharts extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date()
    const dateString = date.getFullYear().toString() + "0" + (date.getMonth() + 1).toString() + date.getDate().toString()
    this.state = {
      ip: "175.24.40.189",
      date: dateString,
      data: this.getData()
    }
  }
  getData(){

    let data=[]
    for(let i=1;i<=5;i++){
      data.push({ node: `节点${i}`, cpu: Math.random()*80})
    }
    return data
  }

  update(){
    getPerformance(this.state.ip,this.state.date).catch(err=>{
      console.log(err)
    })
    this.updateData()
  }
  updateData(){
    let newdata=this.getData()
    this.setState({
      data:newdata
    })
  }

  render() {

    const cols = {
      cpu: { alias: 'Cpu系统负载' },
      node: { alias: '各个节点Cpu系统负载' }
    };

    return (
      <div>
        <div style={{float:'left' }}>
          <Chart width={1000} height={400} data={this.state.data} scale={cols} >
            <Axis name="node" title />
            <Axis name="cpu" title />
            <Legend position="bottom" />
            <Tooltip
              // crosshairs用于设置 tooltip 的辅助线或者辅助框
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="interval" position="node*cpu" color="node"  />
          </Chart>
        </div>
        <div  style={{float:'right'}} >
          <RefreshButton callback={this.update.bind(this)}></RefreshButton>
        </div>


      </div>
    );
  }
}

export default CpuPayloadCharts
