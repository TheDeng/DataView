import React , {Fragment} from "react";
import './HomeStyles.css'
import DataPane from "./DataPane";
import CpuUseCharts from "./CpuUseCharts";
import CpuPayloadCharts from "./CpuPayloadCharts";
import NetworkChart from "./NetworkChart";
import TestCharts from "./TestCharts";
import Charts2 from "./Charts2";
class Home extends React.Component{
  componentDidMount() {
    this.forceUpdate()
  }

  render() {
    return(
      <div>
        <div className={'container'}>
        <div className={'pane-container'}>
          <DataPane></DataPane>
        </div>


          <div className={'cpuchart1'} >
            <NetworkChart ></NetworkChart>
          </div>


          <div className={'cpuchart1'}>
            <CpuUseCharts  ></CpuUseCharts>

          </div>


          <div className={'cpuchart1'} >
            <Charts2></Charts2>
          </div>
          {/*<div className={'cpuchart1'} >*/}
          {/*  <CpuPayloadCharts ></CpuPayloadCharts>*/}
          {/*</div>*/}

          <div className={'cpuchart1'} >
            <TestCharts ></TestCharts>
          </div>






        </div>
      </div>
    )
  }
}


export default Home
