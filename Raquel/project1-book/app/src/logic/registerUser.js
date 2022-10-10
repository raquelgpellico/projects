/*import { validators, errors } from 'commons'

const { DuplicityError, ServerError, ClientError } = errors
const { validateString, validatePassword, validateEmail } = validators*/


//import { validateUsername, validatePassword } from './helpers/validators'

function registerUser(name, email, password) {
    //validateUsername(username)
    //validatePassword(password)
    
    return fetch("http://localhost:8080/api/user", { 
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
        .then(response => {
            const { status } = response

            if (status === 201)
                return
            else if (status >= 400 && status < 500)
                return response.json().then(payload => { throw new Error(payload.error) })
            else if (status >= 500)
                throw new Error('server error')
        })
}

export default registerUser