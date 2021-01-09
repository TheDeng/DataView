import React from 'react';

import './style.less';
import {Table,Card} from "antd";
const columns = [
  {
    title: '告警信息',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '负责人信息',
    dataIndex: 'type',
    width: 60,
  },
  {
    title: '主要负责人',
    dataIndex: 'model',
    width: 80,
  },
  {
    title: '联系方式',
    dataIndex: 'status',
    width: 100,
  },
];
class AlertPage extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      data:this.getData()
    }
  }
  getData(){
    let tempdata=[]
    let alertType=["cpu告警","分区告警","下载告警","上传告警"]
    let member=["小明","小王","小刘","小张"]
    let phone=["18888888888","16666666666","15555555555"]
    for (let i = 0; i < 20; i += 1) {
      tempdata.push({
        key: i,
        name: `${alertType[Math.floor(Math.random()*4)]}${i}`,
        type: `项目运营组`,
        model: `${member[Math.floor(Math.random()*4)]}`,
        status: `${phone[Math.floor(Math.random()*3)]}`,
      });
    }
    return tempdata
  }
  render() {
    return(
      <div className={'container'}>
        <Card className={'alertcard'} title="告警">
          <div>
            <Table

              columns={columns}
              dataSource={this.state.data}
              pagination={{ pageSize: 10 }}
              scroll={{ y: 240 }}
            />
          </div>
        </Card>
      </div>
    )
  }
}

export default AlertPage;
