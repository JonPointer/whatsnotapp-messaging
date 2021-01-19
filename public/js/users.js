//inserting user to Users table
const addUser = (userData) => {
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).catch((err) => console.error(err));
  };