import React, {Fragment} from "react";
import {Button} from "antd";
import './HomeStyles.css'
import RefreshButton from "./Components/RefreshButton";
import {getPerformance} from "../../api";


class DataPane extends React.Component{
  constructor(props) {
    super(props);
    const date=new Date()
    const dateString=date.getFullYear().toString()+"0"+(date.getMonth()+1).toString()+(date.getDate()).toString()
    this.state={
      ip:"175.24.40.189",
      date:"20200423",
      alertnum:20,
      loginnum:10,
      exitnum:10,
      nodenum:5
    }
  }

  update(){
    this.updateData()
    getPerformance(this.state.ip,this.state.date).catch(err=>{
      this.setState({
        loginnum:Math.floor(Math.random()*15),
      })
    }).then(res=>{
      //成功获取后台数据，用后台数据覆盖生成数据
      if(res&&res.data){
        let result=res.data.performance[0]
        if(result){

          let user_num=result.user_num

          if(user_num){


            this.setState({
              loginnum:user_num
            })

          }


        }

      }

    })

  }
  updateData(){
    this.setState({
      alertnum:Math.floor(Math.random()*35),

      exitnum:Math.floor(Math.random()*15)
    })
  }
  render() {
    return(
      <Fragment>
        <div  style={{height:'150px',width:'950px',lineHeight:'150px'}}>

          <Button className={'data-alert'} type={'danger'}>警报数:{this.state.alertnum}</Button>
          <Button className={'data-alert'} type={'danger'}>登录用户:{this.state.loginnum}</Button>
          <Button className={'data-alert'} type={'danger'}>离线数:{this.state.exitnum}</Button>
          <Button className={'data-alert'} type={'danger'}>节点数:{this.state.nodenum}</Button>

        </div>

        <div style={{textAlign:'center',width:'950px'}} >
          <RefreshButton callback={this.update.bind(this)}></RefreshButton>
        </div>
      </Fragment>
    )
  }
}


export default DataPane
