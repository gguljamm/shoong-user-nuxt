import axios from 'axios';

require('formdata-polyfill');

const baseUrl = 'https://api.shoong.tours';

function booking(bookObj) {
  const formData = new FormData();
  formData.set('customerName', bookObj.customerName);
  formData.set('headCount', bookObj.headCount);
  formData.set('email', bookObj.email);
  formData.set('departure', bookObj.departure);
  formData.set('arrival', bookObj.arrival);
  formData.set('date', bookObj.date);
  formData.set('time', bookObj.time);
  formData.set('userId', bookObj.userId);
  // console.log(bookObj);
  if (bookObj.remark) {
    formData.set('remark', bookObj.remark);
  }
  return axios.post(`${baseUrl}/booking/book`, formData);
}

function mailControl(id, type) {
  return axios.put(`${baseUrl}/booking/${type}/${id}`);
}

function getServer() {
  return axios.get('/');
}

export default {
  booking,
  mailControl,
  getServer,
};
