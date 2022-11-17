const jwt = require('jsonwebtoken');

const getToken = (payload) => {
    return jwt.sign(
        { data: payload },
        'mySecretPhrase',
        { expiresIn: '24h' }
    )
}

const getTokenData = (token) => {
    let data = null;


    jwt.verify(token, 'mySecretPhrase', (err, decoded) => {
        if (err) {
            data = { error: err }
        } else {
            data = decoded
        }
    })

    return data;
}

module.exports = {
    getToken,
    getTokenData
};