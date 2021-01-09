import React from "react";
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import RefreshButton from "./Components/RefreshButton";
import {getPerformance} from "../../api";



// 定义度量
const cols = {
  cpu: { alias: 'Cpu使用率' },
  node: { alias: '各个节点Cpu使用率' }
};
class CpuUseCharts extends React.Component{
  constructor(props) {
    super(props);
    const date=new Date()
    const dateString=date.getFullYear().toString()+"0"+(date.getMonth()+1).toString()+date.getDate().toString()
    this.state={
      ip:"175.24.40.189",
      date:"20200423",
      data :this.getData()
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

    this.updateData()
    getPerformance(this.state.ip,this.state.date).catch(err=>{
      console.log(err)
    }).then(res=>{
      //成功获取后台数据，用后台数据覆盖生成数据
      if(res&&res.data){
        let result=res.data.performance[0]
        if(result){

          let cpu_used=result.Cpu_used

          if(cpu_used){
            let newdata=this.state.data.slice()
            newdata[0].cpu=cpu_used

            this.setState({
              data:newdata
            })

          }


        }

      }

    })

  }
  updateData(){
    let newdata=this.getData()
    this.setState({
      data:newdata
    })
  }
  render() {
    return(
      <div>
        <div style={{float:'left' }}>
          <Chart width={1000} height={400} data={this.state.data} scale={cols} >
            <Axis name="node" title/>
            <Axis name="cpu" title/>
            <Legend position="bottom" />
            <Tooltip
              // crosshairs用于设置 tooltip 的辅助线或者辅助框
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="interval" position="node*cpu" color="node" />
          </Chart>
        </div>

        <div  style={{float:'right'}} >
          <RefreshButton callback={this.update.bind(this)}></RefreshButton>
        </div>
      </div>

    )
  }
}


export default CpuUseCharts
