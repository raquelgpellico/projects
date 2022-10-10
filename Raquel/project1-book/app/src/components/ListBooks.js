import './ListBooks.css'
import { retrieveBooks } from "../logic"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
//import { useContext } from 'react'
//import Context from './Context'

export default () => {
    // const { setFeedback } = useContext(Context)
    const [books, setBooks] = useState()
    const navigate = useNavigate()

    useEffect(() => {

        try {
            retrieveBooks(sessionStorage.token)
                .then((books) => {

                    //setFeedback({ level: 'info', message: 'Book created' })

                    setBooks(books)
                })
                .catch(error => alert(error.message))
            //setFeedback({ level: 'error', message: error.message }))

        } catch (error) {
            alert(error.message)
            // setFeedback({ level: 'error', message: error.message })
        }
    }, [])
    const handlerBookDetail = bookId => {
        navigate(`/books/${bookId}`)
    }



    return <div>
        <h1 className='mbook'> MY BOOKS </h1>
        {books ? (
            <ul className='ul'>
                {books.map(book => (
                    <li key={book.id}>
                        <div className='book'>
                            <div className='book__header'>
                                <h1 className='detail' onClick={() => handlerBookDetail(book.id)}

                                >Title: {book.title} </h1>
                                <h2 className='detail__category'> {book.category} </h2>
                            </div>

                            <h3 className='detail__descrip'>  {book.description}</h3>
                        </div>
                    </li>
                ))}
            </ul>

        ) : <p> No books yet</p>}

    </div>

}