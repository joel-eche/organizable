const template_board_lists_cards = document.createElement("template");

const getBoardListCards = () => {
  return `
    <link rel="stylesheet" href="./../../assets/styles/board-lists.css">
    <div id="">
    </div>
  `;
}
class BoardListCards extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    template_board_panel_lists.innerHTML = getBoardListCards();
    this.shadowRoot.appendChild(template_board_panel_lists.content.cloneNode(true));

  }

  connectedCallback() {
    const lists = JSON.parse(this.getAttribute("lists"));
    console.log(lists)
    lists.forEach(l => {
      let list = document.createElement("board-list");
      list.setAttribute("data-list", JSON.stringify(l));
      this.shadowRoot.getElementById("board-lists").appendChild(list)
    });
  }
}

window.customElements.define('board-list-cards', BoardListCards);