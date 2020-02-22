const userbase = typeof window !== 'undefined' ? require('userbase-js').default : null;
import { Form } from "../forms/Form";

export interface ITodoState {
  user: userbase.UserResult;
  todos: Item[];
  generalError: string;
  addTodoForm: Form;
  addTodoFormError: string;
}