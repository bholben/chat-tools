const { isEmpty, last } = require('lodash');
const { api, firebase } = require('api');

let messages = [];
let user = {};

// Make sure this object is empty if you don't want to spoof
const spoofUser = {
  uid: '6ucnxM7B6BS9JUfIlfJcQjfRLAz1',
  isAnonymous: true,
}

const message = {
  name: 'Bob',
  isAgent: true,
  timestamp: firebase.database.ServerValue.TIMESTAMP,
  text: 'Hey, from Bob',
};

firebase.auth().signInAnonymously()
  .then(realUser => {
    user = !isEmpty(spoofUser) && spoofUser || realUser;
    // api.sendMessage(message, user);
    api.syncMessages(user, m => {
      messages = m;
      console.log(messages);
    });
  })
  .catch(console.log);

// setTimeout(() => {
//   const lastMessage = last(messages);
//   api.deleteMessage(lastMessage, user);
// }, 5000);
