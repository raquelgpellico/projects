import './RegisterUser.css'
import { registerUser } from '../logic'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Context from './Context'

export default function ({ onRegistered }) {
    const navigate = useNavigate()
    const { setFeedback } = useContext(Context)

    const register = event => {
        event.preventDefault()

        const { target: { name: { value: name }, email: { value: email }, password: { value: password } } } = event

        try {
            registerUser(name, email, password)
                .then(() => {
                    setFeedback({ level: 'info', message: 'Bienvenido' })

                    onRegistered()
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    return <form className="Register" onSubmit={register}>
        <input className='input' type="text" name="name" placeholder="Name" />
        <input className='input' type="email" name="email" placeholder="Email" />
        <input className='input' type="password" name="password" placeholder="Password" />
        <button className='btt'>Register</button>
        <p >Already have an account? Please <button className='btt'  onClick={() => navigate('/')}> Log in</button></p>
    </form>
}