document.getElementById("logout").addEventListener("click", (event) => {
  logout();
});

function logout() {
  const dataUser = JSON.parse(localStorage.getItem("userStrg"));
  console.log(dataUser);

  fetch("http://127.0.0.1:3000/logout/", {
    method: "POST",
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
