const template_board = document.createElement("template");

const returnBoardStructure = (title) => {
  return `
  <link rel="stylesheet" href="./assets/styles/boards-section.css" />
    <div class="board__container">
        <p class="board-title">${title}</p>
        <i class="far fa-star"></i>
        <i class="far fa-window-close hide"></i>
    </div>
        `;
};

class Board extends HTMLElement {
  constructor() {
    super();
    const title = this.getAttribute("title");
    template_board.innerHTML = returnBoardStructure(title);
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template_board.content.cloneNode(true));
  }
}


window.customElements.define("board-item", Board);
