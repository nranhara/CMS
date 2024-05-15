import React, { useEffect } from "react";
import { Button, Divider, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";

const rules = [
  {
    required: true,
    message: "required",
  },
];

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await RegisterUser(values);
      dispatch(SetLoader(false));

      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen bg-secondary flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[450px]">
        <h1 className="text-primary text-2xl flex justify-center">
          DoNation- <span className="text-gray-400">User Register</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={rules}>
            <Input placeholder="Name" type="text" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" type="email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={rules}>
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button
            type="primary"
            name="register"
            htmlType="submit"
            block
            className="mt-2"
          >
            Register
          </Button>

          <div className="mt-2 text-center">
            <span className="text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;