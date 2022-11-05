import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fontSize } from "@mui/system";
import {
  addBus,
  addBusses,
  addRoutes,
  approveBooking,
  cancelBooking,
  deleteBus,
  deleteRoute,
  editBooking,
  getStops,
} from "../firebase/firestore";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  InputLabel,
  MenuItem,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

// const DailogBox = (props) => {
//   const [routes, setRoutes] = useState([]);
//   const [busses, setBusses] = useState([]);
//   const [selectedFrom, setSelectedFrom] = useState();
//   const [selectedTo, setSelectedTo] = useState();
//   const departureTimes = [
//     { value: "10:00", label: "10:00" },
//     { value: "11:00", label: "11:00" },
//     { value: "13:00", label: "13:00" },
//     { value: "15:00", label: "15:00" },
//   ];
//   const [numberPlate, setNumberPlate] = useState();
//   const [seats, setSeats] = useState();
//   const [selectedRouteID, setSelectedRouteID] = useState();
//   const [selectedDepTime, setSelectedDepTime] = useState();

//   useEffect(() => {
//     const getRoutesList = async () => {
//       await firestore
//         .collection("routes")
//         .get()
//         .then(function (snapshot) {
//           const data = [];
//           snapshot.docs.forEach((doc) => {
//             data.push(doc.data());
//           });
//           setRoutes(data);
//         });
//     };
//     getRoutesList();
//   }, []);

//   return (
//     <Dialog
//       sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
//       maxWidth="xs"
//       open={props.open}
//     >
//       <DialogTitle>Add Bus</DialogTitle>
//       <DialogContent dividers>
//         <div className="flex flex-col space-y-4">
//           <TextField
//             placeholder={"Number plate"}
//             onChange={(value) => {
//               setNumberPlate(value.target.value);
//             }}
//           />
//           <TextField
//             placeholder={"Number of seats"}
//             onChange={(value) => {
//               setSeats(value.target.value);
//             }}
//           />
//           <div>
//             <InputLabel>Route</InputLabel>
//             <Select
//               onChange={(e) => {
//                 setSelectedRouteID(e.target.value);
//               }}
//             >
//               {routes.map((route) => {
//                 return (
//                   <MenuItem key={route.uid} value={route.uid}>
//                     <div>
//                       {route.from.name} - {route.to.name}
//                     </div>
//                   </MenuItem>
//                 );
//               })}
//             </Select>
//           </div>

//           <div>
//             <InputLabel>Departure Time</InputLabel>
//             <Select
//               onChange={(e) => {
//                 setSelectedDepTime(e.target.value);
//               }}
//             >
//               {departureTimes.map((time) => {
//                 return (
//                   <MenuItem key={time.label} value={time.value}>
//                     <div>{time.label}</div>
//                   </MenuItem>
//                 );
//               })}
//             </Select>
//           </div>
//         </div>
//       </DialogContent>
//       <DialogActions className="bg-pink_red text-white underline font-bold">
//         <button autoFocus onClick={props.onClose}>
//           Cancel
//         </button>
//         <button
//           onClick={() => {
//             // console.log(selectedRouteID);
//             props.addBus(numberPlate, seats, selectedRouteID, selectedDepTime);
//           }}
//         >
//           Add
//         </button>
//       </DialogActions>
//     </Dialog>
//   );
// };

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [currentUID, setCurrentID] = useState("");
  // const [from, setFrom] = useState();
  // const [to, setTo] = useState();
  // const [id, setId] = useState();
  // const [editMode, setEditMode] = useState(false);

  const refresh = () => {
    setChange(!change);
  };
  const closeDialog = () => {
    setOpen(false);
    refresh();
  };

  const handleEdit = (
    uid,
    date,
    busID,
    departure_time,
    number_of_tickets,
    routeID
  ) => {
    //when edit button is clicked
    setCurrentID(uid);
    editBooking(uid, busID, routeID, departure_time, number_of_tickets, date);
  };

  useEffect(() => {
    const getBookings = async () => {
      await firestore
        .collection("bookings")
        .get()
        .then(function (snapshot) {
          const data = [];
          snapshot.docs.forEach((doc) => {
            data.push(doc.data());
          });
          console.log(data);
          setBookings(data);
        });
    };
    getBookings();
  }, [change]);

  return (
    <div className="h-full w-full">
      <h1 className="text-2xl font-bold pl-4 text-left">Bookings</h1>
      <div className="my-2">
        {/* list of bookings */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow sx={{ bgcolor: "#B97375", color: "white" }}>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                    textAlign: "left",
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                    textAlign: "left",
                  }}
                  align="right"
                >
                  Number of Tickets
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                    textAlign: "left",
                  }}
                  align="right"
                >
                  Departure Time
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                    textAlign: "left",
                  }}
                  align="right"
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                    textAlign: "left",
                  }}
                  align="right"
                >
                  Route ID
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                    textAlign: "left",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                    textAlign: "left",
                  }}
                >
                  Total
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  {/* <button
                    onClick={() => {
                      setOpen(true);
                    }}
                    className="underline text-white"
                  >
                    Add
                  </button> */}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow
                  key={booking.uid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" component="th" scope="row">
                    <h1>{booking.date}</h1>
                  </TableCell>
                  <TableCell align="left">
                    <h1>{booking.number_of_tickets}</h1>
                  </TableCell>
                  <TableCell align="left">
                    <h1>{booking.departure_time}</h1>
                  </TableCell>
                  <TableCell align="left">
                    {!booking.paid ? <h1>Not paid</h1> : <h1>Paid</h1>}
                  </TableCell>
                  <TableCell align="left">
                    <h1>{booking.route_id}</h1>
                  </TableCell>
                  <TableCell align="left">
                    <h1>{booking.uid}</h1>
                  </TableCell>
                  <TableCell align="left">
                    <h1>{booking.total_price}</h1>
                  </TableCell>
                  <TableCell align="left">
                    <button
                      onClick={() => {
                        approveBooking(booking.uid).then(() => {
                          refresh();
                        });
                      }}
                      className="underline text-pink_red"
                    >
                      Approve Payment
                    </button>
                  </TableCell>
                  <TableCell align="left">
                    <button
                      onClick={() => {
                        cancelBooking(booking.uid).then(() => {
                          refresh();
                        });
                      }}
                      className="underline text-pink_red"
                    >
                      Cancel
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <DailogBox open={open} onClose={closeDialog} addBus={addBusToDb} /> */}
      </div>
    </div>
  );
};

export default Bookings;
