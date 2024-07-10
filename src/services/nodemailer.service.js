import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { config } from 'dotenv';
config();   

const OAuth2 = google.auth.OAuth2;


const EMAIL = process.env.EMAIL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: oauth2Client.getAccessToken()
    }
})

const sendMailService = async (data) => {
    const { to, subject, html } = data;

    const mailOptions = {
        from: EMAIL,
        to: to,
        subject: subject,
        html: html
    };

    try {
       transport.sendMail(mailOptions, (error, info) => {
           if (error) {
               console.log(error);
           } else {
               console.log("Email sent: " + info.response);
           }
       })

    } catch (error) {
        return ({
            error: 500,
            message: error.message
        })
    }
}

export default sendMailService;