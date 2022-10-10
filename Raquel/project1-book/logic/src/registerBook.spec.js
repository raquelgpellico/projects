require('dotenv').config()
const { mongoose: { connect, disconnect, Types: { ObjectId } }, models: { User, Book } } = require('data')
const { expect } = require('chai')
const bcrypt = require('bcryptjs')
const registerBook = require('./registerBook')
const { errors: { NotFoundError }} = require('commons')

const { env: { MONGODB_URL } } = process

describe('registerBook', () => {
    before(() => connect(MONGODB_URL))

    it('should succeed when user already exists', () => {
        return Promise.all([User.deleteMany(), Book.deleteMany()])
            .then(() => {
                const hash = bcrypt.hashSync('123123123', 10)

                return User.create({ name: 'Ti Greton', email: 'ti@greton.com', password: hash })
            })
            .then(user => {
                return registerBook(user.id, 'hola mundo', '1255878897', "los rengoles torcidos","misterio", "psiquiatrico españa s xx")
                    .then(res => {
                        expect(res).to.be.undefined

                        return Book.findOne({ user: user.id })
                    })
                    .then(book => {
                        expect(book).to.exist
                        expect(book.user.toString()).to.equal(user.id)
                        expect(book.isbn).to.equal('1255878897')
                        expect(book.title).to.equal('los rengoles torcidos')
                        expect(book.category).to.equal('misterio')
                        expect(book.description).to.equal('psiquiatrico españa s xx')
                    })
            })
            
    })

    it('should fail when user does not exist', () => {
        const unknwonUserId = new ObjectId().toString()

        return Promise.all([User.deleteMany(), Book.deleteMany()])
            .then(user => registerBook(unknwonUserId,'hola mundo', '1255878897', "los rengoles torcidos","misterio", "psiquiatrico españa s xx"))
            .then(() => {
                throw new Error('should not reach this point')
            })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal(`user with id ${unknwonUserId} not found`)
            })
    })

    after(() => disconnect())
})