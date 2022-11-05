import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Feedback from "../components/feedback";
import Header from "../components/header";
import { useAuthContext } from "../context/UserContext";
import { firestore } from "../firebase/firebase";
import { addBooking, addBusses } from "../firebase/firestore";
import ArrowRightLogo from "../public/arrow-right-solid.svg";
import BusLogo from "../public/bus-solid.svg";
import LoadingAnimaton from "../public/loading_anim.webp";

const DailogBox = (props) => {
  const [stops, setStops] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState();
  const [selectedTo, setSelectedTo] = useState();
  const [selectedBus, setSelectedBus] = useState();

  const handleOk = () => {
    onClose(value);
  };

  useEffect(() => {
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
  }, []);

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={props.open}
    >
      <DialogTitle>Add Route</DialogTitle>
      <DialogContent dividers>
        <div>
          <Select
            placeholder="From"
            onChange={(e) => {
              setSelectedFrom(e.target.value);
            }}
          >
            {stops.map((stop) => {
              return (
                <MenuItem key={stop.uid} value={stop}>
                  {stop.name}
                </MenuItem>
              );
            })}
          </Select>
          <Select
            placeholder="To"
            onChange={(e) => {
              setSelectedTo(e.target.value);
            }}
          >
            {stops.map((stop) => {
              return (
                <MenuItem key={stop.uid} value={stop}>
                  {stop.name}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      </DialogContent>
      <DialogActions className="bg-pink_red text-white underline font-bold">
        <button autoFocus onClick={props.onClose}>
          Cancel
        </button>
        <button
          onClick={() => {
            props.addToRoute(selectedFrom, selectedTo);
          }}
        >
          Add
        </button>
      </DialogActions>
    </Dialog>
  );
};

const Results = () => {
  const { currentUser, isUserLoading } = useAuthContext();
  const [busses, setBusses] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const getBusses = async () => {
      await firestore
        .collection("busses")
        .where("routes_uid", "==", router.query.route)
        .get()
        .then((snapshot) => {
          const data = [];
          snapshot.docs.forEach((doc) => {
            data.push(doc.data());
          });
          console.log(data);
          setBusses(data);
        });
    };
    getBusses();
  }, [router.query]);

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
        <h1 className="text-4xl text-pink_red m-5">Search Results</h1>
        <h1 className="text-xl text-white font-bold">22 November 2022</h1>
        <div className="w-screen h-1/12 bg-pink_red">
          <div className="flex space-x-10 text-white py-4 text-center mx-auto justify-center px-40">
            <h1 className="text-3xl">{router.query.from}</h1>
            <div className="w-1/4 text-white">
              <Image
                className="fill-white"
                src={ArrowRightLogo}
                height={50}
                alt="To"
              />
            </div>

            <h1 className="text-3xl">{router.query.to}</h1>
          </div>
        </div>
        {
          busses.length <= 0 ? (
          <div className="text-center p-10 text-4xl h-full">
            <h1>No results</h1>
        </div>
          ): (
            <div className="flex flex-col h-full">
          {busses.map((bus) => {
            return (
              <div key={bus.uid} className="flex m-4 shadow-md">
                <div className="mr-10 flex flex-row p-3 justify-between align-middle">
                  <div className="w-2/6 overflow-hidden my-auto">
                    <Image src={BusLogo} height={100} alt="To" />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-2xl text-gray-400 font-bold">
                      Number Plate:
                    </h1>
                    <h1 className="text-2xl  font-bold">{bus.number_plate}</h1>

                    <h1 className="font-bold text-2xl">{}</h1>
                    <h2>Normal/VIP</h2>
                  </div>
                  <div className="flex flex-col ml">
                    <span>
                      <h1 className="text-gray-400 font-bold">
                        Departure Time
                      </h1>
                      <h2>{bus.departure_time} PM</h2>
                    </span>
                    <span>
                      <h1 className="text-gray-400 font-bold">Seats:</h1>
                      <h2>{bus.number_of_seats}</h2>
                    </span>
                    <span>
                      <h1 className="text-gray-400 font-bold">Amount:</h1>
                      <h2>{router.query.amount}</h2>
                    </span>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="flex flex-col justify-start">
                      <h1 className="text-gray-400 font-bold">
                        Price per ticket:
                      </h1>
                      <h1>1000 Ksh</h1>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="flex flex-col justify-start">
                      <h1 className="text-gray-400 font-bold">Total:</h1>
                      <h1>{router.query.amount * 1000} Ksh</h1>
                    </div>
                  </div>

                  <div>
                    <button
                      className="bg-pink_red rounded-md p-2 text-white mx-2"
                      onClick={() => {
                        const total = router.query.amount * 1000;
                        addBooking(
                          currentUser.uid,
                          bus.uid,
                          bus.routes_uid,
                          bus.departure_time,
                          router.query.amount,
                          total,
                          router.query.date
                        );

                        setTimeout(() => {
                          router.push("/home");
                        }, 2000);
                      }}
                    >
                      Book seat
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
          )
        }
      </div>
    );
  }
};

export default Results;
