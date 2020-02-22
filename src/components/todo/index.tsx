import React, { FormEvent, FocusEvent, MouseEvent } from "react"
const userbase = typeof window !== 'undefined' ? require('userbase-js').default : null;

// Components
import Layout from "../layout"
import SEO from "../seo";

// Types
import { Form } from "../../types/forms/Form"
import { FormField } from "../../types/forms/FormField"
import { IError } from "../../types/userbase/IError"
import { ITodo } from "../../types/todo/itodo";
import { ITodoState } from "../../types/todo/itodo-state";
import { Validators } from "../../types/forms/Validators"

class Todo extends React.Component<{ user: userbase.UserResult }, ITodoState> {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      todos: [],
      generalError: null,
      addTodoForm: new Form([
        new FormField('todoName', '', [Validators.required])
      ]),
      addTodoFormError: null
    };
    this.handleDBChanges = this.handleDBChanges.bind(this);
    this.handleCompletionChange = this.handleCompletionChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlurEvent = this.handleBlurEvent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    userbase.openDatabase({ databaseName: 'todos', changeHandler: this.handleDBChanges })
    .catch((error: IError) => {
      this.setState((state: ITodoState) => {
        return {
          ...state,
          generalError: error.message
        };
      });
    });
  }

  /**
   * Updates the state on any changes to the database.
   * @param {Item[]} items 
   */
  handleDBChanges(items: userbase.Item[]) {
    this.setState((state) => {
      return {
        ...state,
        todos: items
      };
    });
  }

  /**
   * Updates the completed status of a todo.
   * @param {FormEvent<HTMLInputElement>} event 
   * @param {ITodo} todo 
   * @param {number} index 
   */
  handleCompletionChange(event: FormEvent<HTMLInputElement>, todo: ITodo, index: number) {
    event.persist();
    let newTodos: userbase.Item[] = this.state.todos;
    newTodos[index].item = {
      ...newTodos[index].item,
      completed: !todo.completed 
    };
    this.setState((state) => {
      return {
        ...state,
        todos: newTodos
      };
    });
    const updatedTodo: ITodo = Object.assign({}, this.state.todos[index].item);
    const itemId: string = event.currentTarget.id;
    userbase.updateItem({ databaseName: 'todos', item: updatedTodo, itemId: itemId })
    .catch((error: IError) => {
      this.setState((state: ITodoState) => {
        return {
          ...state,
          generalError: error.message
        };
      });
    });
  }

  /**
   * Deletes a todo from the database.
   * @param {MouseEvent<HTMLButtonElement>} event 
   * @param {string} itemId 
   * @param {number} index 
   */
  deleteTodo(event: MouseEvent<HTMLButtonElement>, itemId: string, index: number) {
    event.persist();
    let newTodos: userbase.Item[] = this.state.todos;
    newTodos.splice(index, 1);
    this.setState((state) => {
      return {
        ...state,
        todos: newTodos
      };
    });
    userbase.deleteItem({ databaseName: 'todos', itemId: itemId })
    .catch((error: IError) => {
      this.setState((state: ITodoState) => {
        return {
          ...state,
          generalError: error.message
        };
      });
    });
  }

  /**
   * Sets the form value in the state.
   * @param {FormEvent<HTMLInputElement>} event 
   */
  handleInputChange(event: FormEvent<HTMLInputElement>) {
    event.persist();
    const newFormFieldValue: string = event.currentTarget.value;
    let addTodoForm: Form = this.state.addTodoForm;
    addTodoForm.setFormFieldValue('todoName', newFormFieldValue);
    this.setState((state: ITodoState) => {
      return {
        ...state,
        addTodoForm: addTodoForm
      };
    });
  }

  /**
   * Sets the touched attribute for a form field.
   * @param {FocusEvent} event 
   */
  handleBlurEvent(event: FocusEvent) {
    event.persist();
    let addTodoForm: Form = this.state.addTodoForm;
    addTodoForm.setFormFieldTouched('todoName', true);
    this.setState((state: ITodoState) => {
      return {
        ...state,
        addTodoForm: addTodoForm
      };
    });
  }

  /**
   * Adds a new todo.
   * @param {FormEvent<HTMLFormEvent>} event 
   */
  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let addTodoForm: Form = this.state.addTodoForm;
    addTodoForm.setSubmitted(true);
    this.setState((state: ITodoState) => {
      return {
        ...state,
        addTodoForm: addTodoForm
      };
    });
    if (this.state.addTodoForm.changed && this.state.addTodoForm.valid) {
      const todoName: string = this.state.addTodoForm.getFormField('todoName').value;
      userbase.insertItem({ databaseName: 'todos', item: { name: todoName, completed: false } })
      .then(() => {
        let resetTodoForm: Form = this.state.addTodoForm;
        resetTodoForm.resetForm();
        this.setState((state: ITodoState) => {
          return {
            ...state,
            addTodoForm: resetTodoForm
          };
        });
      })
      .catch((error: IError) => {
        this.setState((state: ITodoState) => {
          return {
            ...state,
            addTodoFormError: error.message
          };
        });
      });
    }
  }

  render() {
    return (
      <Layout user={this.state.user}>
        <SEO title="Todos" />
        <h1 className="m-0 mb-3 text-4xl">Welcome, { this.state.user.profile?.firstName ? this.state.user.profile.firstName : this.state.user.username }!</h1>
        <h2 className="m-0 text-2xl">Your TODOs</h2>
        {
          this.state.generalError &&
            <p className="error mt-4">{this.state.generalError}</p>
        }
        <div className="mt-4">
          {
            this.state.todos.map((todo: userbase.Item, index: number) => {
              return (
                <div key={todo.itemId} className="flex flex-row items-center my-4">
                  <button className="btn-icon bg-red-800 text-white" onClick={e => this.deleteTodo(e, todo.itemId, index)}>
                    X
                  </button>
                  <input className="ml-4" type="checkbox" id={todo.itemId} name={todo.itemId} value={ todo.item.completed } checked={ todo.item.completed } onChange={(e) => {this.handleCompletionChange(e, todo.item, index)}} />
                  <label className={`mb-0 ml-4 ${todo.item.completed ? 'line-through' : ''}`} htmlFor={todo.itemId}> { todo.item.name }</label> <br></br>
                </div>
              );
            })
          }
        </div>
        <form className="max-w-sm" onSubmit={this.handleSubmit}>
          <div className="mb-4">
            <input id="todoName" type="text" placeholder="Add Todo" value={this.state.addTodoForm.getFormField('todoName').value} onChange={this.handleInputChange} onBlur={this.handleBlurEvent} />
            <p className={`error-msg ${this.state.addTodoForm.getFormField('todoName').error !== Validators.none ? 'show' : ''}`}>
              This field is required.
            </p>
          </div>
          <button className="btn-primary w-full" type="submit">
            Add
          </button>
          {
            this.state.addTodoFormError &&
              <p className="error mt-4">{this.state.addTodoFormError}</p>
          }
        </form>
      </Layout>
    )
  }
}

export default Todo