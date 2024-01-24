import { Component } from '@angular/core';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
  editing: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  presentDateTime: string = '';
  todo: Todo[] = [
    {
      id: 1,
      task: 'Learn Typescript',
      completed: false,
      editing: false,
    },
  ];
  newTodo: string = '';
  selectAllChecked: boolean = false;

  constructor() {
    this.getPresentDateTime();
  }

  getPresentDateTime = () => {
    const currentDateTime = new Date();
    this.presentDateTime = currentDateTime.toLocaleString();
  };

  addOrUpdateTodo = () => {
    if (this.newTodo.trim() !== '') {
      // Check if editing existing task
      const existingTodo = this.todo.find((t) => t.editing);

      if (existingTodo) {
        // If editing, update the task
        existingTodo.task = this.newTodo;
        existingTodo.editing = false;
      } else {
        // If not editing, add a new task
        const newTodo: Todo = {
          id: this.todo.length + 1,
          task: this.newTodo,
          completed: false,
          editing: false,
        };

        this.todo.push(newTodo);
      }

      this.newTodo = ''; // Clear the input field
      this.updateUncompletedTasks();
    }
  };

  startEditing(todoItem: Todo) {
    // Set editing to true and populate the input field with the task text
    todoItem.editing = true;
    this.newTodo = todoItem.task;
  }

  saveEditedTodo(todoItem: Todo) {
    // Save changes when editing is complete
    todoItem.editing = false;
    this.newTodo = ''; // Clear the input field
    this.updateUncompletedTasks();
  }

  toggleAllCompleted = () => {
    this.todo.forEach((task) => (task.completed = this.selectAllChecked));
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
    const isChecked = this.todo.some((task) => task.completed);
    if (isChecked) {
      this.updateUncompletedTasks();
    } else if (!isChecked) {
      this.updateUncompletedTasks();
    }
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
