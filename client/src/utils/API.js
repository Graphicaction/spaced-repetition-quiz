import axios from 'axios';

export default {
  // Saves new question
  saveQuestion: function (questionData) {
    return axios.post('/api/questions', questionData);
  },
  getQuestions: function () {
    return axios.get('/api/questions');
  },
  updateQuestion: function (id, data) {
    return axios.put('/api/questions/' + id, data);
  }
};
