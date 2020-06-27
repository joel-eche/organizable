(function (){
  const user = localStorage.getItem("userStrg");
  if(!user) {
    window.location.href = "login.html";
  }
})();