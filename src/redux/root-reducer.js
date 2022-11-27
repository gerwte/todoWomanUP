import { combineReducers } from "redux";
import { todos } from "./reducer";

/**
 * Корневой редюсер
 * @return {Object} Возвращает объект todos, который является редюсером 
 */
export const rootReducer = combineReducers({
    todos
});