const socket = io();

// Wait for the DOM to completely load before we run our JS
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded! 🚀");

  // Get references to the body, title, form and author
  const messages = document.getElementById("messages");
  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const userSelect = document.getElementById("author");

  // Get query parameter
  const url = window.location.search;
  let messageId;
  let userId;

  // Get post data for editing/adding
  const getMessageData = (id, type) => {
    const queryUrl =
      type === "message" ? `/api/messages/${id}` : `/api/users/${id}`;

    fetch(queryUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log("Success in getting messages:", data);

          // Populate the form for editing
          message: input.value;
          userId = data.UserId || data.id;
        }
      })
      .catch((err) => console.error(err));
  };

  // If post exists, grab the content of the post
  if (url.indexOf("?message_id=") !== -1) {
    messageId = url.split("=")[1];
    getMessageData(messageId, "message");
  }
  // Otherwise if we have an author_id in our url, preset the author select box to be our Author
  else if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
  }

  // Event handler for when the post for is submitted
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (input.value) {
      socket.emit("chat message", username.value + ": " + input.value);
      // Object that will be sent to the db
      const newMessage = {
        body: input.value.trim(),
        UserId: userSelect.value,
      };

      submitMessage(newMessage);
    }

    // Attach an event listener to the form on submit
    cmsForm.addEventListener("submit", handleFormSubmit);

    // Submits new post then redirects
    const submitMessage = (message) => {
      fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      })
        .then(() => {
          window.location.href = "/";
        })
        .catch((err) => console.error(err));
    };
    input.value = "";
  };
});

socket.on("chat message", (msg) => {
    const item = document.createElement("li");
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
