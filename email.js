const nodemailer = require('nodemailer');
var volume = require('./volume');
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'server e-mail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'user', // generated ethereal user
            pass: 'pass'  // generated ethereal password
        }
    });

    var callback = function(texto) {
        // console.log('chegou...');
        // console.log(texto);

        let mailOptions = {
            from: '"Status Snapshots AWS👻" <contato.iel@sistemafieg.org.br>', // sender address
            to: 'joaovitorino.iel@sistemafieg.org.br', // list of receivers
            subject: 'Status Snapshots AWS ✔', // Subject line
            text: 'Status Snapshots AWS.', // plain text body
            html: texto // html body
        };
        // console.log(mailOptions);

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    }

    volume.imprimir(callback);

});

function enviarEmail(from, to, subject, text, html){
    let mailOptions = {from, to, subject, text, html}

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
}