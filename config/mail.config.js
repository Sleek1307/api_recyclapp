const { model } = require('mongoose');
const nodemailer = require('nodemailer');

const mail = {
    user: 'recyclappdevelopment@gmail.com',
    password: 'omdtytsdrqsvjsfc'
};

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    // upgrade later with STARTTLS
    tls: {
        rejectedUnathorized: false
    },
    auth: {
        user: mail.user,
        pass: mail.password,
    },
})

const sendEmail = async (email, subject, html) => {
    try {
        await transporter.sendMail({
            from: `MHConde <${mail.user}>`,
            to: email,
            subject,
            text: "Hola amigo, por favor verifica tu cuenta de email",
            html,
        })
    } catch (error) {
        console.log(`Algo no va bien con el email: ${error}`);
    }
};

const getTemplate = (name, token) => {
    return `
    <div id="email___content">
    <img src='https://i.imgur.com/eboNR82.png' alt=''>
    <h2>Hola ${name}</h2>
    <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
    <a
        href='http://localhost:4000/recyclapp/verify/${token}'
        target='_blank'
    >Confirmar Cuenta</a>
    </div>
    `
}

module.exports = {
    sendEmail, 
    getTemplate
}