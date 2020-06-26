class Card {
  constructor({id, name, desc="", pos, closed, list_id}) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.pos = pos;
    this.closed = closed;
    this.list_id = list_id;
  }
}