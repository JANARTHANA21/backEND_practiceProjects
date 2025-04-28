const nodemailer = require("nodemailer");

const testmail=(req,res)=>{
// Use at least Nodemailer v4.1.0
const nodemailer = require('nodemailer');

// Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });

    // Message object
    let message = {
        from: 'Sender Name <sender@example.com>',
        to: 'Recipient <recipient@example.com>',
        subject: 'Nodemailer is unicode friendly ✔',
        text: 'Hello to myself!',
        html: '<p><b>dai</b> testmail</p>'
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
        res.end()
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
    });
});
}


const originalmail=(req,res)=>{
    const transporter=nodemailer.createTransport({
        host:"gmail",
        port:587,
        secure:false,
        auth:{
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: 'janarthana.lif@gmail.com', // sender address
          to: "janarthana.life@gmail.com", // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: "<b>Hello world?</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        res.send('successfully mail sended',{info:info.response})
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
      }
      
      main().catch(console.error);
}
module.exports={testmail,originalmail};