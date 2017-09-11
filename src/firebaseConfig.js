/**
 * Created by colonnaa on 04/09/2017.
 */
import Firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyCluuCKMQMAQaAbR2a-toJkbfhoYOKwrmA',
  authDomain: 'fantabrigata.firebaseapp.com',
  databaseURL: 'https://fantabrigata.firebaseio.com',
  projectId: 'fantabrigata',
  storageBucket: 'fantabrigata.appspot.com',
  messagingSenderId: '74626804361'
}

let app = Firebase.initializeApp(config)
export const db = app.database()
