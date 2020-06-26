import { COLOR_TO_HEX } from "../js/constants.js";
import { newBoard } from "../components/CreateBoard.js";


const template_board = document.createElement("template");

const returnBoardStructure = (title) => {
  return `
  <link rel="stylesheet" href="./assets/styles/boards-section.css" />
    <div class="board__container">
        <p class="board-title">${title}</p>
        <img class="icon-star icon-star-1 hide" src="assets/images/starred.svg" alt= icon star>
        <img class="icon-star icon-star-2 hide" src="assets/images/Vector (14).png" alt= icon star>
        <img class="icon-close-board hide" src="assets/images/closeboard.svg" alt= icon close board>
    </div>
        `;
};

class Board extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    console.log("connectedCallback");
    if (this.ready) return;
    const title = this.getAttribute("title");
    template_board.innerHTML = returnBoardStructure(title);
    const color = this.getAttribute("color");
    this.starred = JSON.parse(this.getAttribute("starred"));
    this.id = this.getAttribute("id");
    this.closed = JSON.parse(this.getAttribute("closed"));
    this.shadowRoot.appendChild(template_board.content.cloneNode(true));
    this.boardContainer = this.shadowRoot.querySelector(".board__container");
    this.boardContainer.style.backgroundColor = COLOR_TO_HEX[color];
    this.ready = true;
    this.starredABoard();
    this.setStarredClass();
    this.closeABoard();
  }

  starredABoard() {
    const starButton = this.shadowRoot.querySelector(".icon-star");
    starButton.addEventListener("click", (event) => {
      if (this.starred) {
        const myBoardWrapper = document.querySelector(".my-boards-wrapper");
        myBoardWrapper.appendChild(this);
        this.starred = false;
      } else {
        const starredWrapper = document.querySelector(".starred-wrapper");
        starredWrapper.appendChild(this);
        this.starred = true;
      }

      this.setStarredClass()
      fetch(`http://localhost:3000/boards/${this.id}`, {
        method: "PATCH",
        body: JSON.stringify({ starred: this.starred }),
        headers: {
          Authorization: 'Token token="R96umggzcAdz4sYiyHZLRDhT"',
          "Content-Type": "application/json",
        },
      });
    });
  }

  setStarredClass() {
    if (this.starred) {
      this.boardContainer.classList.add("starred");
      this.boardContainer.classList.remove("unstarred");
    } else {
      this.boardContainer.classList.add("unstarred");
      this.boardContainer.classList.remove("starred");
    }
  }

  closeABoard() {
    const closeButton = this.shadowRoot.querySelector(".icon-close-board");
    closeButton.addEventListener( "click", () => {
      console.log(this.closed);
      if(!this.closed) {
        const myBoardWrapper = document.querySelector(".my-boards-wrapper");
        myBoardWrapper.removeChild(this);
        this.closed = true;
        fetch(`http://localhost:3000/boards/${this.id}`, {
        method: "PATCH",
        body: JSON.stringify({ starred: this.closed }),
        headers: {
          Authorization: 'Token token="R96umggzcAdz4sYiyHZLRDhT"',
          "Content-Type": "application/json",
        },
      });
      };  
  });
  }

}

window.customElements.define("board-item", Board);
