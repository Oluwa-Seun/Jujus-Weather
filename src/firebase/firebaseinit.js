import firebase from 'firebase/app'
import 'firebase/firestore'

let firebaseConfig = {
        apiKey: 'AIzaSyCAkIt79JfAAIwyZoswgHvYypAgfo1w4WU',
        authDomain: 'juju-weather.firebaseapp.com',
        databaseURL: 'https://juju-weather-default-rtdb.firebaseio.com',
        projectId: 'juju-weather',
        storageBucket: 'juju-weather.appspot.com',
        messagingSenderId: '748631446807',
        appId: '1:748631446807:web:3527e89fa93cebb8855352'
    }
    // Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()