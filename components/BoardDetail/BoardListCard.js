

const template_board_list_card = document.createElement("template");

const fillTags = (labels) => {
  let tags = ``;
  labels.forEach((label) => tags += `<div class="board-list-card__tag ${label.color}"></div>`);
  return tags
}

const fillCheckList = (completedCheckItems, checkItems) => {
  return checkItems > 0 ? `<i class="far fa-check-square"></i><span>${completedCheckItems}/${checkItems}</span>` : ``;
}

const getBoardListCard = (data) => {
  let {cardId, name, labels, checkItems, completedCheckItems} = data;
  return `
    <link rel="stylesheet" href="/assets/styles/board-list-card.css">
    <link rel="stylesheet" href="https://kit-free.fontawesome.com/releases/latest/css/free.min.css">
    <div class="board-list-card">
      <div class="board-list-card__tags">
        ${fillTags(labels)}
      </div>
      <div class="board-list-card__body">
        <p class="board-list-card__body-title">${name}</p>
        <span class="board-list-card__body-checklist">
          ${fillCheckList(completedCheckItems, checkItems)}
        </span>
      </div>
    </div>
  `;
}

class BoardListCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});

  }

  connectedCallback() {
    const data = JSON.parse(this.getAttribute("data-card"));
    template_board_list_card.innerHTML = getBoardListCard(data);
    this.shadowRoot.appendChild(template_board_list_card.content.cloneNode(true));
  }
}

window.customElements.define('board-list-card', BoardListCard);