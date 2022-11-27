import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, CHANGE_TITLE, CHANGE_DESCRIPTION, CHANGE_DEADLINE, ADD_FILE } from "./const"

export const addTodo = (payload) => ({
    type: ADD_TODO,
    payload
});

export const removeTodo = (payload) => ({
    type: REMOVE_TODO,
    payload
});

export const toggleTodo = (payload) => ({
    type: TOGGLE_TODO,
    payload
});

export const changeTitle = (id, text ) => ({
    type: CHANGE_TITLE, 
    id, 
    text
});

export const changeDescription = (id, text) => ({
    type: CHANGE_DESCRIPTION,
    id,
    text
});

export const changeDeadline = (id, day, month, year, hour, minute) => ({
    type: CHANGE_DEADLINE,
    id,
    day,
    month,
    year,
    hour,
    minute,
});

export const addFiles = (id, file) => ({
    type: ADD_FILE,
    id,
    file,
});