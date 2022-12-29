export class CreateTaskDTO {
  constructor(
    public name: string,
    public description: string,
    public assignee: string,
    public dueDate: Date,
  ) {}
}
