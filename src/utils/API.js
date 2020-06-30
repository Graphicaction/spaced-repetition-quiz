import Questions from './questions.json';

export default {
    // Return a Promise to simulate an async call
  getQuestions: function() {
    return new Promise(resolve => {
      resolve(Questions);
    });
  }
}