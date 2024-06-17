import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LabelledInput from "./LabelledInput";
import axios from "axios";

function Auth_signin() {
  const [postInputs, setPostInputs] = useState<{
    username: string;
    password: string;
    user_name:string;
    phone_number:string;
  }>({ username: "", password: "" });

    const navigate = useNavigate();
  

  const sendRequest = async () => {
    //end point https://backend.sonivivek346.workers.dev/api/v1/users
    console.log(postInputs.password);
    console.log(postInputs.username);
    const response = await axios.post(
      "https://backend.sonivivek346.workers.dev/api/v1/user/signin",
      { email: postInputs.username, password: postInputs.password }
    );
    navigate("/blog");
    console.log(response.data);
    return;
  };

  return (
    <div className="flex justify-center ">
      <div className="flex justify-center flex-col">
  
        <div className="text-4xl font-extrabold">Login to your Account</div>
        <div className="text-l mt-2 mb-2 font-medium text-slate-600">
          Don't have an account?{" "}
          <Link to={"/signup"} className="underline">
            SignUp
          </Link>
        </div>
        <LabelledInput
          label="Name"
          placeholder="Vivek soni..."
          type="text"
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              username: e.target.value,
            });
          }}
        ></LabelledInput>
        {/* password */}
        <LabelledInput
          label="Password"
          placeholder="123456"
          type="password"
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              password: e.target.value,
            });
          }}
        ></LabelledInput>

        <button
          type="button"
          onClick={sendRequest}
          className=" mt-5 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Sign-up
        </button>
      </div>
    </div>
  );
}

export default Auth_signin;
