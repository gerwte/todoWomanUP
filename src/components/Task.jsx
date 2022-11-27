import React, { useState, useEffect } from 'react';
import style from '../styles/Task.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo } from '../redux/actions';
import { toggleTodo } from '../redux/actions';
import Modal from './Modal';

function Task({ task }) {

    // Нужно сравнить две даты, на основе истинности сравнения изменить состояние и сделать отрисовку по условию
    const dispatch = useDispatch()
    const [opened, setOpened] = useState(false)
    const deadline = task.deadline
    const [outOfTime, setOutOfTime] = useState(false)
    const deadlineDate = new Date(deadline.year, deadline.month, deadline.day, deadline.hour, deadline.minute)
    const nowDate = new Date()
    
    useEffect(() => {
        nowDate > deadlineDate && setOutOfTime(true)
        deadline.hour === null && setOutOfTime(false)
    });

    return (
        <div className={style.container}>
            <div className={style.checkbox_text}>
                <input className={style.checkbox} type='checkbox' checked={task.completed} onChange={() => dispatch(toggleTodo(task.id))} />
                <div className={style.text} style={outOfTime ? {color: 'red'} : {}}>{task.title}</div>
            </div>
            <div className={style.task__description}>
                {task.description ? 
                    <div className={style.task__description__text}>{task.description}</div>
                    : <div className={style.task__description__none}>Добавьте описание</div>
                }
            </div>
            <div className={style.deadline_image}>
                <div className={style.deadline}>
                    {deadline.year ? 
                        <div className={style.deadline__date}>{deadline.day}.{deadline.month}.{deadline.year} {deadline.hour}:{deadline.minute}</div> 
                        : '00.00.0000 00:00'}
                </div>
                <div className={style.image}>
                    {task.file ? 
                        <img src={task.file} width='200' /> : 
                        <div className={style.image_none}>Добавьте изображение</div>
                    } 
                </div>
            </div>
            <div className={style.open_trash}>
                <div className={style.trash} onClick={() => dispatch(removeTodo(task.id))}></div>
                <button className={style.open} onClick={() => setOpened(true)}>Открыть</button>
            </div>
            {opened ? <Modal task={task} opened={opened} setOpened={setOpened} /> : ''}
        </div>
    )
}

export default Task