/*import { validators, errors } from 'commons'

const { validateToken, validateId } = validators
const { AuthError, NotFoundError, FormatError, ClientError, ServerError } = errors*/

export default function (token, isbn, title, description, category) {
   // validateToken(token)
   // validateId(bookId, 'book id')

    return fetch("http://localhost:8080/api/book", {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ isbn, title, description, category })
    })
        .then(res => {
            const { status } = res

            if (status === 200)
                return res.json()
                    .then(book => {
                        book.date = new Date(book.date)

                        return book
                    })
            else if (status >= 400 && status < 500)
                return res.json()
                    .then(payload => {
                        const { error: message } = payload

                        if (status === 400)
                            throw new Error ("message")
                        if (status === 401)
                        throw new Error ("message")
                        else if (status === 404)
                        throw new Error ("message")
                        else
                        throw new Error ("message")
                    })
            else if (status >= 500)
                return res.text()
                    .then(text => {
                        throw new Error (text)
                    })
        })
}