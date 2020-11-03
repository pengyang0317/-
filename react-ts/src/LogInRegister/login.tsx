import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox,message } from 'antd';
import { connect } from 'react-redux';
import './login.scss';
import { Tabs } from 'antd';
import API from '../api/api';
const { Home } = API;

const { TabPane } = Tabs;

const layout = {
	labelCol: { span: 2 },
	wrapperCol: { span: 8 }
};
const tailLayout = {
	wrapperCol: { offset: 2, span: 8 }
};


const Login = (val: string) => {
	let loginOrRegister = val === '1' ? '登录' : '注册';
	let [verificationcode,setVerificationcode] = useState()
	let [verificationcodeText,setVerificationcodeText] = useState('')
	const onFinish = (values: loginFinish) => {
		console.log('Success:', values);
		if(loginOrRegister === "注册"){
			Home.registereduser(values).then(res => {
				console.log(res.data)
			})
		}else{
			console.log(`我是登录${values}`)
			Home.loginUser(values).then((res: {
				code?: string, data?: object, message?: string
			})=> {
				
				if(res.code === '0000'){
					message.success(res.message);
				}else{
					message.error(res.message);
				}
			})
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	const changeVerification = () => {
		getCode()
	}
	const forgetPassword = () => {
		console.log("忘记密码")
		Home.send().then(res => {
			console.log(res)
		})
	}

	useEffect(() => {
		if (loginOrRegister === '登录') {
			getCode()
		}
	}, []);
	const getCode = ( ) => {
		Home.getVerificationCode().then(res => {
			setVerificationcode(res.data.data)
			setVerificationcodeText(res.data.text)
		})
	}
	return (
		<Form
			{...layout}
			name="basic"
			initialValues={{ remember: false }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		>
			<Form.Item label="用户名：" name="username" rules={[ { required: true, message: '请在输入框内填写用户名' } ]}>
				<Input />
			</Form.Item>

			<Form.Item label="密码：" name="password" rules={[ { required: true, message: '请在输入框内填写密码' } ]}>
				<Input.Password />
			</Form.Item>
			{
				loginOrRegister === "注册" &&  (
					<Form.Item label="确认密码：" name="determinePassword" rules={[ 
						{ required: true, message: '请在输入框内填写密码' } ,
						({ getFieldValue }) => ({
							validator(rule, value) {
							  if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							  }
							  return Promise.reject(`两次密码不一致`);
							},
						  }),
						]}>
				<Input.Password />
			</Form.Item>
				)
			}
			
			{loginOrRegister === '登录' && (
				<Form.Item label="验证码：" >
					<Form.Item name="verificationCode" noStyle
						rules={[ 
							{ required: true, message: '请在输入框内输入验证吗' } ,
							({ getFieldValue }) => ({
								validator(rule, value) {
								console.log(verificationcodeText)
								console.log(value)
								  if (!value || verificationcodeText === value) {
									return Promise.resolve();
								  }
								  return Promise.reject(`验证码错误`);
								},
							  }),
						]}
					>
						<Input style={{ width: 160 }}  />
					</Form.Item>
					<span className="verificationcode-wrappre" onClick={changeVerification} dangerouslySetInnerHTML={{__html: verificationcode}}></span>
				</Form.Item>
			)}
			{loginOrRegister === '登录' && (
				<Form.Item {...tailLayout} name="remember" valuePropName="checked">
					<Checkbox>记住选项</Checkbox>
				</Form.Item>
			)}

			{loginOrRegister === '登录' ? (
				<Form.Item>
					<Form.Item {...tailLayout}>
						<Button type="primary" htmlType="submit">
							登录
						</Button>
					</Form.Item>
					<div className="forget-password-wrapper" onClick={forgetPassword}>忘记密码？</div>
				</Form.Item>
			) : (
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						注册
					</Button>
				</Form.Item>
			)}
		</Form>
	);
};

const HeaderTab = (defaultActiveKey: string , changeKkey: ((activeKey: string) => void) | undefined) => (

 	<Tabs defaultActiveKey={defaultActiveKey} onChange={changeKkey}>
		<TabPane tab="登录" key="1">
			{Login('1')}
		</TabPane>
		<TabPane tab="注册" key="2">
			{Login('2')}
		</TabPane>
	</Tabs> 
);

const NormalLoginForm = (props: any) => {
	console.log(props);
	const {dispatch,history} = props;
	const changeKkey: (e:any) => void = (e) => {
		dispatch({type:'CHANGEACTIVEKEY',data: e})
	
		e === '1' ? history.push('login') : history.push('register');
	}
	let { defaultActiveKeyHome } = props;
	return <div className="login-form">{HeaderTab(defaultActiveKeyHome,changeKkey)}</div>;
};

export default connect((state) => state)(NormalLoginForm);
