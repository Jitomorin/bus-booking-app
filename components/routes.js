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
  addRoutes,
  deleteRoute,
  editRoute,
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
  const [stops, setStops] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState();
  const [selectedTo, setSelectedTo] = useState();

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

  if (props.type === "add") {
    return (
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        open={props.open}
      >
        <DialogTitle>Add Route</DialogTitle>
        <DialogContent dividers>
          <div className="flex space-x-5">
            <InputLabel>From</InputLabel>
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
            <InputLabel>To</InputLabel>
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
              addRoutes(selectedFrom, selectedTo).then(() => {
                props.onClose();
               })
              
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
        <DialogTitle>Edit Route</DialogTitle>
        <DialogContent dividers>
          <div className="flex space-x-5">
            <InputLabel>From</InputLabel>
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
            <InputLabel>To</InputLabel>
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
              editRoute(props.uid, selectedFrom, selectedTo).then(() => {props.onClose(); })
              
            }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    );
  }
};

const Routes = (props) => {
  const [routes, setRoutes] = useState([]);
  const [open, setOpen] = useState(false);
  const [change,setChange]=useState(false);
  const [currentUID, setCurrentUID] = useState("");
  const [dialogType, setDialogType] = useState();
  // const [to, setTo] = useState();
  // const [id, setId] = useState();
  // const [editMode, setEditMode] = useState(false);

  const closeDialog = () => {
    setOpen(false);
    refresh();
  };
  const refresh = () => { 
setChange(!change);
  }
  
  const handleEdit = (id) => {};

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
          console.log(data);
          setRoutes(data);
        });
    };
    getRoutesList();
  }, [change]);
  return (
    <div className="h-full w-full">
      <h1 className="text-2xl font-bold pl-4 text-left">Routes</h1>
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
                  From
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
                  To
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
                <TableCell></TableCell>
                <TableCell>
                  <button
                    onClick={() => {
                      setDialogType("add");
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
              {routes.map((route) => (
                <TableRow
                  key={route.uid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" component="th" scope="row">
                    <h1>{route.from.name}</h1>
                  </TableCell>
                  <TableCell align="left">
                    <h1>{route.to.name}</h1>
                  </TableCell>
                  <TableCell align="left">
                    <h1>{route.uid}</h1>
                  </TableCell>
                  <TableCell align="left">
                    <button
                      onClick={() => {
                        setCurrentUID(route.uid);
                        setDialogType("edit");
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
                        deleteRoute(route.uid).then(() => {
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
          onClose={closeDialog}
          type={dialogType}
         
          uid={currentUID}
        />
      </div>
    </div>
  );
};

export default Routes;
