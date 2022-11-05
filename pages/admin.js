import Image from "next/image";
import React from "react";
import Routes from "../components/routes";
import BusLogo from "../public/bus-solid.svg";
import RoutesLogo from "../public/route-solid.svg";
import BookingLogo from "../public/ticket-solid.svg";
import Header from "../components/header";
import Busses from "../components/busses";
import Bookings from "../components/bookings";
import { useAuthContext } from "../context/UserContext";
import LoadingAnimaton from "../public/loading_anim.webp";


const Admin = () => {
  const {
    currentUser,
   isUserLoading
  } = useAuthContext();
  if (isUserLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Image src={LoadingAnimaton} alt="Loading..." />
      </div>
    );
  } else {
    return (
    <section className="min-h-screen w-screen">
      <Header />
      <div className="w-full h-1/3 px-10">
        <Routes />
      </div>
      <div className="w-full h-1/3 px-10">
        <Busses />
      </div>
      <div className="w-full h-1/3 px-10 mb-10">
        <Bookings/>
      </div>
    </section>
  );
  }
};

export default Admin;
