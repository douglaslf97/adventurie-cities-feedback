require('dotenv').config();
const path = require('path');
const image_file = path.resolve(__dirname, '..', './assets', 'image.jpeg');
const facebook = path.resolve(__dirname, '..', './assets', 'facebook.png');
const instagram = path.resolve(__dirname, '..', './assets', 'instagram.png');
const html = require('../assets/email');
const base64Email = require('nodemailer-plugin-inline-base64');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

module.exports = async function sendMail(emailTo, name, subject) {
  const oauth2Client = new OAuth2(
    process.env.MAIL_CLIENT_ID, //CLIENT ID 
    process.env.MAIL_CLIENT_SECRET, 
    process.env.MAIL_REDIRECT_AUTH// URL de redirecionamento 
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.MAIL_TOKEN_REFRESH
  });

  const accessToken = await oauth2Client.getAccessToken();

  const smtpTransport = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      type: process.env.MAIL_TYPE,
      user: process.env.MAIL_USER,
      clientId: process.env.MAIL_CLIENT_ID,
      clientSecret: process.env.MAIL_CLIENT_SECRET,
      refreshToken: process.env.MAIL_TOKEN_REFRESH,
      accessToken
    }
  });

  const mailOptions = {
    from: `Adventure Cities <${process.env.MAIL_USER}>`,
    to: emailTo,
    subject: subject,   
    generateTextFromHTML: true,
    attachments: [
      {   // utf-8 string as an attachment
        filename: 'adventure.jpeg',    
        path: image_file,       
        contentType: 'image/jpeg',
        cid: 'adventure'
      },    
      {   // utf-8 string as an attachment
        filename: 'facebook.png',    
        path: facebook,       
        contentType: 'image/png',
        cid: 'facebook'
      },    
      {   // utf-8 string as an attachment
        filename: 'instagram.png',    
        path: instagram,       
        contentType: 'image/png',
        cid: 'instagram'
      },    
    ],
    html: html(`h3>Obrigado ${name} por se inscrever!</h3><p>Para não perder nenhuma novidade do jogo siga nossas redes sociais e fique por dentro das atualizações.</p>`)
  }; 
  smtpTransport.use('compile', base64Email(mailOptions));
  return { smtpTransport, mailOptions };  
}

