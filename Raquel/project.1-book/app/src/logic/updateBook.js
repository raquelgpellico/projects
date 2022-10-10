//import { validators, errors } from 'commons'

//const { validateToken, validateId, validateString, validateBoolean } = validators
//const { ClientError, ServerError } = errors

export default function (token, bookId, isbn, title, description, category ) {
  //  validateToken(token)
   // validateId(noteId, 'note id')
   // validateString(text, 'text')
   // validateString(color, 'color')
   // validateBoolean(_public, 'public')

    return fetch(`http://localhost:8080/api/books/${bookId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isbn, title, description, category })
    })
        .then(res => {
            const { status } = res

            if (status === 204)
                return
            else if (status >= 400 && status < 500)
                return res.json()
                    .then(payload => {
                        const { error: message } = payload

                        throw new Error("CLIENTERROR")
                    })
            else if (status >= 500)
                return res.text()
                    .then(text => {
                        throw new Error("SERVERERROR")
                    })
        })
}