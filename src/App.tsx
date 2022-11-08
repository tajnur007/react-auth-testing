import { FC, FormEvent, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

import './App.css';
import 'antd/dist/antd.css';

const App: FC = () => {
  const [user, setUser] = useState(null);

  const handleOnFinish = (values: any) => {
    console.log('Success:', values);
    setUser(values);
  };

  const handleOnFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleLogout = () => {
    setUser(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        {!user ? (
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={handleOnFinish}
            onFinishFailed={handleOnFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div>
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
