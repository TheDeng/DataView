/* eslint-disable import/extensions */
import React, {useEffect, useState} from 'react';
import { useHistory,Link } from 'react-router-dom';
import { Form, Input, Checkbox, Button, Icon, message } from 'antd';
import { observer } from 'mobx-react';
import {getInviteCode,Test} from "../../api";
import { appStores } from '@/stores';
import './style.less';

const Index = props => {
  const {
    form: { getFieldDecorator },
  } = props;

  const history = useHistory();
  const { globalStore } = appStores();
  const [code,setCode]=useState("")


  const handleSubmit = e => {
    e.preventDefault();
    console.log(sessionStorage.getItem("isAdmin"))
    if(sessionStorage.getItem("isAdmin")=="false"){

      alert('非常抱歉，只有管理员才可以生成邀请码');
      history.push('/home');
      return

    }

    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('注册信息 ', values);
        console.log("调用接口")

        getInviteCode().then(res=>{
          let invite_code=res.data.invite_code
          console.log(invite_code)
          setCode(invite_code)
        })


      }
    });
  };




    return (
      <div className="page-login">
        <Form onSubmit={handleSubmit} className="login-form">
          <div className="login-title">获取邀请码</div>
          {/*<Form.Item>*/}
          {/*  {getFieldDecorator('username', {*/}
          {/*    rules: [{ required: true, message: '请输入用户名！' }],*/}
          {/*  })(*/}
          {/*    <Input*/}
          {/*      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}*/}
          {/*      placeholder="用户名"*/}
          {/*    />,*/}
          {/*  )}*/}
          {/*</Form.Item>*/}
          <Form.Item  style={{height:"60px"}}>

            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text"
              value={code}
              placeholder="邀请码"
            />,

          </Form.Item>

          {/*<Link to={'/register'}><p style={{textAlign:'center'}}>返回注册</p></Link>*/}

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              获取邀请码
            </Button>
          </Form.Item>
        </Form>
      </div>
    );


};

export default Form.create({ name: 'login' })(observer(Index));
