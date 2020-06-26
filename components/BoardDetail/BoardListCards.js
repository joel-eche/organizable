const template_board_list_cards = document.createElement("template");

const getBoardListCards = () => {
  return `
    <link rel="stylesheet" href="./../../assets/styles/board-lists.css">
    <div id="board-list-cards" class="board-list-cards">
    </div>
  `;
}
class BoardListCards extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    template_board_list_cards.innerHTML = getBoardListCards();
    this.shadowRoot.appendChild(template_board_list_cards.content.cloneNode(true));

  }

  connectedCallback() {
    const cards = JSON.parse(this.getAttribute("cards"));
    console.log(cards)
    cards.forEach(c => {
      let card = document.createElement("board-list-card");
      card.setAttribute("data-card", JSON.stringify(c));
      this.shadowRoot.getElementById("board-list-cards").appendChild(card)
    });
  }
}

window.customElements.define('board-list-cards', BoardListCards);