class Board {
  constructor({id, name, closed, color, user_id, starred}) {
    this.id = id;
    this.name = name;
    this.closed = closed;
    this.color = color;
    this.user_id = user_id;
    this.starred = starred;
  }
}