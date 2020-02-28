const nodemailer = require('nodemailer');
const config = require('../config/config');

const sendEmail = (to, subject, htmlText, text=null) => {
    const remetente = nodemailer.createTransport(
        {
            host:config.hostEmail,
            service:config.smtpEmail,
            port:config.portSmtpEmail,
            secure:true,
            auth:{
                user:config.userEmail,
                pass:config.passwordEmail,
            }
        }
    );
    
    const email = {
        from:config.userEmail,
        to,
        subject,
        text,
        html: htmlText
    }
    
    return remetente.sendMail(email);

}
module.exports = sendEmail;