import { newBoard } from "../components/CreateBoard.js";

const closedBoards = document.querySelector(".closed-board");

export async function getBoards() {
  const response = await fetch("http://localhost:3000/boards", {
    method: "GET",
    headers: {
      Authorization: 'Token token="R96umggzcAdz4sYiyHZLRDhT"',
      "Content-Type": "application/json",
    },
  });

  let listBoards = await response.json();
  return listBoards;
}

export async function renderSavedBoards() {
  const listBoards = await getBoards();
  const boardsToShow = listBoards.filter((board) => !board.closed);
  console.log(boardsToShow);
  boardsToShow.forEach((board) => {
    const boardItem = newBoard(board);
    console.log(boardItem);
    if (board.starred) {
      const starredWrapper = document.querySelector(".starred-wrapper");
      starredWrapper.appendChild(boardItem);
    } else {
      const myBoardWrapper = document.querySelector(".my-boards-wrapper");
      myBoardWrapper.appendChild(boardItem);
    }
  });
}

export async function renderClosedBoards() {
  const listBoards = await getBoards();
  const boardsToShow = listBoards.filter((board) => board.closed);
  boardsToShow.forEach((board) => {
    const boardItem = newBoard(board);
    closedBoards.appendChild(boardItem);
  });
}

renderSavedBoards();

if (closedBoards) {
  renderClosedBoards();
}
