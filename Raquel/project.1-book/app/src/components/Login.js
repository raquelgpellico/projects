import './Login.css'
import { authenticateUser } from '../logic'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Feedback from './Feedback'


export default function ({ onLoggedIn }) {
    const [feedback, setFeedback] = useState()
    const navigate = useNavigate()

    const login = event => {
        event.preventDefault()

        const { target: { email: { value: email }, password: { value: password } } } = event

        try {
            authenticateUser(email, password)
                .then(token => {
                    sessionStorage.token = token
                    onLoggedIn()
                })
                .catch(error => {
                    setFeedback({ level: 'error', message: error.message })
                    if (error.message === 'token expired') delete sessionStorage.token
                })
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    return <div className='Login' >
        <button className='button' onClick={() => navigate("/")}>back</button>
        <h2 className='log' >Log in</h2>
        <div >
            <form className='inp' onSubmit={login}>
                <input className='inp_email'  type="email" name="email" placeholder="Email" />
                <input className='inp_email' type="password" name="password" placeholder="Password" />

                {feedback ? <Feedback level={feedback.level} message={feedback.message} /> : null}

                <button className='button' type="submit" >Submit</button>
            </form>
        </div>
    </div>
}