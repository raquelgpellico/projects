// import { validators, errors } from 'commons'

// const { validateToken, validateId } = validators
// const { ClientError, ServerError } = errors

export default function (token, bookId) {
    // validateToken(token)
    // validateId(noteId, 'book id')

    return fetch(`http://localhost:8080/api/books/${bookId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            const { status } = res

            if (status === 204)
                return
            else if (status >= 400 && status < 500)
                return res.json()
                    .then(payload => {
                        const { error: message } = payload

                        throw new Error ("ClientError")
                    })
            else if (status >= 500)
                return res.text()
                    .then(text => {
                        throw new Error ("ServrError")
                    })
        })
}