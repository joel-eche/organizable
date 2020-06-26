import {API_URL} from "./../constants/api_constants.js";
import {initGet, initPatch} from "./headers.js"

export async function getBoardDetail(id) {
  let response = await fetch(`${API_URL}/boards/${id}`, initGet());
  console.log(response)
  if (response.ok) {
    let data = await response.json();
    console.log(data)
    return data;
  }
  return { error: response.status, message: response.statusText }
}

export async function updateBoardDetail(id, data={}) {
  console.log(initPatch(data))
  let response = await fetch(`${API_URL}/boards/${id}`, initPatch(data));
  console.log(response)
  if (response.ok) {
    let data = await response.json();
    console.log(data)
    return data;
  }
  return { error: response.status, message: response.statusText }
}