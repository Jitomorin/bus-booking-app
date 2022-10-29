import React, { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { auth, firestore } from "../firebase/firebase";
import { addUser } from "../firebase/firestore";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import LogoTrans from '../public/logo/classic_coast_logo_trans.svg'

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [IDnum, setIDnum] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const passwordCheck = () => {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  const signUp = async () => {
    setIsLoading(true);
    if (passwordCheck()) {
      auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
        console.log("uid: " + authUser.user.uid);
        firestore
          .collection("users")
          .doc(authUser.user.uid)
          .set({
            email: email,
            fullname: fullname,
            IDnum: IDnum,
            admin: false,
            uid: authUser.user.uid,
          })
          .then(() => {
            console.log("user added to database!");
            router.push("/login");
          });
      });
    }
  };

  return (
    <div className=" min-h-screen w-screen bg-bg_color">
      <div className="flex flex-col space-y-8 w-1/4 mx-auto   ">
        <div className="mx-auto w-64 h-48 overflow-hidden"><Image  src={LogoTrans} alt="Classic Coast Logo" /></div>
        <h1 className="text-dark_blue  font-khand font-bold text-center text-4xl ">
          Sign Up
        </h1>
        <input
          onChange={(value) => {
            setFullname(value.target.value);
          }}
          className="bg-white text-black h-10 p-3 rounded-lg focus:outline-none"
          placeholder="Full Name"
        />
        <input
          onChange={(value) => {
            setEmail(value.target.value);
          }}
          className="bg-white text-black h-10 p-3 rounded-lg focus:outline-none"
          placeholder="Email"
        />
        <input
          onChange={(value) => {
            setIDnum(value.target.value);
          }}
          className="bg-white text-black h-10 p-3 rounded-lg focus:outline-none"
          placeholder="ID number"
          type="number"
        />
        <input
          onChange={(value) => {
            setPassword(value.target.value);
          }}
          className="bg-white text-black h-10 p-3 rounded-lg focus:outline-none"
          type="password"
          placeholder="Password"
        />
        <input
          onChange={(value) => {
            setConfirmPassword(value.target.value);
          }}
          className="bg-white text-black h-10 p-3 rounded-lg focus:outline-none"
          type="password"
          placeholder="Confirm Password"
        />
        <button
          onClick={signUp}
          className="border-4 bg-pink_red text-white p-2 w-3/4 mx-auto rounded-xl"
        >
          {isLoading ? "Loading..." : "Continue"}
        </button>
        {/* Login Link */}
        <div className="flex space-x-2 mx-auto pb-4">
          <span className="text-dark_blue">{"Already have an Account? "}</span>
          <Link href="/login">
            <span className="text-pink_red underline cursor-pointer">
              Log In
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
