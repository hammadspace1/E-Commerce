import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {

    // for Office

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "2ecff8c4d606d1",
        pass: "d521d467efe45c"
      }
    });


    
    // for personal

    // const transporter = nodemailer.createTransport({
    //   host: "sandbox.smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: "e540c56c410fe7",
    //     pass: "9ab8e4d91bef2c"
    //   },
    // });



    const mailOptions = {
      from: 'info@mailtrap.club',
      to: email,
      subject: emailType === "verify" ? "Your E-Commerce Varification Code is " : "Reset Password",
      html: `<b>${userId}</b>`,
    }
    const mailResponse = await transporter.sendMail(mailOptions)
    return mailResponse;
  } catch (error) {
    throw new Error(error.message)
  }
}