import React from 'react'
import style from '../styles/Header.module.css'
import Logo from '../assets/img/rocket.svg'
import Form from './Form'

function Header() {
    return (
        <div className={style.container}>
            <div className={style.logo}>
                <img src={Logo} />
                <h1 className={style.name}><span className={style.first_second_letter}>TO</span><span className={style.third_fourth_letter}>DO</span></h1>
            </div>
            <div className={style.input_button}>
                <Form />
            </div>
        </div>
    )
}

export default Header