

const socket = io();

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const userForm = document.getElementById("userForm");
const input = document.getElementById("input");
const refresh = document.getElementById("refresh-button");

messages.scrollTop = messages.scrollHeight;

refresh.onclick = () => {
  // location.reload("/");
  location.href = "/";

}

userDisplay = (objButton) => {
  console.log(objButton.value);
  location.href = `/${objButton.value}`;


  // fetch(`/api/${objButton.value}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     userID = data.id;
  //     console.log('Success in displaying user:', data);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
};

var msgFromUser = "";

var userID = localStorage.getItem("userID");
var usersName = localStorage.getItem("usersName");

// Read in usersName and set all to empty if first time using program.
if (usersName === null) {
  usersName = "";
} else {
  // usersName exist in storage, so use display it.
  username.value = usersName;
}

// let userID = 0;

// userForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   if (username.value) {
//     // Call API for a new user
//     fetch('/api/users', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name: username.value }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         userID = data.id;
//         // Now need to store the usersName and userID to local storage
//         localStorage.setItem("usersName", username.value);
//         localStorage.setItem("userID", userID);
//         console.log('Success in adding user:', data);
//         console.log(userID);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }
// });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if ((input.value) && (username.value)) {

    // console.log(userID);
    // console.log(usersName.trim() + " : " + username.value.trim());

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
    // username.value = usersName;
  }
});

// When a message is received from the back end, write it to the screen
socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  // window.scrollTo(0, document.body.scrollHeight);
  messages.scrollTop = messages.scrollHeight;
});


