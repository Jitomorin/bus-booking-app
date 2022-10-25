import { firestore } from './firebase'

// function addUser(email) {
//   firestoredb.settings({
//     timestampsInSnapshots: true //read timestamps in firestore
//   })
//   firestoredb.collection('users').add({
//     email: email,
//   })
// }
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


export {addUser,getAllUsers,getUserDetails}