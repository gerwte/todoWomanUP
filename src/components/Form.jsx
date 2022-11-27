import React, { useState } from 'react'
import style from '../styles/Form.module.css'
import { useDispatch } from 'react-redux'
import { addTodo } from '../redux/actions'
import { useRef } from 'react'

function Form() {
  const refInput = useRef(null)
  const [value, setValue] = useState(null)
  const dispatch = useDispatch()
  let targetValue = refInput.current
  const changeInput = (e) => {
    setValue(e.target.value)
  }
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