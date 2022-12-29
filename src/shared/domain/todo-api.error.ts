export class ToDoAPIError extends Error {
  constructor(public name: string, public message: string) {
    super(message);
  }
}
