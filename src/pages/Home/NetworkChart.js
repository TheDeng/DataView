// data-set 可以按需引入，除此之外不要引入别的包
import React, {Fragment} from 'react';
import { Chart, Axis, Tooltip, Geom, Legend } from 'bizcharts';
import RefreshButton from "./Components/RefreshButton";
import {getNetwork} from '../../api'
// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START


const cols = {
  value: { min: 0 ,alias:'网络流量状态'},
  hour: { range: [0, 1],alias:'服务器网络流量随时间的变化' },
};

// legend 默认选中请使用 chart filter

class NetworkChart extends React.Component {
  constructor(props) {
    super(props);
    const date=new Date()
    const dateString=date.getFullYear().toString()+"0"+(date.getMonth()+1).toString()+(date.getDate()-2).toString()
    this.state={
      ip:"175.24.40.189",
      date:"20200423",
      data:this.getData()


  }
  }
  getData(){
    let data=[]
    for(let i=1;i<=24;i++){
      data.push(
        { type: '平均上传速率', hour: i.toString(), value: Math.random()*10 },
      )
    }
    for(let i=1;i<=24;i++){
      data.push(
        { type: '平均下载速率', hour: i.toString(), value: Math.random()*10 },
      )
    }
    return data
  }


  update(){

    this.updateData()
    getNetwork(this.state.ip,this.state.date).catch(err=>{
      console.log(err)
    }).then(res=>{
      //成功获取后台数据，用后台数据覆盖生成数据
      if(res&&res.data){
        let result=res.data
        if(result){

          let transport=result.transport
          let receive=result.receive
          console.log(transport,receive)
          if(transport&&receive){
            let newdata=this.state.data.slice()
            newdata[0].value=Number(transport[0])
            newdata[24].value=Number(transport[0])
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
    return (

        <div>
          <div  style={{float:'left' }}>
            <Chart

              width={1000}
              height={400}
              data={this.state.data}
              scale={cols}

            >
              <Axis name="hour" title />
              <Axis name="value" title/>
              <Legend  position="bottom"   />
              <Tooltip crosshairs={{ type: 'y' }} />
              <Geom type="line" position="hour*value" size={2} color="type" />
              <Geom
                type="point"
                position="hour*value"
                size={4}
                shape={'circle'}
                style={{ stroke: '#fff', lineWidth: 1 }}
                color="type"
              />
            </Chart>
          </div>

          <div  style={{float:'right'}} >
            <RefreshButton callback={this.update.bind(this)}></RefreshButton>
          </div>

        </div>



    );
  }
}

export default NetworkChart
