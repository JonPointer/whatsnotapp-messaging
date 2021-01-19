const socket = io();

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const username = document.getElementById("username");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   if (input.value) {
//     socket.emit("chat message", username.value + ": " + input.value);
//     // Message has been sent to the back end. Now need to call the
//     // API to add to the database
//     // First need to build an object of the message and user
//     let newMsg = {
//       message: input.value,
//       userID: req.query.user_id,
//     };
//     // Now call the API with the newMsg object
//     fetch("/api/messages", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newMsg),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Success in adding msg:", data);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//     // Now need to reset the input field
//     input.value = "";
//   }
// });

const viewAllBtn = document.getElementById("allBtn");
if (viewAllBtn) {
  viewAllBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("clicked");
    location.reload("/");

    fetch("/api/messages", {
      method: "GET",
      headers: {
        Content_Type: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        messages = data;
        console.log("Success in retrieving the messages", data);
      })
      .catch((error) => console.error("Error:", error));
  });
}

const userBtn = document.getElementById("userBtn");
if (userBtn) {
  userBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("clicked");
    fetch(`/api/messages/${id}`, {
      method: "GET",
      "Content-Type": "application/json",
    })
      .then((response) => response.json)
      .then((data) => {
        id = data;
        console.log("Search username messages", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}


// When a message is received from the back end, write it to the screen
// socket.on("chat message", (msg) => {
//   const item = document.createElement("li");
//   item.textContent = msg;
//   messages.appendChild(item);
//   window.scrollTo(0, document.body.scrollHeight);
// });
