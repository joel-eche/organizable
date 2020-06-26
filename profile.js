const dataUser = JSON.parse(localStorage.getItem("userStrg"));
console.log(dataUser);
document.getElementById("userName").textContent = dataUser.username;
document.getElementById("email").textContent = dataUser.email;
document.getElementById("firstName").textContent = dataUser.firstName;
document.getElementById("lastName").textContent = dataUser.lastName;

document.getElementById("deleteButton").addEventListener("click", (event) => {
  event.preventDefault();
  destroyUser();
});
document.getElementById("editButton").addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "editprofile.html";
});

function destroyUser() {
  fetch(`http://127.0.0.1:3000/users/${dataUser.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token token="${dataUser.token}"`,
    },
  })
    .then((res) => {
      console.log(res);
      localStorage.removeItem("userStrg");
      window.location.href = "login.html";
    })

    .catch((error) => console.log(error));
}
// `"http://127.0.0.1:3000/users/${dataUser.id}"`
