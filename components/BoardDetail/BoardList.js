const template_board_list = document.createElement("template");

const getBoardListStructure = (data_list) => {
  let {name, cards} = data_list;

  return `
  <link rel="stylesheet" href="./../../assets/styles/board-list.css">
  <link rel="stylesheet" href="./../../assets/styles/board-list-card.css">
    <link rel="stylesheet" href="https://kit-free.fontawesome.com/releases/latest/css/free.min.css">
    <div class="board-list">
      <header class="board-list__header">
        <div class="board-list__title">
          <h2 class="board-list__title-text">${name}</h2>
          <form action="">
            <input class="board-list__title-input hide" type="text" name="name" id="">
          </form>
        </div>
        <form action="" method="post">
          <button type="submit" class="board-list__delete">
            <i class="far fa-window-close"></i>
          </button>
        </form>
      </header>
      <div class="board-list__body">
        <board-list-cards cards='${JSON.stringify(cards)}'></board-list-cards>
      </div>
      <div class="board-list__footer">
        <div>
          <button id="btn-add-another-card" class="board-list__footer_btn-add-another-card">
            <i class="fas fa-plus"></i>
            Add another card
          </button>
        </div>
        <div id="form-add-card" class="hide">
          <input
            type="text"
            name="card-title"
            id="card-title"
            placeholder="Enter a title for this card..."
            class="board-list__footer__form-title-card"
          >
          <div class="board-list__footer_control-form">
            <button id="btn-add-card" type="button" class="board-list__footer_btn-add-card">Add Card</button>
            <button id="btn-hide-form" class="board-list__footer__btn-hide-form">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
class BoardList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  connectedCallback() {
    const data_list = JSON.parse(this.getAttribute("data-list"));
    console.log(data_list)
    template_board_list.innerHTML = getBoardListStructure(data_list);
    this.shadowRoot.appendChild(template_board_list.content.cloneNode(true));
    
    // add listeners
    this.shadowRoot.getElementById("btn-add-another-card").addEventListener("click", () => {
      // show form and hide itself
      this.shadowRoot.getElementById("form-add-card").classList.remove("hide");
      this.shadowRoot.getElementById("btn-add-another-card").classList.add("hide");
    });

    this.shadowRoot.getElementById("btn-hide-form").addEventListener("click", () => {
      // hide form and show btn-add-another-card
      this.shadowRoot.getElementById("form-add-card").classList.add("hide");
      this.shadowRoot.getElementById("btn-add-another-card").classList.remove("hide");
    });

    this.shadowRoot.getElementById("btn-add-card").addEventListener("click", () => {
      console.log('click')
    });


  }
}

window.customElements.define('board-list', BoardList);