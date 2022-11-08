import { FC, useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Space, Spin } from 'antd';

import './App.css';
import 'antd/dist/antd.css';

interface UserDataType {
  email: string;
  password: string;
  remember: boolean;
}

const App: FC = () => {
  const [user, setUser] = useState<UserDataType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDisable, setIsDisable] = useState<boolean>(true);

  useEffect(() => {
    const credentials = localStorage.getItem('credentials');
    credentials ? setUser(JSON.parse(credentials)) : setUser(null);
    setIsLoading(false);
    console.log('credentials', credentials);
  }, []);

  const handleOnFinish = (values: any) => {
    console.log('Success:', values);
    setUser(values);
    localStorage.setItem('credentials', JSON.stringify(values));
  };

  const handleOnFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('credentials');
  }

  const handleValidation = async (_: any, value: string) => {
    if (!value.length) {
      return Promise.resolve();
    }
    if ((!value.includes('@') || !value.includes('.'))) {
      return Promise.reject(new Error('Enter a valid email'));
    }
  }

  if (isLoading) {
    return (
      <div className="App">
        <header className="App-header">
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </header>
      </div>
    )
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
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email' },
                { validator: handleValidation }
                // { type: 'email', message: 'Enter a valid email' },
                // { pattern: /taj/, message: 'Must include "taj"', warningOnly: true, }
              ]}
            >
              {/* <Input onChange={(e) => setIsDisable(!(/taj/.test(e.target.value)))} /> */}
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
              <Button type="primary" htmlType="submit" disabled={isDisable}>
                Login
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div>
            <div>
              User email: {user?.email} <br />
              Password: {user.password}
            </div>

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
