import './UpdateBook.css'
import { retrieveBook,updateBook } from "../logic"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
//import { useContext } from 'react'
//import Context from './Context'

export default ({ onUpdated }) => {
    // const { setFeedback } = useContext(Context)
    const navigate = useNavigate()
    const [book, setBook] = useState() 
    const { bookId } = useParams()

    useEffect(() => {
        try {
            retrieveBook(sessionStorage.token, bookId)
                .then(book => setBook(book))
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])



    const handleUpdateBook = event => {
        event.preventDefault()
        // text: { value: text },
        const { target: { isbn: { value: isbn }, title: { value: title }, description: { value: description }, category: { value: category } } } = event

        try {
            updateBook(sessionStorage.token, bookId, parseInt(isbn), title, description, category)
                .then(() => {
                    
                      onUpdated()
                })
                .catch(error => alert(error.message))
          

        } catch (error) {
            alert(error.message)
     
        }
    }
    const handlerGoBooks = () => {
        navigate("/")
    }

    return <div className='userbook'>
         <button className='btt' onClick={handlerGoBooks}>BACK TO BOOKS</button>

{book ?
        <form onSubmit={handleUpdateBook}>

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
            </select>

            <label>ISBN</label>
            
            <input className='caracteristic' placeholder="isbn" type="number" name="isbn" defaultValue={book.isbn} />

            <label>Description</label>

            <input className='caracteristic' placeholder="description" type="text" name="description" defaultValue={book.description} />
            <label>Title</label>

            <input className='caracteristic' placeholder="title" type="text" name="title" defaultValue={book.title} />


            <button className='btt' type="submit">Save</button>

        </form>: <p>There is not book to update</p>
}
    </div>

}