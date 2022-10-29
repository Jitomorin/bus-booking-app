import { firestore } from './firebase'
import { v4 as uuidv4 } from 'uuid';


function addUser(email,uid,fullname,IDnum,isAdmin) {
  
  firestore.collection('users').doc(uid).set({
    admin:isAdmin,
    IDnum:IDnum,
    email: email,
    fullname: fullname,
    uid: uid,
  })
}
function getAllUsers() {
  firestore.collection('users').get().then(function (snapshot) {
    snapshot.forEach(function (cSnapshot) {
      return cSnapshot
    })
  })
}
function getUserDetails(uid) {
  firestore.collection('users').doc(uid).get().then((snapshot) => {
    console.log(snapshot.data())
  })
}
function setStops() {
  
  const stops = ['ARUSHA','BAMBURI','CHANGAMWE','KILIFI','KISUMU','MACHAKOS','MARIAKANI','MALINDI','MOMBASA','VOI']

  stops.forEach((stop) => { 
    const uid=uuidv4()
    firestore.collection('stops').doc(uid).set({
      name: stop,
      uid: uid,
    }).catch((error) => {
      console.log(error)
    })
  })
}
async function getStops() {
  firestore.collection('stops').get().then(function (snapshot) { 
    console.log(snapshot)
    return snapshot
  })
}


export {addUser,getAllUsers,getUserDetails,setStops,getStops}