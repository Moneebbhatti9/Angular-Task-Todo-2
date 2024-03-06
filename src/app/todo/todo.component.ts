import { Component } from "@angular/core";

interface Todo {
  id: number;
  task: string;
  completed: boolean;
  editing: boolean;
}

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
})
export class TodoComponent {
  presentDateTime: string = "";
  todo: Todo[] = [
    {
      id: 1,
      task: "Learn Typescript",
      completed: false,
      editing: false,
    },
  ];
  newTodo: string = "";
  selectAllChecked: boolean = false;

  constructor() {
    this.getPresentDateTime();
  }

  getPresentDateTime = () => {
    const currentDateTime = new Date();
    this.presentDateTime = currentDateTime.toLocaleString();
  };

  addOrUpdateTodo = () => {
    if (this.newTodo.trim() !== "") {
      const existingTodo = this.todo.find((t) => t.editing);

      if (existingTodo) {
        existingTodo.task = this.newTodo;
        existingTodo.editing = false;
      } else {
        const newTodo: Todo = {
          id: this.todo.length + 1,
          task: this.newTodo,
          completed: false,
          editing: false,
        };

        this.todo.push(newTodo);
      }

      this.newTodo = "";
      this.updateUncompletedTasks();
    }
  };

  startEditing(todoItem: Todo) {
    todoItem.editing = true;
    this.newTodo = todoItem.task;
  }

  saveEditedTodo(todoItem: Todo) {
    todoItem.editing = false;
    this.newTodo = ""; // Clear the input field
    this.updateUncompletedTasks();
  }

  toggleAllCompleted = () => {
    const areAllTasksCompleted = this.todo.every((task) => task.completed);
    this.selectAllChecked = !areAllTasksCompleted;
    this.todo.forEach((task) => (task.completed = !areAllTasksCompleted));
    this.updateUncompletedTasks();
  };

  updateUncompletedTasks = (): number => {
    return (this.uncompletedTask = this.todo.filter(
      (t) => !t.completed
    ).length);
  };

  uncompletedTask: number = this.updateUncompletedTasks();

  toggleCompleted = (todo: Todo) => {
    todo.completed = !todo.completed;
    this.updateUncompletedTasks();
  };

  checkBoxIsChecked(): boolean {
    const isChecked = this.todo.every((task) => task.completed);
    this.selectAllChecked = isChecked;
    this.updateUncompletedTasks();
    return isChecked;
  }

  deleteTodo = (i: number) => {
    this.todo.splice(i, 1);
    this.updateUncompletedTasks();
  };

  deleteCompletedTodo = () => {
    this.todo = this.todo.filter((task) => !task.completed);
    this.updateUncompletedTasks();
  };
}
