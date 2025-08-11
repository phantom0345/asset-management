const nodemailer = require("nodemailer");

const createContact = async (name, email, address, helpRequest) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yaswanthsai_mannem@srmap.edu.in",
        pass: "vmsmgszdzqmifgwx",
      },
    });
    
    const mailOptions = {
      from: "yaswanthsai_mannem@srmap.edu.in",
      to: email,
      subject: "regarding the order from srm university!",
      text: `Hello ${name},deliver to this address:"${address}",\n\nWe have received your message: "${helpRequest}"\n\nWe'll get back to you shortly.`,
    };
    
    const result = await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending mail:", error);
    return { success: false, error: "Failed to send email" };
  }
};

module.exports = { createContact };
