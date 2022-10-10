import './Home.css'
import { useState } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import RegisterBook from './RegisterBook'
import Detail from './Detail'
import ListBooks from './ListBooks'
import UpdateBook from './UpdateBook'
import AllBooks from './AllBooks'



export default function ({ onLoggedOut }) {
    const navigate = useNavigate()


    const logout = () => {
        delete sessionStorage.token
        onLoggedOut()
    }
    const handleGoBooks = () => {
        navigate("/")
    }

    const handleRegisterBook = () => {

        navigate("/books/register")
    }

    const handleAllBooks = () => {

        navigate("/books/allBooks")
    }




    return <div className='Home'>
        <div>
            <button className='button' onClick={logout}>Logout</button>
            <button className='button' onClick={handleRegisterBook}> Register your book </button>
            <button className='button' onClick={handleAllBooks}> Enter and find new books </button>
        </div>

        <Routes>
            <Route path="/*" element={<ListBooks />} />
            <Route path="/books/register" element={<RegisterBook onSaved={handleGoBooks} />} />
            <Route path="/books/:bookId/update" element={<UpdateBook onUpdated={() => { navigate("/books") }} />} />
            <Route path="/books/allBooks" element={<AllBooks handleGoBooks={handleGoBooks} />} />
            <Route path="/books/:bookId" element={<Detail />} />
        </Routes>


    </div>
}

