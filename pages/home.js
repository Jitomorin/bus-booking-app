import React, { useContext } from "react";
import Header from "../components/header";
import { authContext } from "../context/UserContext";

const Home = () => {
  const { currentUser } = useContext(authContext);
  return (
    <div className="min-h-screen w-screen">
      <Header />
      <div className="bg-[url('../public/images/stock-banner.jpg')] bg-no-repeat bg-cover bg-center h-[40vh] relative ">
        <div className="absolute inset-x-0 bottom-0 flex flex-row justify-center ">
          <div className="bg-white p-3 rounded-t-md">
            <input
              className=" p-3  focus:outline-none"
              type="text"
              placeholder="From"
            />
            <input
              className="border-l-2 p-3 focus:outline-none"
              type="text"
              placeholder="To"
            />
            <input
              className="border-l-2 p-3  focus:outline-none"
              type="text"
              placeholder="Amount"
            />
            <button className="bg-pink_red rounded-md p-2 text-white mx-2">
              Book now
            </button>
          </div>
        </div>
      </div>
      <section className="my-14" id="how_section">
        <h1 className="text-center text-4xl">How it works</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 justify-center space-x-8 items-center  my-6">
          <div className="flex-col space-y-5">
            <h3 className="text-xl text-center">Book</h3>
            <div className="bg-[url('../public/images/book.jpg')] bg-cover h-56 w-64 rounded-md mx-auto"></div>
            <p className="text-center">Book your seat</p>
          </div>
          <div className="flex-col space-y-5">
            <h3 className="text-xl text-center">Pay</h3>
            <div className="bg-[url('../public/images/pay.jpg')] bg-cover h-56 w-64 rounded-md mx-auto"></div>
            <p className="text-center">Pay for your ticket</p>
          </div>
          <div className="flex-col space-y-5">
            <h3 className="text-xl text-center">Ticket</h3>
            <div className="bg-[url('../public/images/book.jpg')] bg-cover h-56 w-64 rounded-md mx-auto"></div>
            <p className="text-center">Print or present digitally</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
