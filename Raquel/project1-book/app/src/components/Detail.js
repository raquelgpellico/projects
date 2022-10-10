import './Detail.css'
import { retrieveBook, deleteBook } from "../logic"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {extractUserIdFromToken} from "../utils"

//import { useContext } from 'react'
//import Context from './Context'

export default () => {
    // const { setFeedback } = useContext(Context)
    const [book, setBook] = useState()
    const navigate = useNavigate()

    const { bookId } = useParams()
    const userId = extractUserIdFromToken(sessionStorage.token)
    const ownerId = book?.userId

    useEffect(() => {

        try {
            retrieveBook(sessionStorage.token, bookId)
                .then((book) => {

                    //setFeedback({ level: 'info', message: 'Book created' })

                    setBook(book)
                })
                .catch(error => alert(error.message))
            //setFeedback({ level: 'error', message: error.message }))

        } catch (error) {
            alert(error.message)
            // setFeedback({ level: 'error', message: error.message })
        }
    }, [])

  
    const handlerGoBooks = () => {
        navigate("/")
    }



    const handlerDeleteBook = () =>{
       
        try {
            deleteBook(sessionStorage.token, bookId)
                .then(() => {

                    navigate(-1)
                })
                .catch(error => alert(error.message))


        } catch (error) {
            alert(error.message)

        }
    
    }


    return <div>
        <button className='buttons' onClick={handlerGoBooks}>BACK TO BOOKS</button>
        {book ? (
            <div className='book'>
                    <div className='book__header'>
                <h1 className='h1'>Title: {book.title}</h1>
                <h2 className='h2'>{book.category}</h2>
                </div>
                <h3 className='h3'>{book.description}</h3>
                {userId === ownerId?    <div>
                <button className='buttons' onClick={handlerDeleteBook}>delete</button>
                <button className='buttons' onClick={() => { navigate(`/books/${bookId}/update`) }}>update</button>
                </div> : null}
            
            </div>
        ) : <p> No books yet</p>}

    </div>

}