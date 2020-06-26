document.getElementById("cancelButton").addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "profile.html";
});
document.getElementById("saveButton").addEventListener("click", (event) => {
  event.preventDefault();
  editUser();
});

const dataUser = JSON.parse(localStorage.getItem("userStrg"));
console.log(dataUser);
document.getElementById("userName").value = dataUser.username;
document.getElementById("email").value = dataUser.email;
document.getElementById("firstName").value = dataUser.firstName;
document.getElementById("lastName").value = dataUser.lastName;

function editUser() {
  let userName = document.getElementById("userName").value;
  let userEmail = document.getElementById("email").value;
  let userFirtName = document.getElementById("firstName").value;
  let userLastName = document.getElementById("lastName").value;
  const userData = {
    user: {
      username: userName,
      email: userEmail,
      first_name: userFirtName,
      last_name: userLastName,
    },
  };

  fetch(`http://127.0.0.1:3000/users/${dataUser.id}`, {
    method: "PATCH",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token token="${dataUser.token}"`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //   console.log(data.password[0]);
      console.log(data.token);
      localStorage.setItem("userStrg", JSON.stringify(data));
      const dataUsernew = JSON.parse(localStorage.getItem("userStrg"));
      console.log(dataUsernew);
      console.log(data.email);
      window.location.href = "index.html";
    })
    .catch((error) => console.log(error));
}
