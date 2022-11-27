import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, CHANGE_TITLE, CHANGE_DESCRIPTION, CHANGE_DEADLINE, ADD_FILE } from "./const"

/** Экшн добавления задачи 
 * @param {string} payload Заголовок новой задачи
*/
export const addTodo = (payload) => ({
    type: ADD_TODO,
    payload
});
/** Экшн удаления задачи 
 * @param {number} payload ID задачи, которую необходимо удалить
*/
export const removeTodo = (payload) => ({
    type: REMOVE_TODO,
    payload
});
/** Экшн отметки задачи как выполненной 
 * @param {number} payload ID задачи, которую надо отметить как выполненную
*/
export const toggleTodo = (payload) => ({
    type: TOGGLE_TODO,
    payload
});
/** Экшн изменения заголовка задачи 
 * @param {number} id ID задачи в которой меняется заголовок
 * @param {string} text Новый заголвок
*/
export const changeTitle = (id, text) => ({
    type: CHANGE_TITLE, 
    id, 
    text
});
/** Экшн изменения описания задачи
 * @param {number} id ID задачи, в которой добавляется/меняется описание
 * @param {string} text Описание, на которое нужно поменять
 */
export const changeDescription = (id, text) => ({
    type: CHANGE_DESCRIPTION,
    id,
    text
});
/** Экшн изменения даты завершения задачи 
 * @param {number} id ID задачи, в которой добавляется/меняется дата завершения
 * @param {number} day Число выполнения 
 * @param {number} month Месяц выполнения 
 * @param {number} year Год выполнения 
 * @param {number} hour Час выполнения 
 * @param {number} minute Минута выполнения 
*/
export const changeDeadline = (id, day, month, year, hour, minute) => ({
    type: CHANGE_DEADLINE,
    id,
    day,
    month,
    year,
    hour,
    minute,
});
/** Экшн добавления изображения к задаче 
 * @param {number} id ID задачи, в которой добавляется/меняется приложенное изображения
 * @param {string} file Ссылка на файл, который нужно добавить/поменять
*/
export const addFiles = (id, file) => ({
    type: ADD_FILE,
    id,
    file,
});