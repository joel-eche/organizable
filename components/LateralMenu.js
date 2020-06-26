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
          <li class="menu__item ${activeItem === "closed" ? "menu-active" : ""}">
            <a class="menu__item__link" href="closed-boards.html">Closed boards</a>
          </li>
          <li class="menu__item ${activeItem === "profile" ? "menu-active" : ""}">
            <a class="menu__item__link" href="profile.html">My profile</a>
          </li>
          <li class="menu__item">
            <button id="logout" class="menu__item__link">Log out</button>
          </li>
        </ul>
      </nav>
    </aside>
    `;
}

class LateralMenu extends HTMLElement {

  constructor() {
    super();
    const activeItem = this.getAttribute("active-item");
    template_lateral_menu.innerHTML = returnMenuStructure(activeItem);
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template_lateral_menu.content.cloneNode(true));
  }
}

window.customElements.define("lateral-menu", LateralMenu);
