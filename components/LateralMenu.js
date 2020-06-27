const template_lateral_menu = document.createElement("template");

const returnMenuStructure = (activeItem) => {
  return `
    <link rel="stylesheet" href="./assets/styles/lateral-menu.css">
    <aside class="lateral-section">
      <nav>
        <ul class="menu list-undecorated">
          <li class="menu__item ${activeItem === "index" ? "menu-active" : ""}">
            <a class="menu__item__link" href="index.html">My boards</a>
          </li>
          <li class="menu__item ${
            activeItem === "closed" ? "menu-active" : ""
          }">
            <a class="menu__item__link" href="closed-boards.html">Closed boards</a>
          </li>
          <li class="menu__item ${
            activeItem === "profile" ? "menu-active" : ""
          }">
            <a class="menu__item__link" href="profile.html">My profile</a>
          </li>
          <li class="menu__item">
            <a id="logout" class="menu__item__link href="profile.html"">Log out</a>
          </li>
        </ul>
      </nav>
    </aside>
    `;
};

class LateralMenu extends HTMLElement {
  constructor() {
    super();
    const activeItem = this.getAttribute("active-item");
    template_lateral_menu.innerHTML = returnMenuStructure(activeItem);
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template_lateral_menu.content.cloneNode(true));
  }
  connectedCallback() {
    this.shadowRoot
      .getElementById("logout")
      .addEventListener("click", (event) => {
        logout();
      });
  }

  logout() {
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
      })

      .catch((error) => console.log(error));
  }
}

window.customElements.define("lateral-menu", LateralMenu);
