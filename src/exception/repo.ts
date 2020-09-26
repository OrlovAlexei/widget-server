export class EntityNotFoundError extends Error {
  text: string;

  constructor(id: string) {
    super();
    this.text = `Recipe Not Found: ${id}`;
  }
}
