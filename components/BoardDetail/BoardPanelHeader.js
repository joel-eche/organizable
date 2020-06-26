import {getStoredItem, setStoredItem} from "./../../utils/storage.js";
import { updateBoardDetail } from "./../../api/board.js";

const template_board_panel_header = document.createElement("template");

const returnBoardPanelHeaderStructure = ({title, starred=false}) => {
  console.log(starred)
  return `
  <link rel="stylesheet" href="/assets/styles/board-panel-header.css">
  <link rel="stylesheet" href="https://kit-free.fontawesome.com/releases/latest/css/free.min.css">
  <header class="board-panel__header">
    <h1 class="board-panel__header-title">${title}</h1>
    <button type="button" id="btn-starred" class="board-panel__btn btn-starred ${starred ? "active": ""}">
      <i class="far fa-star board-panel__btn-star"></i>
    </button>
    <button type="button" id="btn-delete" class="board-panel__btn">
      <i class="far fa-window-close board-panel__btn-delete"></i>
    </button>
  </header>
  `;
}

class BoardPanelHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  connectedCallback() {
    let id = this.getAttribute("id");
    let starred = this.getAttribute("starred") === "true";
    let title = this.getAttribute("title");

    // rendering
    template_board_panel_header.innerHTML = returnBoardPanelHeaderStructure({title, starred});
    this.shadowRoot.appendChild(template_board_panel_header.content.cloneNode(true));

    // adding listeners
    this.shadowRoot.getElementById("btn-starred").addEventListener("click", (evt) => {
      this.setStarred(id);
    });
    this.shadowRoot.getElementById("btn-delete").addEventListener("click", (evt) => {
      console.log(evt)
    });
  }

  disconnectedCallback() {

  }

  attributeChangedCallback() {
    
  }

  async setStarred(id) {
    let board = getStoredItem("board");
    board.starred = !board.starred;
    const data = await updateBoardDetail(id, {starred: board.starred});
    if (!data.error) {
      if(data.starred) {
        this.shadowRoot.getElementById("btn-starred").classList.add("active");
      } else {
        this.shadowRoot.getElementById("btn-starred").classList.remove("active");
      }
      setStoredItem("board", data)
    }
  }

}

window.customElements.define("board-panel-header", BoardPanelHeader);