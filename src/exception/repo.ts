export class EntityNotFoundError extends Error {
  text: string;

  constructor(text: string | number) {
    super();
    this.text = `Entity Not Found: ${text}`;
  }
}
