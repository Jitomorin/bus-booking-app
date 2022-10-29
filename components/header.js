import Link from "next/link";
import React, { useContext } from "react";
import Image from "next/image";
import LogoTrans from "../public/logo/classic_coast_logo_trans.svg";
import { authContext, useAuthContext } from "../context/UserContext";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/router";

const Header = () => {
  const authContext = useAuthContext();
  const router = useRouter();
  return (
    <div>
      <nav className="bg-white  shadow ">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className="w-full justify-between flex items-center">
              <Link className="flex-shrink-0 cursor-pointer" href="/">
                <Image
                  src={LogoTrans}
                  width={150}
                  height={150}
                  alt="Classic Coast Logo"
                />
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-11">
                  <Link
                    className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/#"
                  >
                    Home
                  </Link>

                  <Link
                    className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/how_section"
                  >
                    How it works
                  </Link>
                  <Link
                    className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/#"
                  >
                    <button
                      onClick={() => {
                        console.log(authContext.currentUser.admin);
                      }}
                      className="bg-pink_red rounded-md p-2 text-white"
                    >
                      Book now
                    </button>
                  </Link>
                  <a
                    onClick={async () => {
                      await auth
                        .signOut()
                        .then(() => {
                          console.log("signed out");
                        })
                        .catch((error) => {
                          console.log(error);
                        });

                      router.push("/login");
                    }}
                    className="underline text-pink_red cursor-pointer"
                  >
                    Log Out
                  </a>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="ml-4 flex items-center md:ml-6"></div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="h-8 w-8"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                    Home
                </Link>
            
                <Link className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                    How it works
                </Link>
                <Link className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                    <button className='bg-pink_red rounded-md p-2 text-white'>Book now</button>
                </Link>
            </div>
        </div> */}
      </nav>
    </div>
  );
};

export default Header;
