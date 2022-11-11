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

const getTemplate = () => {
    return `
        
    `
}