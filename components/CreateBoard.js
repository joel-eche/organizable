import { COLOR_TO_HEX } from "../js/constants.js";

const template_create_board = document.createElement("template");

const returnCreateBoardStructure = () => {
  return `
 
<link rel="stylesheet" href="./assets/styles/create-board.css">
<div class="create-board__wrapper hide">
        <form class="create-board__form">
            <input type="text" name="title" placeholder="Board title" class="input-title">
            <img class="close-board-icon" src="assets/images/closemodal.png" alt=close icon>
            <button type="submit" class="btn-create-board">Create Board</button>
        </form>
        <div class="create-board__colors">
            <button class="icon-color blue" data-color="blue"></button>
            <button class="icon-color mustard" data-color="mustard" ></button> 
            <button class="icon-color green" data-color="green"></button>
            <button class="icon-color red" data-color="red"></button>
            <button class="icon-color purple" data-color="purple"></button>
            <button class="icon-color pink" data-color="pink"></button>
            <button class="icon-color ligth-green" data-color="lightGreen"></button>
            <button class="icon-color ligth-blue" data-color="lightBlue"></button>
            <button class="icon-color gray" data-color="gray"></button>
        </div>
    </div>
  `;
};

class CreateBoard extends HTMLElement {
  constructor() {
    super();
    template_create_board.innerHTML = returnCreateBoardStructure();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template_create_board.content.cloneNode(true));
    this.formWrapper = this.shadowRoot.querySelector(".create-board__wrapper");
    this.formNewBoard = this.shadowRoot.querySelector(".create-board__form");
    this.formNewBoard.style.background = "#0079BF";
    this.addCreateEvent();
    this.attachCreateBoardEvent();
    this.selectedColor();
    this.closeModal();
  }

  attachCreateBoardEvent() {
    const buttonCreateBoard = document.querySelector(".btn-create-new-board");
    const overlay = document.querySelector(".overlay");
    buttonCreateBoard.addEventListener("click", () => {
      this.formWrapper.classList.toggle("hide");
      overlay.classList.toggle("hide");
    });
  }

  addCreateEvent() {
    this.formNewBoard.addEventListener("submit", async (event) => {
      event.preventDefault();
      const board = {
        name: this.formNewBoard.elements.title.value,
        closed: false,
        color: this.formNewBoard.dataset.currentColor,
        starred: false,
      };

      if (board.color === undefined) {
        board.color = "blue";
      }

      await fetch("http://localhost:3000/boards", {
        method: "POST",
        body: JSON.stringify(board),
        headers: {
          Authorization: 'Token token="R96umggzcAdz4sYiyHZLRDhT"',
          "Content-Type": "application/json",
        },
      });

      newBoard(board);
      this.formNewBoard.elements.title.value = "";
      this.formNewBoard.style.background = "#0079BF";
      const overlay = document.querySelector(".overlay");
      this.formWrapper.classList.toggle("hide");
      overlay.classList.toggle("hide");
    });
  }

  selectedColor() {
    const buttonsColor = this.shadowRoot.querySelectorAll(".icon-color");
    buttonsColor.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const buttonSelected = event.target;
        const color = buttonSelected.dataset.color;
        this.formNewBoard.style.backgroundColor = COLOR_TO_HEX[color];
        this.formNewBoard.dataset.currentColor = color;
      });
    });
  }

  closeModal() {
    const closeIcon = this.shadowRoot.querySelector(".close-board-icon");
    closeIcon.addEventListener("click", () => {
      const overlay = document.querySelector(".overlay");
      this.formWrapper.classList.toggle("hide");
      overlay.classList.toggle("hide");
    });
  }
}

export function newBoard(board) {
  const boardItem = document.createElement("board-item");
  boardItem.setAttribute("title", board.name);
  boardItem.setAttribute("color", board.color);
  boardItem.setAttribute("starred", board.starred);
  boardItem.setAttribute("id", board.id);
  boardItem.setAttribute("closed", board.closed); 
  return  boardItem; 
}

window.customElements.define("create-board-form", CreateBoard);
