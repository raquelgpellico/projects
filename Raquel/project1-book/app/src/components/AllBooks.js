import './AllBooks.css'
import { useEffect, useState } from 'react'
import { retrieveAllBooks, search } from '../logic';
import { useNavigate, Route, Routes } from 'react-router-dom'

export default function AllBooks({handleGoBooks}) {
    const [books, setBooks] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        allBooks()
    }, [])

    const allBooks = () => {
        try {
            retrieveAllBooks(sessionStorage.token)
                .then(books => {
                    setBooks(books)
                })
        } catch (error) {
            alert(error.message)
        }
    }
    const handlerBookDetail = bookId => {
        navigate(`/books/${bookId}`)
    }
    


    return <div className='page'>
   <button className='buttons' onClick={handleGoBooks} >Return my books</button>   
        {books ? (
            <ul>
                <h1 className='mbook'>BUSCA TU LIBRO</h1>
                {books.map(book => (
                    <li key={book.id}>
                        <div className='book'>
                            <div className='book__header'>
                        <h1 className='detail' onClick={() =>
                            handlerBookDetail(book.id)}>Title: {book.title}</h1>
                        <h2 className='detail__category'>{book.category}</h2>
                        </div>
                     
                        <h3 className='detail__category'>{book.description}</h3>
                        </div>
                    </li>
                ))}
            </ul>

        ) : <p> No books yet</p>}

                      

    </div>

}

