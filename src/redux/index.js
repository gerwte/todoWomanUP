import { createStore } from "redux";
import { rootReducer } from "./root-reducer";

/**
 * Хранилище состояний 
 * @method
 * @param {Object} rootReducer Корневой редюсер
 * @param {Object} __REDUX_DEVTOOLS_EXTENSION__ Для корректной работы redux devtools
 * @param {Function} window.__REDUX_DEVTOOLS_EXTENSION__ Также для корректной работы redux devtools 
 */
export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())