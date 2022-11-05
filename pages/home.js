import React, { useContext, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import Header from "../components/header";
import { authContext, useAuthContext } from "../context/UserContext";
import DatePicker from "react-datepicker";
import LoadingAnimaton from "../public/loading_anim.webp";
import Image from "next/image";
import { getStops, setStops } from "../firebase/firestore";
import { firestore } from "../firebase/firebase";
import Select from "react-select";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";

const Home = () => {
  const  {currentUser,isUserLoading} = useAuthContext();
  const router = useRouter();
  const [amount, setAmount] = useState(1);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [stops, setStops] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");
  var route_uid

  const getOptions = () => {
    const options = stops.map((stop) => {
      return { value: stop.name, label: stop.name };
    });
    return options;
  };
  // const isUserLoggedIn = () => {
  //   if (authContext.user) {
  //   } else {
  //     routes.push("/login");
  //   }
  // };

  const getRoutes = async () => {
    setLoading(true);
    await firestore
      .collection("routes")
      .where("from.name", "==", selectedFrom)
      .where("to.name", "==", selectedTo)
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.docs.forEach((doc) => {
          data = doc.data();
        });

        route_uid = data.uid;
      });
    setLoading(false);
  };
  useEffect(() => {
      
    if (!isUserLoading && !currentUser) {
      console.log('something is wrong')
      console.log(isUserLoading)
      console.log(currentUser)
      router.push("/");
    } 

    const getStopsList = async () => {
      await firestore
        .collection("stops")
        .get()
        .then(function (snapshot) {
          const data = [];
          snapshot.docs.forEach((doc) => {
            data.push(doc.data());
          });
          setStops(data);
        });
    };
    getStopsList();
    // setToOptions(getToOptions());
    // getToOptions().then((options) => {
    //   console.log(options);
    //   setToOptions(options);
    // });
  }, [currentUser,isUserLoading]);
  const options = getOptions();
  // function timeout(delay) {
  //   return new Promise((res) => setTimeout(res, delay));
  // }
  // isUserLoggedIn();
  if (isUserLoading) {  
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Image src={LoadingAnimaton} alt="Loading..." />
      </div>
    );
  } else {
    return (
    <div className="min-h-screen w-screen">
      <Header />
      <div className="bg-[url('../public/images/stock-banner.jpg')] bg-no-repeat bg-cover bg-center h-[40vh] relative ">
        <div className="absolute inset-x-0 bottom-0 flex flex-row justify-center ">
          <div className="bg-white p-3 rounded-t-md flex">
            {/* <input
              className=" p-3  focus:outline-none"
              type="text"
              placeholder="From"
            /> */}
            <Select
              className="outline-none p-3 focus:outline-none"
              options={options}
              placeholder="From"
              onChange={(e) => {
                setSelectedFrom(e.value);
              }}
            />
            {/* <input
              className="border-l-2 p-3 focus:outline-none"
              type="text"
              placeholder="To"
            /> */}
            <Select
              className="outline-none p-3 focus:outline-none"
              options={options}
              placeholder="To"
              onChange={(e) => {
                setSelectedTo(e.value);
              }}
            />
            <input
              className="border-l-2 p-3"
              type="number"
              value={amount}
              min={1}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
            <input
              className="border-l-2 p-3"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              //only dates after today including today can be selected
              min={new Date().toISOString().split("T")[0]}
              placeholder="Date"
            />
            <button
              onClick={async () => {
               
                await getRoutes().then((data) => {
                  console.log(route_uid);

                  router.push(
                    {
                      pathname: "/results",
                      query: {
                        route: route_uid,
                        from: selectedFrom,
                        to: selectedTo,
                        amount: amount,
                        date: date,
                      },
                    },
                    "/results"
                  );
                });
                // console.log(r_uid);
              }}
              className="bg-pink_red rounded-md p-2 text-white mx-2"
            >
              {loading ? "Loading..." : "Book Now"}
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
  }
};

export default Home;
