const template_board_panel_lists = document.createElement("template");

const getBoardPanelListStructure = () => {
  return `
  <link rel="stylesheet" href="./../../assets/styles/board-lists.css">
    <div id="board-lists">
    </div>
  `;
}
class BoardPanelLists extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    template_board_panel_lists.innerHTML = getBoardPanelListStructure();
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

window.customElements.define('board-panel-lists', BoardPanelLists);