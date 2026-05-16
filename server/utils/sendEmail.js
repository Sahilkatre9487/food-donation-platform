import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, text) => {
  try {

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
    });

    console.log("Email success:", info.response);

  } catch (error) {

    console.log("Email error:", error);

  }
};

export default sendEmail;