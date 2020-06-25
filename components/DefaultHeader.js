const template_default_header = document.createElement("template");

const returnHeaderStructure = () => {
  return `
    <link rel="stylesheet" href="./assets/styles/header.css">
    <header class="header">
      <img src="./assets/images/logo.png" alt="Organizable">
    </header>
    `;
}

class DefaultHeader extends HTMLElement {

  constructor() {
    super();
    const activeItem = this.getAttribute("active-item");
    template_default_header.innerHTML = returnHeaderStructure(activeItem);
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template_default_header.content.cloneNode(true));
  }
}

window.customElements.define("default-header", DefaultHeader);
