import React, { useState, useRef } from 'react'
import style from '../styles/Modal.module.css'
import { useDispatch } from 'react-redux'
import { changeTitle, changeDescription, changeDeadline } from '../redux/actions'
import dayjs from 'dayjs'
import { addFiles } from '../redux/actions'

/**
 * Компонент модалки
 * @param {Object} task Объект с задачей 
 * @param {Object} setOpened Изменение состояние открытой модалки
 * @returns 
 */
function Modal({ task, setOpened }) {
  const dayObj = dayjs()
  const dispatch = useDispatch()

 /**
  * Состояние и изменение установленного в select дня завершения задачи
  */
  const [day, setDay] = useState(dayObj.$D)
  /**
  * Состояние и изменение установленного в select месяца завершения задачи
  */
  const [month, setMonth] = useState(dayObj.$M + 1)
  /**
  * Состояние и изменение установленного в select года завершения задачи
  */
  const [year, setYear] = useState(dayObj.$y)
  /**
  * Состояние и изменение установленного в select часа завершения задачи
  */
  const [hour, setHours] = useState(null)
  /**
  * Состояние и изменение установленной в select минуты завершения задачи
  */
  const [minute, setMinutes] = useState(null)
  /**
   * Состояние и изменение состояния заголовка
  */
  const [newTitle, setNewTitle] = useState(task.title)
  /**
   * Состояние и изменение состояния описания задачи
   */
  const [newDescription, setNewDescription] = useState(task.description)
  /**
   * Состояние и изменение состояния прикрепленного к задаче изображения
   */
  const [image, setImage] = useState(null)
  /**
   * Состояние и изменение состояния прикрепленной к задаче ссылки изображения
   */
  const [imageURL, setImageURL] = useState(null)
  /**
   * Сегодняшний год
   */
  const currentYear = dayjs().year()
  /**
   * Количество дней в месяце
   */
  const daysInMonth = dayjs(`${year}-${month}`).daysInMonth()

  /**
   * Создание массива с днями в текущем месяце
   */
  const daysArray = Array.from(Array(daysInMonth))
  /**
   * Создание массива с количеством месяцев в году
   */
  const monthsArray = Array.from(Array(12))
  /**
   * Создание массива с количеством часов в сутках
   */
  const hoursArray = Array.from(Array(24))
  /**
   * Создание массива с количеством минут в секундах
   */
  const minutesArray = Array.from(Array(60))
  /**
   * Создание массива с годами
   */
  const yearsArray = [currentYear, dayjs().year() + 1, dayjs().year() + 2, dayjs().year() + 3, dayjs().year() + 4]

  /**
   * Изменение заголовка и/или описания при нажатии на кнопку "Применить"
   */
  const acceptChanges = () => {
    dispatch(changeTitle(task.id, newTitle))
    dispatch(changeDescription(task.id, newDescription))
    setOpened(false)
  };

  /**
   * Загрузка изображения
   * @param {Object} e Событие загрузки файлов
   */
  const setFile = (e) => {
    let fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImageURL(fileReader.result)
    }
    const file = e.target.files[0];
    setImage(file)
    fileReader.readAsDataURL(file)
  };


  return (
    <div className={style.outer_container}>
      <div className={style.inner_container}>
        <button className={style.close_button}
          onClick={() => setOpened(false)}>Close</button>
        <div className={style.fields}>
          <div className={style.title}>
            <p className={style.title}>{task.title}</p>
            <input className={style.title_change}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)} />
          </div>
          <div className={style.description}>
            <p className={style.description__text}>{task.description}</p>
            <textarea placeholder='Описание задачи'
              className={style.description__change}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)} />
          </div>
          <div className={style.deadline}>
            <p className={style.deadline__info}>{task.deadline.day}.{task.deadline.month}.{task.deadline.year}  {task.deadline.hour}:{task.deadline.minute}</p>
            <div className={style.selects}>
              <select onChange={(e) => setDay(e.target.value)}>
                <option disabled
                  defaultValue='00'>ДД</option>
                {daysArray.map((e, i) => <option key={i}>{i + 1}</option>)}
              </select>
              <select onChange={(e) => setMonth(e.target.value)}>
                <option disabled
                  defaultValue>ММ</option>
                {monthsArray.map((e, i) => <option key={i}>{i + 1}</option>)}
              </select>
              <select onChange={(e) => setYear(e.target.value)}>
                <option disabled
                  defaultValue>ГГГГ</option>
                {yearsArray.map((e, i) => <option key={i}>{e}</option>)}
              </select>
              <select onChange={(e) => setHours(e.target.value)}>
                <option disabled
                  defaultValue>00</option>
                {hoursArray.map((e, i) => <option key={i}>{i}</option>)}
              </select>
              <select onChange={(e) => setMinutes(e.target.value)}>
                <option disabled
                  defaultValue>00</option>
                {minutesArray.map((e, i) => <option key={i}>{i + 1}</option>)}
              </select>
              <button onClick={() => dispatch(changeDeadline(task.id, day, month, year, hour, minute))}>Изменить</button>
            </div>
          </div>
          <div className={style.files}>
            <div className={style.file__container}>
              <div className={style.input_image}>
                <input type='file' className={style.input_image} onChange={setFile} />
                {imageURL ? <img width='50' src={imageURL} /> : ''}
              </div>
                <button className={style.file__button} onClick={() => dispatch(addFiles(task.id, imageURL))}>Добавить</button>
            </div>
          </div>
        </div>
        <button className={style.accept_button}
          onClick={acceptChanges}>Применить
        </button>
      </div>
    </div>
  )
}

export default Modal;