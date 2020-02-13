import { UserResult, Item } from "userbase-js";
import { Form } from "../../types/forms/Form";

export interface ITodoState {
  user: UserResult;
  todos: Item[];
  generalError: string;
  addTodoForm: Form;
  addTodoFormError: string;
}