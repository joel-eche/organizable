import { getParam } from "../../utils/params.js";
import { getStoredItem, setStoredItem } from "../../utils/storage.js";
import { getBoardDetail } from "./../../api/board.js";

const template_board_panel = document.createElement("template");

const getBoardPanelStructure = (board) => {
  const { id, title, starred, color, lists } = board;
  console.log(color)
  return `
  <link rel="stylesheet" href="./../../assets/styles/board-panel.css">
  <div class="board-panel ${color}">
    <board-panel-header id="${id}" title="${title}" starred=${starred}></board-panel-header>

    <div class="board-panel__body">
      <board-panel-lists lists='${lists}'></board-panel-lists>
    </div>
  </div>
  `;
}


class BoardPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const id = getParam("id");
    if (id) {
      this.fillDetail(id);
    }

  }

  async fillDetail(id) {
    const data = await getBoardDetail(id);
    if (!data.error) {
      console.log(data)
      setStoredItem("board", data)
      // fill element
      template_board_panel.innerHTML = getBoardPanelStructure({
        id: data.id,
        title: data.name,
        starred: data.starred,
        color: data.color,
        lists: JSON.stringify(data.lists),
      });
      this.shadowRoot.appendChild(template_board_panel.content.cloneNode(true));
    }
  }
}

window.customElements.define("board-panel", BoardPanel);