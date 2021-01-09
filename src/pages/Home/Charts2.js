import React from 'react';
import { Chart, Geom, Axis } from 'bizcharts';
import RefreshButton from "./Components/RefreshButton";
import {getMaximumFlow, getPerformance} from "../../api";

class Charts2 extends React.Component {
  constructor(props) {
    super(props);
    const date=new Date()
    const dateString=date.getFullYear().toString()+"0"+(date.getMonth()+1).toString()+date.getDate().toString()
    this.state={
      ip:"175.24.40.189",
      date:"20200423",
      data:[
        { genre: '平均负载值', sold: 10 },
        { genre: '最大上传', sold: 20 },
        { genre: '最大下载', sold: 150 },
        { genre: '交换分区', sold: 12 },
        { genre: '根分区使用率', sold: 12 },
      ]
    }
  }
  update(){
    //首先生成节点数据
    this.updateData()
    //获取性能相关数据
    getPerformance(this.state.ip,this.state.date).catch(err=>{
      console.log(err)
    }).then(res=>{
        //成功获取后台数据，用后台数据覆盖生成数据
      if(res){
        let result=res.data.performance[0]
        if(result){

          let root_used=result.root_used
          let swap=result.average_load
          console.log(swap)
          if(root_used&&swap){
            let newdata=this.state.data.slice()
            newdata[4].sold=root_used


            newdata[3].sold=Math.floor(Math.random()*15)
            this.setState({
              data:newdata
            })

          }


        }

      }

    })
    //获取最大上载下载数据
    getMaximumFlow(this.state.ip,this.state.date).catch(err=>{
      console.log(err)
    }).then(res=>{
      //成功获取后台数据，用后台数据覆盖生成数据
      if(res){

          let max_transport=res.max_transport
          let max_receive=res.max_receive

          if(max_transport&&max_receive){
          let newdata=this.state.data.slice()
          newdata[1].sold=max_transport
          newdata[2].sold=max_receive
          this.setState({
            data:newdata
          })
        }



        }


    })


  }
  updateData(){
    let newdata=this.state.data.slice()
    newdata[0].sold=Math.floor(Math.random()*10)
    newdata[1].sold=Math.floor(Math.random()*20)
    newdata[2].sold=Math.floor(Math.random()*150)
    newdata[3].sold=Math.floor(Math.random()*15)
    newdata[4].sold=Math.floor(Math.random()*15)
    this.setState({
      data:newdata
    })
  }
  render() {

    //渲染图标
    const scales = {
      sold: { alias: '数据指标' },
      genre: { alias: '性能数据分析' },
    };
    return (
      <div>
        <div style={{float:'left'}}>
          <Chart
            width={1000}
            height={400}
            data={this.state.data}
            scale={scales}
            padding="auto"


          >
            <Axis name="sold" title/>
            <Axis name="genre" title/>
            <Geom
              type="interval"
              position="genre*sold"
              color={['genre', '#E6F6C8-#3376CB']}
              select={[
                true,
                {
                  mode: 'single', // 选中模式，单选、多选
                  style: {
                    stroke: '#2C9D61',
                    lineWidth: 3,
                  }, // 选中后 shape 的样式
                  cancelable: false, // 选中之后是否允许取消选中，默认允许取消选中
                  animate: true, // 选中是否执行动画，默认执行动画
                },
              ]}
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

export default Charts2
