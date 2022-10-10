import { useEffect, useState } from 'react'
import { retrieveBook } from '../logic'
import { Routes, Route, useNavigate } from 'react-router-dom'
import RegisterBook from './RegisterBook'
import Item from './Item'

export default ({ refresh }) => {
    const [book, setBook] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        refreshBook()
    }, [refresh])

    const refreshBook = () => {
        try {
            retrieveBook(sessionStorage.token)
                .then(book => setBook(book))
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCloseModal = () => {
        refreshBook()

        navigate('/')
    }
   // const handleGoToBook = bookId => navigate(`/n/${bookId}`)

    return <div >
        {
            book ?
                <ul >
                   
                </ul>
                :
                <p>no books</p>
        }

        <Routes>
            <Route path="n/:bookId" />
        </Routes>
    </div>
}

 //{book.map(book => <li key={book.id} onClick={() => handleGoTobook(book.id)}><Book book={book} /></li>)}
 //element={<Modal content={<Item onSaved={handleCloseModal} onDeleted={handleCloseModal} />} onClose={handleCloseModal} 