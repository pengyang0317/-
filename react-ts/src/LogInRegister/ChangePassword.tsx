import React from 'react';
import { Form, Input, Button } from 'antd';
import './login.scss';

const layout = {
	labelCol: { span: 2 },
	wrapperCol: { span: 6 }
};
const tailLayout = {
	wrapperCol: { offset: 2, span: 6 }
};

const ChangePassword = () => {
	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<div className="login-form">
			<Form
				{...layout}
				name="basic"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label="密码"
					name="password"
					rules={[ { required: true, min: 6, message: '密码长度不能小于6' } ]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					label="确认密码"
					name="confirmPassword"
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
					<Input.Password />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						确认修改密码
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default ChangePassword;
