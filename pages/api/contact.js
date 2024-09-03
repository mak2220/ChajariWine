import nodemailer from 'nodemailer';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Configurar el transportador con Outlook
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      //secure: false, true for 465, false for other ports
      auth: {
        user: process.env.OUTLOOK_USER, // tu correo
        pass: process.env.OUTLOOK_PASS, // tu contraseña
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.OUTLOOK_USER,
      to: process.env.OUTLOOK_USER,
      subject: `Mensaje de contacto de ${name} ${email} ${phone}`,
      text: message,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error al enviar correo:', error.message);
      res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
};
