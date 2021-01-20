

const socket = io();

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const userForm = document.getElementById("userForm");
const input = document.getElementById("input");
const refresh = document.getElementById("refresh-button");

// Load / on first load
refresh.onclick = () => {
  location.href = "/";
}

// Auto scroll to the bottom of messages on load
messages.scrollTop = messages.scrollHeight;

// Function for on click of one of the user buttons
// Call the / route with the user ID.
userDisplay = (objButton) => {
  console.log(objButton.value);
  location.href = `/${objButton.value}`;
};

let msgFromUser = "";

let userID = localStorage.getItem("userID");
let usersName = localStorage.getItem("usersName");

// Check the usersName and set all to empty if first time using program.
if (usersName === null) {
  // Doesn't exist, so set it to an empty string
  usersName = "";
} else {
  // usersName exist in storage, so use display it.
  username.value = usersName;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if ((input.value) && (username.value)) {

    if ((userID === null) || (usersName.trim() != username.value.trim())) {

      msgFromUser = input.value;

      fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username.value }),
      })
        .then((response) => response.json())
        .then((data) => {
          userID = data.id;
          usersName = username.value;
          // Now need to store the usersName and userID to local storage
          localStorage.setItem("usersName", username.value);
          localStorage.setItem("userID", userID);
          console.log('Success in adding user:', data);
          console.log(userID);

          socket.emit("chat message", (username.value + ": " + msgFromUser));
          // Message has been sent to the back end. Now need to call the 
          // API to add to the database
          // First need to build an object of the message and user
          let newMsg = {
            message: msgFromUser,
            UserId: userID,
          }
          // Now call the API with the newMsg object
          fetch('/api/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMsg),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Success in adding msg:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      // User exists, so just need to post and save the message
      socket.emit("chat message", (username.value + ": " + input.value));
      // Message has been sent to the back end. Now need to call the 
      // API to add to the database
      // First need to build an object of the message and user
      let newMsg = {
        message: input.value,
        UserId: userID,
      }
      // Now call the API with the newMsg object
      fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMsg),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success in adding msg:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    // Now need to reset the input field
    input.value = "";
  }
});

// When a message is received from the back end, write it to the screen
socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  // Auto scroll to the bottom any time a new message is received
  messages.scrollTop = messages.scrollHeight;
});


