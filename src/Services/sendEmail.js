import nodemailer from "nodemailer";

export async function sendEmail(to, subject, html) {

  let transporter = nodemailer.createTransport({
    service:"gmail", 
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  let info = await transporter.sendMail({
    from: `Naji_Tech store" <${process.env.EMAIL}>`,
    to/*: "sawaftaaya5@gmail.com"*/, 
    subject/*: "Confirm Email ✔"*/, 
    html/*: "<h2>Plz confirm your email</h2>"*/, 
  });
}
