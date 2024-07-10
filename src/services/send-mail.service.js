import sendMailService from "./nodemailer.service.js";

const sendMail = async (data) => {
     try {
        const response = await sendMailService(data);
     } catch (error) {
        console.log(error);
     }
}

export default sendMail;




