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
  deleteBus,
  deleteRoute,
  editBus,
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

const DailogBox = (props) => {
  const [routes, setRoutes] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState();
  const [selectedTo, setSelectedTo] = useState();
  const departureTimes = [
    { value: "10:00", label: "10:00" },
    { value: "11:00", label: "11:00" },
    { value: "13:00", label: "13:00" },
    { value: "15:00", label: "15:00" },
  ];
  const [numberPlate, setNumberPlate] = useState();
  const [seats, setSeats] = useState();
  const [selectedRouteID, setSelectedRouteID] = useState();
  const [selectedDepTime, setSelectedDepTime] = useState();

  useEffect(() => {
    const getRoutesList = async () => {
      await firestore
        .collection("routes")
        .get()
        .then(function (snapshot) {
          const data = [];
          snapshot.docs.forEach((doc) => {
            data.push(doc.data());
          });
          setRoutes(data);
        });
    };
    getRoutesList();
  }, []);

  if (props.type === "add") {
    return (
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        open={props.open}
      >
        <DialogTitle>Add Bus</DialogTitle>
        <DialogContent dividers>
          <div className="flex flex-col space-y-4">
            <TextField
              placeholder={"Number plate"}
              onChange={(value) => {
                setNumberPlate(value.target.value);
              }}
            />
            <TextField
              placeholder={"Number of seats"}
              onChange={(value) => {
                setSeats(value.target.value);
              }}
            />

            <div>
              <InputLabel>Route</InputLabel>
              <Select
                onChange={(e) => {
                  setSelectedRouteID(e.target.value);
                }}
              >
                {routes.map((route) => {
                  return (
                    <MenuItem key={route.uid} value={route.uid}>
                      <div>
                        {route.from.name} - {route.to.name}
                      </div>
                    </MenuItem>
                  );
                })}
              </Select>
            </div>

            <div>
              <InputLabel>Departure Time</InputLabel>
              <Select
                onChange={(e) => {
                  setSelectedDepTime(e.target.value);
                }}
              >
                {departureTimes.map((time) => {
                  return (
                    <MenuItem key={time.label} value={time.value}>
                      <div>{time.label}</div>
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="bg-pink_red text-white underline font-bold">
          <button autoFocus onClick={props.onClose}>
            Cancel
          </button>
          <button
            onClick={() => {
              // console.log(selectedRouteID);
              props.addBus(
                numberPlate,
                seats,
                selectedRouteID,
                selectedDepTime
              );
              props.onClose();
            }}
          >
            Add
          </button>
        </DialogActions>
      </Dialog>
    );
  } else {
    return (
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        open={props.open}
      >
        <DialogTitle>Edit Bus</DialogTitle>
        <DialogContent dividers>
          <div className="flex flex-col space-y-4">
            <TextField
              placeholder={"Number plate"}
              onChange={(value) => {
                setNumberPlate(value.target.value);
              }}
            />
            <TextField
              placeholder={"Number of seats"}
              onChange={(value) => {
                setSeats(value.target.value);
              }}
            />

            <div>
              <InputLabel>Route</InputLabel>
              <Select
                onChange={(e) => {
                  setSelectedRouteID(e.target.value);
                }}
              >
                {routes.map((route) => {
                  return (
                    <MenuItem key={route.uid} value={route.uid}>
                      <div>
                        {route.from.name} - {route.to.name}
                      </div>
                    </MenuItem>
                  );
                })}
              </Select>
            </div>

            <div>
              <InputLabel>Departure Time</InputLabel>
              <Select
                onChange={(e) => {
                  setSelectedDepTime(e.target.value);
                }}
              >
                {departureTimes.map((time) => {
                  return (
                    <MenuItem key={time.label} value={time.value}>
                      <div>{time.label}</div>
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="bg-pink_red text-white underline font-bold">
          <button autoFocus onClick={props.onClose}>
            Cancel
          </button>
          <button
            onClick={() => {
              // console.log(selectedRouteID);
              editBus(
                props.uid,
                selectedDepTime,
                seats,
                numberPlate,
                selectedRouteID
              ).then(() => {
                props.onClose();
              });
            }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    );
  }
};

const Busses = (props) => {
  const [busses, setBusses] = useState([]);
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [type, setType] = useState("");
  const [currentUID, setCurrentUID] = useState();

  const closeDialog = () => {
    setOpen(false);
    refresh();
  };
  const refresh = () => {
    setChange(!change);
  };
  const addBusToDb = (numberPlate, seats, selectedRouteID, selectedDepTime) => {
    addBus(selectedDepTime, seats, numberPlate, selectedRouteID).then(() => {
      setOpen(false);
      refresh();
    });
  };
  const handleEdit = (id) => {
    //shen edit button is clicked
  };

  useEffect(() => {
    const getBusses = async () => {
      await firestore
        .collection("busses")
        .get()
        .then(function (snapshot) {
          const data = [];
          snapshot.docs.forEach((doc) => {
            data.push(doc.data());
          });
          console.log(data);
          setBusses(data);
        });
    };
    getBusses();
  }, [change]);
  return (
    <div className="h-full w-full">
      <h1 className="text-2xl font-bold pl-4 text-left">Busses</h1>
      <div className="my-2">
        {/* list of routes */}
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
                  Number Plate
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
                  Number of Seats
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
                  ID
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
                  Departure Time
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <button
                    onClick={() => {
                      setType("add");
                      setOpen(true);
                    }}
                    className="underline text-white"
                  >
                    Add
                  </button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {busses.map((bus) => (
                <TableRow
                  key={bus.uid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" component="th" scope="row">
                    <h1>{bus.number_plate}</h1>
                  </TableCell>
                  <TableCell align="left">
                    <h1>{bus.number_of_seats}</h1>
                  </TableCell>
                  <TableCell align="left">
                    <h1>{bus.uid}</h1>
                  </TableCell>
                  <TableCell align="left">
                    <h1>{bus.routes_uid}</h1>
                  </TableCell>
                  <TableCell align="left">
                    <h1>{bus.departure_time}</h1>
                  </TableCell>
                  <TableCell align="left">
                    <button
                      onClick={() => {
                        setType("edit");
                        setCurrentUID(bus.uid);
                        setOpen(true);
                      }}
                      className="underline text-pink_red"
                    >
                      Edit
                    </button>
                  </TableCell>
                  <TableCell align="left">
                    <button
                      onClick={() => {
                        deleteBus(bus.uid).then(() => { 
                          refresh();
                        })
                      }}
                      className="underline text-pink_red"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <DailogBox
          open={open}
          type={type}
          uid={currentUID}
          onClose={closeDialog}
          addBus={addBusToDb}
        />
      </div>
    </div>
  );
};

export default Busses;
