import firebase from '../config/firebase/db_config';
export default {
    // Return a Promise to simulate an async call
  getQuestions: async() => {
    const db = firebase.firestore();
    const data = await db.collection("questions").get();
    const questions = data.map(doc =>doc.data())
    console.log(questions);
    return questions;
  }
}