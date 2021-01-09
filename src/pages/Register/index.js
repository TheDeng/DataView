/* eslint-disable import/extensions */
import React, {useEffect, useReducer} from 'react';
import { useHistory,Link } from 'react-router-dom';
import { Form, Input, Checkbox, Button, Icon, message } from 'antd';
import { observer } from 'mobx-react';
import {Register} from "../../api";
import { appStores } from '@/stores';
import './style.less';

const RegiterPane = props => {
  const {
    form: { getFieldDecorator },
  } = props;

  const history = useHistory();
  const { globalStore } = appStores();



  const handleSubmit = e => {


    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('注册信息 ', values);
        console.log("调用接口")
        let code=values.invite_code
        let passwd=values.password
        let repasswd=values.repassword
        if(passwd.length<6||passwd.length>20){
          alert("密码必须在6到20位之间，请重试")
          return
        }
        if(passwd!=repasswd){
          alert("两次密码不相同，请重试")
          return
        }
        Register(code,passwd).then((res)=>{
          console.log(res)
          if(res.data){
            let str=res.data
            let newstr = str.replaceAll("\'", "\"")
            let obj=JSON.parse(newstr)
            console.log(obj)
            if(obj.isSignin=="true"&&obj.type==0){
              let userid=obj.usr_id
              console.log(userid)
              alert(`恭喜你注册成功，您的ID是${userid},请牢记！`)
              message.success('注册成功，即将跳转...', 1);
              setTimeout(() => {
                history.push('/login');
              }, 1000);
            }else{
              if(obj.type==1){
                alert("该邀请码不存在或已经被使用,请重新获取邀请码")
              }
              if(obj.type==2){
                alert("密码不符合要求")
              }
              if(obj.type==-1){
                alert("未知错误，请重试")
              }



            }

          }
        }).catch(err=>{
          console.log(err)
        })

      }
    });
  };


  return (
    <div className="page-login">
      <Form onSubmit={handleSubmit} className="login-form">
        <div className="login-title">欢迎注册</div>
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
        <Form.Item>
          {getFieldDecorator('invite_code', {
            rules: [{ required: false, message: '请输入邀请码' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text"
              placeholder="邀请码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('repassword', {
            rules: [{ required: true, message: '请确认密码！' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>

        <Form.Item>
          <div>
            <Link to={'/login'}><p style={{textAlign:'center'}}>返回登录</p></Link>

          </div>

          <Button type="primary" htmlType="submit" className="login-form-button">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create({ name: 'login' })(observer(RegiterPane));
