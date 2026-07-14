const transporter = require("../config/mail");
const Contact = require("../models/Contact");
const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,

      subject: `📩 New Portfolio Contact - ${subject}`,

      html: `
    <h2>New Contact Form Submission</h2>

    <p><strong>Name:</strong> ${name}</p>

    <p><strong>Email:</strong> ${email}</p>

    <p><strong>Subject:</strong> ${subject}</p>

    <p><strong>Message:</strong></p>

    <p>${message}</p>
  `,
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,

      subject: "Thank You for Contacting Me",

      html: `
    <h2>Hello ${name}, 👋</h2>

    <p>Thank you for contacting me through my portfolio website.</p>

    <p>I have received your message successfully and I'll get back to you as soon as possible.</p>

    <hr>

    <h3>Your Submitted Details</h3>

    <p><strong>Subject:</strong> ${subject}</p>

    <p><strong>Message:</strong></p>

    <p>${message}</p>

    <br>

    <p>Best Regards,</p>

    <h3>Jatin Sharma</h3>

    <p>Frontend Developer</p>
  `,
    });
    res.status(201).json({
      success: true,
      message: "Contact Saved Successfully",
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { createContact };
