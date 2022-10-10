import { validators } from 'commons'

const { validateToken } = validators

export default function (token) {
    validateToken(token)

    return fetch('http://localhost:8080/api/books-public', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            const { status } = res

            if (status === 200)
                return res.json()
                    .then(books => {
                        books.forEach(book => book.date = new Date(book.date))

                        return books
                    })
            else if (status === 400 && status < 500)
                throw new Error('client error')
            else if (status >= 500)
                throw new Error('server error')
        })
}