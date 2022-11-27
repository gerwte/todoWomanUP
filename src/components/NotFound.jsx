import React from 'react'
import style from '../styles/NotFound.module.css'

function NotFound() {
    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <div className={style.image}></div>
                <p className={style.title}>Задачи не найдены</p>
                <p className={style.text}>Добавьте задачи, с помощью поля выше.</p>
            </div>
        </div>
    )
}

export default NotFound