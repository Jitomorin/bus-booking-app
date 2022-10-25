import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/router";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    auth.signInWithEmailAndPassword(email, password).then((authUser) => {
      console.log("Log in successful!");
      setIsLoading(false);
      router.push("/home");
    });
  };

  return (
    <div className=" min-h-screen w-screen bg-bg_color">
      <h1 className="text-dark_blue  font-khand font-bold text-center text-4xl">
        Log In
      </h1>
      <div className="flex flex-col space-y-10 w-1/4 mx-auto mt-10   ">
        <input
          onChange={(value) => {
            setEmail(value.target.value);
          }}
          className="bg-white text-black h-10 p-3 rounded-lg focus:outline-none"
          placeholder="Email"
        />
        <input
          onChange={(value) => {
            setPassword(value.target.value);
          }}
          className="bg-white text-black h-10 p-3 rounded-lg focus:outline-none"
          type="password"
          placeholder="Password"
        />
        <button
          onClick={login}
          className="border-4 bg-pink_red p-2 w-3/4 mx-auto rounded-xl"
        >
          {isLoading ? "Loading..." : "Log In"}
        </button>
        {/* here the signup link */}
        <div className="flex space-x-2 mx-auto">
          <span className="text-dark_blue">{"Don't have an Account? "}</span>
          <Link href="/signup">
            <span className="text-pink_red underline cursor-pointer">
              Sign Up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
