import React from 'react'
import Task from './Task'
import NotFound from './NotFound'
import style from '../styles/Main.module.css'
import { useSelector } from 'react-redux'

function Main() {
  /**
   * Объект с задачами
   * @type {Object}
   */
    const tasks = useSelector((state => state.todos.reverse()))
  /**
   * Завершенные задачи
   */
    const completedTasks = tasks.filter(task => task.completed === true)
  return (
    <div className={style.container}>
        <div className={style.statistics}>
            <div className={style.statistics__all}>
                <p className={style.statistics__title__all}>Всего задач</p>
                <p className={style.statistics__number}>{tasks.length}</p>
            </div>
            <div className={style.statistics__completed}>
                <p className={style.statistics__title__completed}>Выполнено</p>
                <p className={style.statistics__number}>{completedTasks.length} из {tasks.length}</p>
            </div>
        </div>
         {tasks.length > 0 ? tasks.map(task => <Task key={task.id} task={task} />) : <NotFound />}
    </div>
  )
}

export default Main