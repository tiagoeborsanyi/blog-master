const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const HttpError = require('../model/http-error')
const User = require('../model/user')

const signupUSer = async (req, res, next) => {
    const { name, email, password } = req.body

    let existingUser;

    try {
        existingUser = await User.findOne({ email })
    } catch(err) {
        const err1 = new HttpError('Erro para achar o usuario', 500)
        return next(err1)
    }

    if (existingUser) {
        const err = new HttpError('Usuario cadastrado no banco de dados', 422)
        return next(err)
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12)
    } catch (error) {
        const err = new HttpError('Não foi possível criar o usuário', 500)
        return next(err)
    }

    const createdUser = new User ({
        name,
        email,
        password: hashedPassword
    });

    try {
        await createdUser.save()
    } catch (error) {
        const err = new HttpError('Não foi possível salvar o usuário', 500)
        return next(err)
    }

    let token;
    try {
        token = jwt.sign(
            {userId: createdUser.id, email: createdUser.email},
            'gerhyuyeruretujrdtjhy',
            {expiresIn: '1h'}
        )
    } catch(error) {
        const err = new HttpError('Não foi possível criar token de acesso.', 500)
        return next(err)
    }

    res.status(201).json({user: createdUser.id, email: createdUser.email, token: token})
}

exports.signupUSer = signupUSer