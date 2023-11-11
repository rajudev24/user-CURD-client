import { BiSolidLockAlt } from "react-icons/bi";
import { Input, Button } from "antd";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: data.email,
      password: data.password,
    };
    try {
      const url = "http://localhost:5000/api/v1/user/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const responseData = await response.json();
      if (responseData.statusCode === 200) {
        toast.success(responseData.message);
        setTimeout(() => {
          navigate("/users");
        }, 2000);
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex  justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-[#323B4B] py-2">
          Getting Started
        </h1>
        <p className="text-[#8A94A6] pb-2">Create an account to continue!</p>
        <div className="w-[600px]">
          <Input
            className="h-10 my-5 border-2 w-3/4"
            placeholder="@ Your Email"
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            rules={[{ required: true, message: "Please enter your email!" }]}
          />

          <Input.Password
            className="h-10 my-5 border-2 w-3/4"
            placeholder="Create Password"
            prefix={<BiSolidLockAlt className="text-[#C1C7D0] " />}
            type="password"
            required
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>

        <Button
          onClick={handleFormSubmit}
          className=" bg-[#377DFF] w-3/4 h-10 text-lg text-white hover:bg-white my-4"
        >
          Sign In
        </Button>

        <div className="m-4">
          Don’t have an account yet?{" "}
          <Link to="/" className="text-[#377DFF]">
            Sign Up
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
