import './styles/RegisterNutritionist.css'
import { registerNutritionist } from '../logic'
import Context from './Context'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {AiOutlineLeft} from 'react-icons/ai'

function RegisterNutritionist({ onRegistered }){

    const { setResponse } = useContext(Context)

    const navigate = useNavigate()

    const register = event => {  
        event.preventDefault()
        const { target : { name: { value: name }, email: {value: email}, password: { value: password }}} = event

       
        try {
            registerNutritionist(name, email, password)
                .then(() => {
                    setResponse({ level: 'info', message: 'Nutritionist successfully registered'})

                    onRegistered()

                .catch(error => setResponse({level: 'error', message: error.message}))
                })
        } catch (error) {
            alert(error.message)
                
        }
    }

                        
    return (
        <div>
        <div onClick={() => navigate("/")}> <AiOutlineLeft className="back-icon" /> </div>
        <form className="container-register" onSubmit={ register }>
        <input className="register-input" type="text" name="name" placeholder="name"/>
        <input className="register-input" type="email" name="email" placeholder="e-mail"/>
        <input className="register-input" type="password" name="password" placeholder="password"/>
        <button className="register-button">Register as a Nutritionist</button>
    </form>
    </div>
    )
}

export default RegisterNutritionist