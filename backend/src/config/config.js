const config={
    moogoStringConnection : '',//String de conexão com o mongo
    smtpEmail:'',//endereço smpt para envio de e-mail
    hostEmail:'',//host do e-mail, pode ser utilizado o mesmo smtp
    portSmtpEmail:465,//porta de envio do e-mail
    userEmail:'',//usuario para envio de e-mail
    passwordEmail :'',//senha para envio de e-mail
    secret:'',//senha secreta para geração de token de autenticação jwt
}

module.exports = config;