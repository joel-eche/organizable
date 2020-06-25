const template_lateral_menu = document.createElement("template");

const returnMenuStructure = (activeItem) => {
  return `
    <link rel="stylesheet" href="./assets/styles/menu.css">
    <aside class="lateral-section">
      <nav>
        <ul class="menu list-undecorated">
          <li class="menu__item ${activeItem === "index" ? "menu-active" : ""}">
            <span>My boards</span>
          </li>
          <li class="menu__item ${activeItem === "closed" ? "menu-active" : ""}">
            <span>Closed boards</span>
          </li class="menu__item">
          <li class="menu__item ${activeItem === "profile" ? "menu-active" : ""}">
            <span>My profile</span>
          </li>
          <li class="menu__item">
            Log out
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
