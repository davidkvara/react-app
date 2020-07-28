import React from "react";
import "./todo.css";
import { v4 as uuidv4 } from "uuid";
import Input from "./components/Input";
import TodoList from "./components/TodoList";

class Todo extends React.Component {
  state = {
    todos: [
      { text: "sleep tight", completed: true, id: "a" },
      { text: "write code", completed: false, id: "b" },
      { text: "don't stop", completed: true, id: "c" }
    ],
    visibility_filter: "SHOW_ALL"
  };

  handleSubmit = value => {
    if (!value.trim()) return;

    const id = uuidv4();
    const newTodo = { text: value, completed: false, id };
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  };

  handleToggleCheck = todoID => {
    const todos = this.state.todos.map(todo =>
      todo.id === todoID ? { ...todo, completed: !todo.completed } : todo
    );
    this.setState({ todos });
  };

  handleDelete = todoID => {
    const todos = this.state.todos.filter(todo => todo.id !== todoID);
    this.setState({ todos });
  };

  handleFilter = filterType => {
    this.setState({ visibility_filter: filterType });
  };

  clearCompleted = () => {
    const activeTodos = this.state.todos.filter(todo => !todo.completed);
    this.setState({ todos: activeTodos });
  };

  render() {
    // displayed todos
    const todos = filter(this.state.visibility_filter, this.state.todos);

    const activeTodosLength = filter("SHOW_ACTIVE", this.state.todos).length;

    return (
      <div className="todo">
        <h1 className="td-title">todos</h1>
        <Input onSubmit={this.handleSubmit} />
        {this.state.todos.length > 0 && (
          <TodoList
            todos={todos}
            onDelete={this.handleDelete}
            onCheck={this.handleToggleCheck}
            onFilterChange={this.handleFilter}
            activeTodosLength={activeTodosLength}
            handleClear={this.clearCompleted}
          />
        )}
      </div>
    );
  }
}

function filter(filterType, items) {
  switch (filterType) {
    case "SHOW_COMPLETED":
      return items.filter(todos => todos.completed);
    case "SHOW_ACTIVE":
      return items.filter(todos => !todos.completed);
    default:
      return items;
  }
}

export default Todo;
