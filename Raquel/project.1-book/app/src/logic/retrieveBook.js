/*import { validators, errors } from 'commons'

const { validateToken, validateId, validateString, validateBoolean } = validators
const { ClientError, ServerError } = errors*/

export default function (token, bookId) {
    //   validateToken(token)
    //   validateId(bookId, 'book id')


    return fetch(`http://localhost:8080/api/books/${bookId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            const { status } = res

            if (status === 200)
                return res.json()
            else if (status >= 400 && status < 500)
                return res.json()
                    .then(payload => {
                        const { error: message } = payload

                        throw new Error("message")
                    })
            else if (status >= 500)
                return res.text()
                    .then(text => {
                        throw new Error(text)
                    })
        })
}