import { useContext } from 'react'
import { authContext, useAuthContext } from '../context/UserContext'
import { useRouter } from "next/router";

const AuthCheck = ({ children }) => {
  const router=useRouter()
  const authContext=useAuthContext()
  if (!authContext.currentUser) {
    return router.push("/login");
  }
  return router.push("/home");
}

export default AuthCheck