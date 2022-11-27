import React, { useState } from 'react'
import style from '../styles/Form.module.css'
import { useDispatch } from 'react-redux'
import { addTodo } from '../redux/actions'
import { useRef } from 'react'

/**
 * Инпут и кнопка добавления задачи 
 */
function Form() {
  const dispatch = useDispatch()
  /** 
   * Создание ссылки на значение инпута
   */
  const refInput = useRef(null)
  /**
   * Состояние значения инпута
   */
  const [value, setValue] = useState(null)
  /**
   * Значение ссылки
   */
  let targetValue = refInput.current
  /**
   * @function 
   * @param {Object} e Событие
   */
  const changeInput = (e) => {
    setValue(e.target.value)
  }
  /**
   * Событие клика по кнопке: добавление новой задачи и очищение инпута
   * @type {Function}
   * @event Click
   */
  const clickFunction = () => {
    dispatch(addTodo(value))
    setValue(null)
    targetValue.value = null
  }
  return (
    <>
      <input className={style.input} ref={refInput} placeholder='Введите задачу' onChange={changeInput} />
      <button disabled={!value} className={style.button} onClick={clickFunction}>Добавить<span className={style.button__plus}></span></button>
    </>
  )
}

export default Form;