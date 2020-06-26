// function loginUsers() {
//   let token = "";
// }

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  loginUser();
});

function loginUser() {
  let userSession = document.getElementById("userName");
  let passSession = document.getElementById("psw");

  fetch("http://127.0.0.1:3000/login/", {
    method: "POST",
    body: JSON.stringify({
      username: userSession.value,
      password: passSession.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.errors) {
        console.log(data.errors.message);
        console.log("datos errados");
        document.getElementById("IncorrectCredential").style.display = "block";
        document.getElementById("IncorrectCredential").innerHTML =
          "Incorrect email or password";
      } else {
        //console.log(data.id);
        tokenn = data.token;
        //console.log(tokenn);
        localStorage.setItem("userStrg", JSON.stringify(data));
        const dataUser = JSON.parse(localStorage.getItem("userStrg"));
        console.log(dataUser);
        console.log(data.email);
        window.location.href = "main.html";
      }
    })
    .catch((error) => console.log(error));
}

// req info with token
// fetch("http://127.0.0.1:3000/boards/", {
//   method: "GET",

//   headers: {
//     Authorization: 'Token token="MN6k7SySAK8AF1ma4xhytTUL"',
//   },
// })
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => console.log("ERROR"));
// fetch("http://127.0.0.1:3000/logout/", {
//   method: "POST",
//   headers: {
//     Authorization: 'Token token="4ckTfVnhyG8ZUCoL6X4kvKpE"',
//   },
// })
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => console.log(error));
