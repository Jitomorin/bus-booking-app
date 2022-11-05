import React from "react";
import { authContext, useAuthContext } from "../context/UserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoggedIn = () => {
  const { authContext, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authContext) {
      router.push("/login");
    } else {
      router.push("/home");
    }
  }, [authContext, loading]);
};

export default LoggedInc;
