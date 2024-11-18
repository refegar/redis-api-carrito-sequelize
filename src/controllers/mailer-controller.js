const nodemailer = require("nodemailer");
const { SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_HOST } = require("../database/config/config");
const email_logs = require("../database/models/email-logs");

const save_message = async (username, from, to, subject, body, status, type, messageId) => {
    if (!username || !from || !to || !subject || !body || !status || !type) {
        throw new Error("Faltan datos requeridos para guardar el mensaje");
    }
    
    let log = new email_logs({
        username,
        from,
        to,
        subject,
        body,
        status,
        type,
        messageId: messageId || 'N/A',  // Guarda "N/A" o un valor predeterminado si `messageId` está ausente
    });
    await log.save();
    
};


const mailer = async (to, subject, hbody, username, type) => {
    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: true,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });

    let message = {
        from: 'Usuario Registrado <marfenox@gmail.com>',
        to: to,
        subject: subject,
        html: hbody,
    };
    let info = await transporter.sendMail(message);
    await save_message(username, 'marfenox@gmail.com', to, subject, hbody, "success", type, info.messageId);
    return;
};

const mailerCompra = async (to, subject, hbody, username, type) => {
    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: true,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });

    let message = {
        from: 'Compra exitosa <marfenox@gmail.com>',
        to: to,
        subject: subject,
        html: hbody,
    };
    let info = await transporter.sendMail(message);
    save_message(username, to, subject, hbody, "success", type, info.messageId);
    return;
};


const mailercontact = async (from, subject, hbody, username, type) => {
    const transportercontact = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: true,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });

    let messages = {
        from: 'Centro de Mensajes portafolio site <marfenox@gmail.com>',
        to: 'marfenox@gmail.com',
        subject: subject,
        html: hbody,
        replyTo: from, // Agrega el correo del usuario como reply-to
		//reply-to ya from por segurida no lo puede manejar otro usuario
    };
    let infom = await transportercontact.sendMail(messages);
    save_message(username, from, 'marfenox@gmail.com', subject, hbody, "success", type, infom.messageId);
    return infom;
};

module.exports = {
    mailer,
    mailercontact,
    mailerCompra
};