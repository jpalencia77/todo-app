import firebase from 'firebase'
import '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCkVlXs_q7_UYM-9Xcv7900AiSk9QxxLW8",
    authDomain: "todoapp-9f487.firebaseapp.com",
    projectId: "todoapp-9f487",
    storageBucket: "todoapp-9f487.appspot.com",
    messagingSenderId: "944464769321",
    appId: "1:944464769321:web:1231eb1da527bdf517c738"
};

class Firebase {

    constructor(callback) {
        this.init(callback)
    }
    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user)
            } else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error)
                })
            }
        })
    }
}


export default Firebase;