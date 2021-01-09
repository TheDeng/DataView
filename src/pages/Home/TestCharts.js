import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label,Legend } from 'bizcharts';
import numeral from 'numeral';
import {getPerformance} from "../../api";
import RefreshButton from "./Components/RefreshButton";

// CDN START

class TestCharts extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date()
    const dateString = date.getFullYear().toString() + "0" + (date.getMonth() + 1).toString() + date.getDate().toString()
    this.state = {
      ip: "175.24.40.189",
      date: "20200423",
      data: this.getData()
    }
  }
  getData(){

    let data=[]
    for(let i=1;i<=5;i++){
      data.push({ node: `节点${i}`, payload: Math.random()*1})
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
            newdata[0].payload=cpu_used

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

    const cols = {
      node:{alias:'节点'},
      payload:{alias:'各个节点CPU负载'}
    };
    return (
      <div>
        <div style={{float:'left'}}>
          <Chart height={400} width={1000} data={this.state.data} scale={cols} padding={['auto', 100, 'auto']}>
            <Coord transpose />
            <Axis name="node" title />
            <Axis name="payload"  title />

            <Tooltip />
            {/* 凸显类型 color={['age', '#E6F6C8-#3376CB']} */}
            <Geom type="interval" position="node*payload" color={['payload', '#E6F6C8-#3376CB']}>
              <Label content={['node*payload', (name, value) => numeral(value || 0).format('0.0%')]} />{' '}
            </Geom>
          </Chart>
        </div>

        <div  style={{float:'right'}} >
          <RefreshButton callback={this.update.bind(this)}></RefreshButton>
        </div>

      </div>

    );
  }
}

export default TestCharts


