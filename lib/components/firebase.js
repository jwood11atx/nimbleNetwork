import firebase from 'firebase';

{/* <script src="https://www.gstatic.com/firebasejs/3.6.4/firebase.js"></script> */}

const config = {
  apiKey: "AIzaSyC4o1Xmc9t7BdqZdBOcthhFkOpKrNlyMCs",
  authDomain: "nimble-network-9e869.firebaseapp.com",
  databaseURL: "https://nimble-network-9e869.firebaseio.com",
  storageBucket: "nimble-network-9e869.appspot.com",
  messagingSenderId: "399772840353"
};

export default firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.FacebookAuthProvider();

// export const signUp = (email, password) => {
//   firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
//     console.log('Sign Up error', error);
//     alert(error.message);
//     return false;
//   });
// }
//
//   export const signIn = (email, password) => {
//  firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
//    console.log('Sign In error', error);
//    alert(error.message);
//    return false;
//   });
// }

export const signOut = () => auth.signOut();
