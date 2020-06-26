document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  signupUser();
});

function signupUser() {
  let userName = document.getElementById("userName").value;
  let userPass = document.getElementById("psw").value;
  let userEmail = document.getElementById("email").value;
  let userFirtName = document.getElementById("firstName").value;
  let userLastName = document.getElementById("lastName").value;
  const userData = {
    user: {
      username: userName,
      email: userEmail,
      first_name: userFirtName,
      last_name: userLastName,
      password: userPass,
    },
  };

  fetch("http://127.0.0.1:3000/users/", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //   console.log(data.password[0]);
      console.log(data.token);
      localStorage.setItem("userStrg", JSON.stringify(data));
      const dataUser = JSON.parse(localStorage.getItem("userStrg"));
      console.log(dataUser);
      console.log(data.email);
      window.location.href = "main.html";
    })
    .catch((error) => console.log(error));
}
