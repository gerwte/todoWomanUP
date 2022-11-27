import { ADD_TODO, CHANGE_TITLE, REMOVE_TODO, TOGGLE_TODO, CHANGE_DEADLINE, CHANGE_DESCRIPTION, ADD_FILE } from "./const"
/**
 * Редюсер
 * @param {Array} state Дефолтный стейт 
 * @param {Object} action Экшн  
 * @returns {Array} Возвращает обновленный массив с задачами
 */
export const todos = (state = [], action) => {
    switch(action.type) {
        case ADD_TODO: {
            return [
                ...state,
                {
                    id: Date.now(),
                    title: action.payload,
                    completed: false,
                    deadline: {
                        day: null,
                        month: null,
                        year: null,
                        hour: null,
                        minute: null,
                    },
                    description: '',
                    file: null,
                }
            ]
        }
        case REMOVE_TODO: {
            return state.filter((todo) => todo.id !== action.payload)
        }
        case TOGGLE_TODO: {
            return state.map(todo => 
                todo.id === action.payload ? {...todo, completed: !todo.completed} : todo)
        }
        case CHANGE_TITLE: {
            return state.map(todo => 
                todo.id === action.id ? {...todo, title: action.text} : todo)
        }
        case CHANGE_DESCRIPTION: {
            return state.map(todo => 
                todo.id === action.id ? {...todo, description: action.text} : todo)
        }
        case CHANGE_DEADLINE: {
            return state.map(todo => 
                todo.id === action.id ? {...todo, deadline: 
                    {
                        day: action.day, 
                        month: action.month, 
                        year: action.year,
                        hour: action.hour,
                        minute: action.minute
                    }
                } : todo)
        }
        case ADD_FILE: {
            return state.map(todo =>
                todo.id === action.id ?  {
                    ...todo, file: action.file 
                } : todo)
        }
        default: {
            return state
        }
    }
}