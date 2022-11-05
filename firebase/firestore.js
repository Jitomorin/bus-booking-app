import { firestore } from "./firebase";
import { v4 as uuidv4 } from "uuid";

function addUser(email, uid, fullname, IDnum, isAdmin) {
  firestore.collection("users").doc(uid).set({
    admin: isAdmin,
    IDnum: IDnum,
    email: email,
    fullname: fullname,
    uid: uid,
  });
}
function getAllUsers() {
  firestore
    .collection("users")
    .get()
    .then(function (snapshot) {
      snapshot.forEach(function (cSnapshot) {
        return cSnapshot;
      });
    });
}
function getUserDetails(uid) {
  firestore
    .collection("users")
    .doc(uid)
    .get()
    .then((snapshot) => {
      console.log(snapshot.data());
    });
}
async function deleteRoute(uid) {
  firestore
    .collection("routes")
    .doc(uid)
    .delete()
    .then(() => {
      console.log("route deleted");
    });
}
async function deleteBus(uid) {
  firestore
    .collection("busses")
    .doc(uid)
    .delete()
    .then(() => {
      console.log("bus deleted");
    });
}
async function cancelBooking(uid) {
  firestore
    .collection("bookings")
    .doc(uid)
    .delete()
    .then(() => {
      console.log("route deleted");
    });
}
async function approveBooking(uid) {
  firestore.collection('bookings').doc(uid).update({paid:true}).then(() => { console.log('Booking payment approved')}).catch((error) => { console.log(error)})
  
}
function addBooking(userID, busID, routeID, departure_time,num_of_tickets,total_price,date) {
const uid=uuidv4()

  firestore.collection("bookings").doc(uid).set({
    uid: uid,
    user_uid: userID,
    bus_id: busID,
    route_id: routeID,
    departure_time: departure_time,
    number_of_tickets: num_of_tickets,
    total_price: total_price,
    date: date,
    paid: false,
  }).then(() => {
    console.log("booking made")
  }).catch((error) => { 
    console.log(error)
  })
}
// function editBooking( uid,busID, routeID, departure_time,num_of_tickets,date) {
//   firestore.collection("bookings").doc(uid).update({
//     bus_id: busID,
//     route_id: routeID,
//     departure_time: departure_time,
//     number_of_tickets: num_of_tickets,
//     total_price: num_of_tickets*1000,
//     date: date,
//   }).then(() => {
//     console.log("booking changes made")
//   }).catch((error) => { 
//     console.log(error)
//   })
// }

async function addBus(dep_time, seats, num_plate, routeID) {
  const uid = uuidv4();
  firestore
    .collection("busses")
    .doc(uid)
    .set({
      departure_time: dep_time,
      number_of_seats: seats,
      number_plate: num_plate,
      routes_uid: routeID,
      uid: uid,
    })
    .then(() => {
      console.log("bus added");
    })
    .catch((error) => {
      console.log(error);
    });
}
async function editBus(uid,dep_time, seats, num_plate, routeID) {
  firestore
    .collection("busses")
    .doc(uid)
    .update({
      departure_time: dep_time,
      number_of_seats: seats,
      number_plate: num_plate,
      routes_uid: routeID,
    })
    .then(() => {
      console.log("bus changes made");
    })
    .catch((error) => {
      console.log(error);
    });
}
async function addRoutes(from, to) {
  let isPresent = false;
  const uid = uuidv4();
  firestore
    .collection("routes")
    .where("from.name", "==", from.name)
    .where("to.name", "==", to.name)
    .get()
    .then((snapshot) => {
      isPresent = !snapshot.empty;
      if (isPresent) {
        console.log("route already exists");
      } else {
        firestore
          .collection("routes")
          .doc(uid)
          .set({
            from: from,
            to: to,
            uid: uid,
          })
          .then(() => {
            console.log("Route added");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
}
async function editRoute(uid,from, to) {
        firestore
          .collection("routes")
          .doc(uid)
          .update({
            from: from,
            to: to,
            
          })
          .then(() => {
            console.log("Route changes made");
          })
          .catch((error) => {
            console.log(error);
          });
      
    
}
async function getStops() {
  firestore
    .collection("stops")
    .get()
    .then(function (snapshot) {
      console.log(snapshot);
      return snapshot;
    });
}

export {
  addUser,
  getAllUsers,
  getUserDetails,
  getStops,
  addBus,
  deleteBus,
  deleteRoute,
  cancelBooking,
  approveBooking,
  addRoutes,
  addBooking,
  editBus,
  editRoute,
};
