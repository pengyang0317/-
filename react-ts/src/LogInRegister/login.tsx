import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import { connect } from 'react-redux';
import './login.scss';
import { Tabs } from 'antd';
import API from '../api/api';
import {getCode} from '../api/login'
import { loginFinish ,isShow} from '../type';

const { Home } = API;

const { TabPane } = Tabs;

const layout = {
	labelCol: { span: 2 },
	wrapperCol: { span: 8 }
};
const tailLayout = {
	wrapperCol: { offset: 2, span: 8 }
};

// 找回密码弹出框

const retrievepasswordPages = (isShowFun: isShow) => {
	return (
		<Modal
			title="忘记密码"
			onOk={() => isShowFun(false)}
			onCancel={() => isShowFun(false)}
			visible={true}
			footer={null}
		
		>
			<Form
				name="basic"
				initialValues={{ remember: true }}	
				//   onFinish={onFinish}
				//   onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label="用户名"
					name="username"
					rules={[ { required: true, message: '请输入用户名' } ]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="邮　箱"
					name="email"
					rules={[ { required: true, message: '请输入邮箱' } ]}
				>
					<Input />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						提交
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

const Login = (val: string) => {
	let loginOrRegister = val === '1' ? '登录' : '注册';
	let [ verificationcode, setVerificationcode ] = useState();
	let [ retrievepasswordvisible, setRetrievepasswordvisible ] = useState(false);
	const [ form ] = Form.useForm();
	const onFinish = (values: loginFinish) => {
		if (loginOrRegister === '注册') {
			Home.registereduser(values).then((res) => {
				console.log(res.data);
			});
		} else {
			console.log(`我是登录${values}`);
			Home.loginUser(values).then((res: { code?: string; data?: object; message?: string }) => {
				if (res.code === '0000') {
					message.success(res.message);
				} else {
					message.error(res.message);
				}
			});
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log(form.getFieldsValue());
		console.log('Failed:', errorInfo);
	};
	const changeVerification = () => {
		_getCode();
	};

	const forgetPassword = () => {
		console.log('忘记密码');
		setRetrievepasswordvisible(true);
		// Home.send().then(res => {
		// 	console.log(res)
		// })
	};

	useEffect(() => {
		_getCode();
	}, []);
	const _getCode = () => {
		getCode().then(res => {
			setVerificationcode(res.data);
		})
	};
	return (
		<Form
			{...layout}
			name="basic"
			initialValues={{ remember: false }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			form={form}
		>
			<Form.Item label="用户名：" name="username" rules={[ { required: true, message: '请在输入框内填写用户名' } ]}>
				<Input placeholder="请输入用户名" />
			</Form.Item>
			{loginOrRegister === '注册' && (
				<div>
					<Form.Item label="昵称：" name="nickname" rules={[ { required: true, message: '请输入昵称' } ]}>
						<Input placeholder="请输入昵称" />
					</Form.Item>
					<Form.Item
						label="邮箱："
						name="email"
						rules={[
							{ required: true, message: '请输入邮箱' },
							{
								pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
								message: '邮箱格式错误'
							}
						]}
					>
						<Input placeholder="请输入邮箱" />
					</Form.Item>
				</div>
			)}
			<Form.Item label="密码：" name="password" rules={[ { required: true, min: 6, message: '密码长度不能小于6' } ]}>
				<Input.Password placeholder="请输入密码" />
			</Form.Item>
			{loginOrRegister === '注册' && (
				<Form.Item
					label="确认密码："
					name="determinePassword"
					rules={[
						{ required: true, message: '请在输入框内填写密码' },
						({ getFieldValue }) => ({
							validator(rule, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(`两次密码不一致`);
							}
						})
					]}
				>
					<Input.Password placeholder="请输入密码" />
				</Form.Item>
			)}
			<Form.Item label="验证码：" name="code" rules={[ { required: true, message: '请在输入框内输入验证码' } ]}>
				<div className="collection-code">
					<Input placeholder="请输入验证码" />
					<span
						className="verificationcode-wrappre"
						onClick={changeVerification}
						dangerouslySetInnerHTML={{ __html: verificationcode }}
					/>
				</div>
			</Form.Item>
			{loginOrRegister === '登录' ? (
				<Form.Item>
					<Form.Item {...tailLayout}>
						<Button type="primary" htmlType="submit">
							立即登录
						</Button>
					</Form.Item>
					<div className="forget-password-wrapper" onClick={forgetPassword}>
						忘记密码？
					</div>
				</Form.Item>
			) : (
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						注册
					</Button>
				</Form.Item>
			)}
			{retrievepasswordvisible && retrievepasswordPages(setRetrievepasswordvisible)}
		</Form>
	);
};

const HeaderTab = (defaultActiveKey: string, changeKkey: ((activeKey: string) => void) | undefined) => (
	<Tabs defaultActiveKey={defaultActiveKey} onChange={changeKkey}>
		<TabPane tab="登录" key="1">
			{ defaultActiveKey == "1" && Login('1')}
		</TabPane>
		<TabPane tab="注册" key="2">
			{defaultActiveKey == "2" &&Login('2')}
		</TabPane>
	</Tabs>
);

const NormalLoginForm = (props: any) => {
	const { dispatch, history } = props;
	const changeKkey: (e: any) => void = (e) => {
		dispatch({ type: 'CHANGEACTIVEKEY', data: e });
		e === '1' ? history.push('login') : history.push('register');
	};
	let { defaultActiveKeyHome } = props;
	return <div className="login-form">{HeaderTab(defaultActiveKeyHome, changeKkey)}</div>;
};

export default connect((state) => state)(NormalLoginForm);
