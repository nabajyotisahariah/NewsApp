import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
    devicetype: 'web',
    Authorization: 'Bearer F421D63D166CA343454DD833B599C',
  },
};

export const get = (url, config) => {
  return axios
    .get(url, config)
    .then(res => {
      return {data: res.data, error: null};
    })
    .catch(err => {
      //err
      console.log('err ', err);
      return {data: [], error: err};
    });
};

export const post = (url, data = {}) => {
  console.log(' axios ', axios, ' ur; ', url, ' data ', data);
  return axios
    .post(url, data, config)
    .then(res => {
      //console.log("res ",res)
      return {data: res.data, error: null};
    })
    .catch(err => {
      //err
      console.log('err ', err);
      return {data: [], error: err};
    });
};
