import { combineReducers } from "redux";
import { todos } from "./reducer";


export const rootReducer = combineReducers({
    todos
});