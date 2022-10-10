import './RegisterBook.css'
import { registerBook } from "../logic"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
//import { useContext } from 'react'
//import Context from './Context'

export default ({ onSaved }) => {
    // const { setFeedback } = useContext(Context)

    const navigate = useNavigate()

    const handleSave = event => {
        event.preventDefault()
        // text: { value: text },
        const { target: { isbn: { value: isbn }, title: { value: title }, description: { value: description }, category: { value: category } } } = event

        try {
            registerBook(sessionStorage.token, parseInt(isbn), title, description, category)
                .then(() => {

                    //setFeedback({ level: 'info', message: 'Book created' })

                    onSaved()
                })
                .catch(error => alert(error.message))
            //setFeedback({ level: 'error', message: error.message }))

        } catch (error) {
            alert(error.message)
            // setFeedback({ level: 'error', message: error.message })
        }
    }

    const handlerGoBooks = () => {
        navigate("/")
    }

    return <div className='RegisterBook'>
        <button className='back' onClick={handlerGoBooks}>BACK TO BOOKS</button>

        <form onSubmit={handleSave}>
            
                <select className='caracteristic' name="category" id="category">
                    <option value="cientificos">cientificos</option>
                    <option value="biografias">Biografias</option>
                    <option value="poemas">Poemas</option>
                    <option value="intriga">Intriga</option>
                    <option value="misterio">Misterio</option>
                    <option value="ficcion">Ficcion</option>
                    <option value="cuentos">Cuentos</option>
                    <option value="salud">Salud</option>
                    <option value="historicos">Historicos</option>
                    <option value="novela-negra">Novela negra</option>
                    <option value="novela-romantica">Novela romantica</option>
                    <option value="policiaco">Policiaco</option>
                </select>

                <label>ISBN</label>

                <input className='caracteristic' placeholder="isbn" type="number" name="isbn" />

                <label>Description</label>

                <input className='caracteristic' placeholder="description" type="text" name="description" />

                <label>Title</label>

                <input className='caracteristic' placeholder="Title" type="text" name="title" />

                <button className='back' type="submit">Save</button>
            
        </form>
    </div>

}