import React, { useState, useRef } from 'react'
import style from '../styles/Modal.module.css'
import { useDispatch } from 'react-redux'
import { changeTitle, changeDescription, changeDeadline } from '../redux/actions'
import dayjs from 'dayjs'
import { addFiles } from '../redux/actions'


function Modal({ task, setOpened }) {
  const dayObj = dayjs()
  const dispatch = useDispatch()

  //----------------- Дефолтные состояния -----------------//
  const [day, setDay] = useState(dayObj.$D)
  const [month, setMonth] = useState(dayObj.$M + 1)
  const [year, setYear] = useState(dayObj.$y)
  const [hour, setHours] = useState(null)
  const [minute, setMinutes] = useState(null)
  const [newTitle, setNewTitle] = useState(task.title)
  const [newDescription, setNewDescription] = useState(task.description)
  const [image, setImage] = useState(null)
  const [imageURL, setImageURL] = useState(null)

  const currentYear = dayjs().year()
  const daysInMonth = dayjs(`${year}-${month}`).daysInMonth()

  //----------------- Создание массивов, в которые будут помещаться дни в месяце, месяцы и годы -----------//
  const daysArray = Array.from(Array(daysInMonth))
  const monthsArray = Array.from(Array(12))
  const hoursArray = Array.from(Array(24))
  const minutesArray = Array.from(Array(60))
  const yearsArray = [currentYear, dayjs().year() + 1, dayjs().year() + 2, dayjs().year() + 3, dayjs().year() + 4]

  //------------------- Функция, которая вызывается по клику на кнопку "Применить" ---------------------//
  const acceptChanges = () => {
    dispatch(changeTitle(task.id, newTitle))
    dispatch(changeDescription(task.id, newDescription))
    setOpened(false)
  };

  //--------------------- Отправка файлов --------------------------------------//
  const setFile = (e) => {
    let fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImageURL(fileReader.result)
    }
    const file = e.target.files[0];
    setImage(file)
    fileReader.readAsDataURL(file)
    console.log(imageURL)
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